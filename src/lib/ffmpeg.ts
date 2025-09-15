import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export type ProgressCallback = (progress: number) => void;
export type LoadingCallback = (isLoading: boolean, message: string) => void;

export class FFmpegConverter {
  private ffmpeg: FFmpeg;
  private loaded: boolean = false;
  private progressCallback?: ProgressCallback;
  private loadingCallback?: LoadingCallback;

  constructor() {
    this.ffmpeg = new FFmpeg();
    this.setupEventListeners();
  }

  private setupEventListeners() {
    // 监听进度事件
    this.ffmpeg.on('progress', ({ progress }) => {
      if (this.progressCallback) {
        this.progressCallback(Math.round(progress * 100));
      }
    });

    // 监听日志事件（可选，用于调试）
    this.ffmpeg.on('log', ({ message }) => {
      console.log('[FFmpeg]', message);
    });
  }

  // 设置进度回调
  setProgressCallback(callback: ProgressCallback) {
    this.progressCallback = callback;
  }

  // 设置加载状态回调
  setLoadingCallback(callback: LoadingCallback) {
    this.loadingCallback = callback;
  }

  // 懒加载FFmpeg
  async load() {
    if (this.loaded) return;

    try {
      if (this.loadingCallback) {
        this.loadingCallback(true, '正在初始化转换引擎...');
      }

      // 使用多个CDN提供商，添加回退机制
      const cdnProviders = [
        'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd',
        'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd',
        'https://esm.sh/@ffmpeg/core@0.12.6/dist/umd'
      ];

      let coreURL: string | undefined;
      let wasmURL: string | undefined;
      let loadError: Error | null = null;

      // 尝试从最快的CDN加载
      for (const baseURL of cdnProviders) {
        try {
          console.log(`Attempting to load FFmpeg from ${baseURL}...`);
          coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript');
          wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm');
          console.log(`Successfully loaded from ${baseURL}`);
          break;
        } catch (error) {
          console.warn(`Failed to load from ${baseURL}, trying next CDN...`);
          loadError = error as Error;
          if (baseURL === cdnProviders[cdnProviders.length - 1]) {
            throw new Error(`Failed to load FFmpeg from all CDN providers: ${loadError.message}`);
          }
        }
      }

      if (!coreURL || !wasmURL) {
        throw new Error('Failed to load FFmpeg core files from any CDN');
      }

      await this.ffmpeg.load({
        coreURL,
        wasmURL,
      });

      this.loaded = true;

      if (this.loadingCallback) {
        this.loadingCallback(false, '');
      }
    } catch (error) {
      if (this.loadingCallback) {
        this.loadingCallback(false, '');
      }
      throw new Error(`Failed to load FFmpeg: ${error}`);
    }
  }

  // 转换文件
  async convertFile(file: File, bitrate: string = '192k'): Promise<Uint8Array> {
    // 确保FFmpeg已加载
    await this.load();

    try {
      // 重置进度
      if (this.progressCallback) {
        this.progressCallback(0);
      }

      // 获取输入文件扩展名
      const inputName = `input${this.getFileExtension(file.name)}`;
      const outputName = 'output.mp3';

      // 将文件写入FFmpeg虚拟文件系统
      await this.ffmpeg.writeFile(inputName, await fetchFile(file));

      // 执行转换命令
      await this.ffmpeg.exec([
        '-i', inputName,
        '-b:a', bitrate,
        '-acodec', 'libmp3lame',
        outputName
      ]);

      // 读取输出文件
      const data = await this.ffmpeg.readFile(outputName);

      // 清理虚拟文件系统
      await this.ffmpeg.deleteFile(inputName);
      await this.ffmpeg.deleteFile(outputName);

      // 完成进度
      if (this.progressCallback) {
        this.progressCallback(100);
      }

      return data as Uint8Array;
    } catch (error) {
      throw new Error(`Conversion failed: ${error}`);
    }
  }

  // 获取文件扩展名
  private getFileExtension(filename: string): string {
    const parts = filename.toLowerCase().split('.');
    return parts.length > 1 ? `.${parts[parts.length - 1]}` : '';
  }

  // 验证文件格式
  static isValidFormat(filename: string): boolean {
    const validFormats = ['.opus', '.ogg', '.webm'];
    const extension = filename.toLowerCase();
    return validFormats.some(format => extension.endsWith(format));
  }

  // 验证文件大小（100MB限制）
  static isValidSize(size: number): boolean {
    const maxSize = 100 * 1024 * 1024; // 100MB
    return size <= maxSize;
  }

  // 格式化文件大小显示
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  // 清理资源
  terminate() {
    if (this.ffmpeg) {
      this.ffmpeg.terminate();
    }
  }
}
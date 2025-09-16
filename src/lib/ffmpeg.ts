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
    // Listen to progress events
    this.ffmpeg.on('progress', ({ progress }) => {
      if (this.progressCallback) {
        this.progressCallback(Math.round(progress * 100));
      }
    });

    // Listen to log events (optional, for debugging)
    this.ffmpeg.on('log', ({ message }) => {
      console.log('[FFmpeg]', message);
    });
  }

  // Set progress callback
  setProgressCallback(callback: ProgressCallback) {
    this.progressCallback = callback;
  }

  // Set loading callback
  setLoadingCallback(callback: LoadingCallback) {
    this.loadingCallback = callback;
  }

  // Lazy load FFmpeg
  async load() {
    if (this.loaded) return;

    try {
      if (this.loadingCallback) {
        this.loadingCallback(true, 'Initializing conversion engine...');
      }

      // Load FFmpeg core files from CDN
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
      const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript');
      const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm');

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

  // Convert file
  async convertFile(file: File, bitrate: string = '192k'): Promise<Uint8Array> {
    // Ensure FFmpeg is loaded
    await this.load();

    try {
      // Reset progress
      if (this.progressCallback) {
        this.progressCallback(0);
      }

      // Get input file extension
      const inputName = `input${this.getFileExtension(file.name)}`;
      const outputName = 'output.mp3';

      // Write file to FFmpeg virtual file system
      await this.ffmpeg.writeFile(inputName, await fetchFile(file));

      // Execute conversion command
      await this.ffmpeg.exec([
        '-i', inputName,
        '-b:a', bitrate,
        '-acodec', 'libmp3lame',
        outputName
      ]);

      // Read output file
      const data = await this.ffmpeg.readFile(outputName);

      // Clean up virtual file system
      await this.ffmpeg.deleteFile(inputName);
      await this.ffmpeg.deleteFile(outputName);

      // Complete progress
      if (this.progressCallback) {
        this.progressCallback(100);
      }

      return data as Uint8Array;
    } catch (error) {
      throw new Error(`Conversion failed: ${error}`);
    }
  }

  // Get file extension
  private getFileExtension(filename: string): string {
    const parts = filename.toLowerCase().split('.');
    return parts.length > 1 ? `.${parts[parts.length - 1]}` : '';
  }

  // Validate file format
  static isValidFormat(filename: string): boolean {
    const validFormats = ['.opus', '.ogg', '.webm'];
    const extension = filename.toLowerCase();
    return validFormats.some(format => extension.endsWith(format));
  }

  // Validate file size (100MB limit)
  static isValidSize(size: number): boolean {
    const maxSize = 100 * 1024 * 1024; // 100MB
    return size <= maxSize;
  }

  // Format file size for display
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  // Clean up resources
  terminate() {
    if (this.ffmpeg) {
      this.ffmpeg.terminate();
    }
  }
}
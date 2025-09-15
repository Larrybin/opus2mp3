'use client';

import { useState, useRef, useEffect } from 'react';
import { FileUploader } from '@/components/FileUploader';
import { FFmpegConverter } from '@/lib/ffmpeg';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Download, Settings, Music, ChevronDown } from 'lucide-react';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [bitrate, setBitrate] = useState('192k');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const converterRef = useRef<FFmpegConverter | null>(null);

  // 初始化FFmpeg转换器
  useEffect(() => {
    converterRef.current = new FFmpegConverter();
    converterRef.current.setProgressCallback(setProgress);
    converterRef.current.setLoadingCallback((loading, message) => {
      setIsLoading(loading);
      setLoadingMessage(message);
    });

    return () => {
      if (converterRef.current) {
        converterRef.current.terminate();
      }
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError('');
    setDownloadUrl('');
    setProgress(0);
  };

  const handleConvert = async () => {
    if (!selectedFile || !converterRef.current) return;

    setIsConverting(true);
    setError('');
    setDownloadUrl('');

    try {
      // 执行转换
      const outputData = await converterRef.current.convertFile(selectedFile, bitrate);

      // 创建下载链接
      const blob = new Blob([new Uint8Array(outputData)], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : '转换失败，请重试');
      setProgress(0);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl || !selectedFile) return;

    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = selectedFile.name.replace(/\.[^/.]+$/, '') + '.mp3';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const resetState = () => {
    setSelectedFile(null);
    setDownloadUrl('');
    setProgress(0);
    setError('');
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 全屏加载提示 */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <Card className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-lg font-medium">{loadingMessage}</p>
            </div>
          </Card>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* 标题部分 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Music className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              QuickOpus2MP3
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            在线将 OPUS/OGG/WebM 音频转换为 MP3 格式
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            完全在浏览器中处理，无需上传到服务器，保护您的隐私
          </p>
        </div>

        {/* 主卡片 */}
        <Card>
          <CardHeader>
            <CardTitle>音频转换器</CardTitle>
            <CardDescription>
              选择一个音频文件开始转换
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 文件上传区域 */}
            <FileUploader
              onFileSelect={handleFileSelect}
              disabled={isConverting}
            />

            {/* 高级设置 */}
            {selectedFile && !downloadUrl && (
              <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    <span className="flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      高级设置
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        音频比特率
                      </label>
                      <Select value={bitrate} onValueChange={setBitrate} disabled={isConverting}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="128k">128 kbps（标准质量）</SelectItem>
                          <SelectItem value="192k">192 kbps（高质量，推荐）</SelectItem>
                          <SelectItem value="320k">320 kbps（最高质量）</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* 进度条 */}
            {isConverting && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>转换进度</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {/* 错误提示 */}
            {error && (
              <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg">
                <p className="text-red-600 dark:text-red-200">{error}</p>
              </div>
            )}

            {/* 操作按钮 */}
            <div className="flex gap-3">
              {!downloadUrl ? (
                <Button
                  onClick={handleConvert}
                  disabled={!selectedFile || isConverting}
                  className="flex-1"
                >
                  {isConverting ? '转换中...' : '开始转换'}
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleDownload}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    下载 MP3
                  </Button>
                  <Button
                    onClick={resetState}
                    variant="outline"
                  >
                    转换新文件
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 说明部分 */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>支持的格式：OPUS, OGG, WebM</p>
          <p>最大文件大小：100MB</p>
          <p className="mt-2">
            本工具使用 FFmpeg.wasm 在浏览器中进行转换，您的文件不会上传到任何服务器
          </p>
        </div>
      </div>
    </div>
  );
}
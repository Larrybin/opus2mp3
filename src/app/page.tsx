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

  // Initialize FFmpeg converter
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
      // Execute conversion
      const outputData = await converterRef.current.convertFile(selectedFile, bitrate);

      // Create download link
      const blob = new Blob([new Uint8Array(outputData)], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed, please try again');
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
      {/* Fullscreen loading indicator */}
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
        {/* Title section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Music className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              QuickOpus2MP3
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Convert OPUS/OGG/WebM audio to MP3 format online
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Processed entirely in your browser, no server upload required, protecting your privacy
          </p>
        </div>

        {/* Main card */}
        <Card>
          <CardHeader>
            <CardTitle>Audio Converter</CardTitle>
            <CardDescription>
              Select an audio file to start conversion
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File upload area */}
            <FileUploader
              onFileSelect={handleFileSelect}
              disabled={isConverting}
            />

            {/* Advanced settings */}
            {selectedFile && !downloadUrl && (
              <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    <span className="flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Advanced Settings
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Audio Bitrate
                      </label>
                      <Select value={bitrate} onValueChange={setBitrate} disabled={isConverting}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="128k">128 kbps (Standard Quality)</SelectItem>
                          <SelectItem value="192k">192 kbps (High Quality, Recommended)</SelectItem>
                          <SelectItem value="320k">320 kbps (Highest Quality)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Progress bar */}
            {isConverting && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Conversion Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg">
                <p className="text-red-600 dark:text-red-200">{error}</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3">
              {!downloadUrl ? (
                <Button
                  onClick={handleConvert}
                  disabled={!selectedFile || isConverting}
                  className="flex-1"
                >
                  {isConverting ? 'Converting...' : 'Start Conversion'}
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleDownload}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download MP3
                  </Button>
                  <Button
                    onClick={resetState}
                    variant="outline"
                  >
                    Convert New File
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Instructions section */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Supported formats: OPUS, OGG, WebM</p>
          <p>Maximum file size: 100MB</p>
          <p className="mt-2">
            This tool uses FFmpeg.wasm for browser-based conversion, your files are not uploaded to any server
          </p>
        </div>
      </div>
    </div>
  );
}
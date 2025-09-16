'use client';

import { useState, useRef, useEffect } from 'react';
import { FileUploader } from '@/components/FileUploader';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesGrid } from '@/components/FeaturesGrid';
import { PainPoints } from '@/components/PainPoints';
import { FAQ } from '@/components/FAQ';
import { FFmpegConverter } from '@/lib/ffmpeg';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Download, Settings, ChevronDown, Sparkles } from 'lucide-react';
import { getAllStructuredData } from './structured-data';

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
  const converterSectionRef = useRef<HTMLDivElement>(null);

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

  const scrollToConverter = () => {
    converterSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
    <div className="min-h-screen bg-white">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getAllStructuredData()),
        }}
      />

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

      {/* Hero Section */}
      <HeroSection onScrollToConverter={scrollToConverter} />

      {/* Features Grid */}
      <FeaturesGrid />

      {/* Main Converter Section */}
      <section
        ref={converterSectionRef}
        id="converter"
        className="py-20 md:py-24 lg:py-32 bg-gray-50"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Ready to Convert</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Convert Your Audio Files Now
            </h2>
            <p className="text-lg text-gray-600">
              Upload your file and get started in seconds
            </p>
          </div>

          {/* Main Card */}
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl">Audio Converter</CardTitle>
              <CardDescription className="text-base">
                Select an audio file to start conversion
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pb-8">
              {/* File upload area */}
              <FileUploader
                onFileSelect={handleFileSelect}
                disabled={isConverting}
              />

              {/* Advanced settings */}
              {selectedFile && !downloadUrl && (
                <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between hover:bg-gray-50">
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
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
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
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Conversion Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3 pt-4">
                {!downloadUrl ? (
                  <Button
                    onClick={handleConvert}
                    disabled={!selectedFile || isConverting}
                    className="flex-1 h-12 text-base bg-blue-600 hover:bg-blue-700"
                  >
                    {isConverting ? 'Converting...' : 'Start Conversion'}
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleDownload}
                      className="flex-1 h-12 text-base bg-green-600 hover:bg-green-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download MP3
                    </Button>
                    <Button
                      onClick={resetState}
                      variant="outline"
                      className="h-12"
                    >
                      Convert New File
                    </Button>
                  </>
                )}
              </div>

              {/* Help text */}
              {!selectedFile && (
                <div className="text-center text-sm text-gray-500 pt-4 border-t">
                  <p>Supported formats: OPUS, OGG, WebM • Maximum file size: 100MB</p>
                  <p className="mt-1">
                    Your files are processed locally and never uploaded to any server
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pain Points Section */}
      <PainPoints />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© 2024 QuickOpus2MP3. All rights reserved.</p>
          <p className="text-sm">
            Built with ❤️ using Next.js and FFmpeg.wasm
          </p>
          <div className="mt-6 flex justify-center gap-6">
            <a
              href="https://github.com/Larrybin/opus2mp3"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileAudio } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FFmpegConverter } from '@/lib/ffmpeg';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export function FileUploader({ onFileSelect, disabled }: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError('');

    if (acceptedFiles.length === 0) {
      return;
    }

    const file = acceptedFiles[0];

    // 验证文件格式
    if (!FFmpegConverter.isValidFormat(file.name)) {
      setError('不支持的文件格式。请上传 .opus, .ogg 或 .webm 文件。');
      return;
    }

    // 验证文件大小
    if (!FFmpegConverter.isValidSize(file.size)) {
      setError('文件太大。最大支持 100MB。');
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/opus': ['.opus'],
      'audio/ogg': ['.ogg'],
      'audio/webm': ['.webm'],
      'video/webm': ['.webm'],
    },
    maxFiles: 1,
    disabled,
  });

  const removeFile = () => {
    setSelectedFile(null);
    setError('');
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <Card
          {...getRootProps()}
          className={`
            border-2 border-dashed p-8 text-center cursor-pointer
            transition-all duration-200
            ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : 'border-gray-300 hover:border-gray-400'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          {isDragActive ? (
            <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
              释放文件以上传
            </p>
          ) : (
            <>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                拖拽音频文件到这里，或点击选择
              </p>
              <p className="mt-2 text-sm text-gray-500">
                支持格式：OPUS, OGG, WebM（最大 100MB）
              </p>
            </>
          )}
        </Card>
      ) : (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileAudio className="w-8 h-8 text-blue-500" />
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-gray-500">
                  {FFmpegConverter.formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              disabled={disabled}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 rounded-md">
          <p className="text-sm text-red-600 dark:text-red-200">{error}</p>
        </div>
      )}
    </div>
  );
}
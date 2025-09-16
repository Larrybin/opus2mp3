'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileAudio } from 'lucide-react';
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

    // Validate file format
    if (!FFmpegConverter.isValidFormat(file.name)) {
      setError('Unsupported file format. Please upload .opus, .ogg or .webm files.');
      return;
    }

    // Validate file size
    if (!FFmpegConverter.isValidSize(file.size)) {
      setError('File too large. Maximum size is 100MB.');
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
        <div
          {...getRootProps()}
          className={`
            relative overflow-hidden
            border-2 border-dashed rounded-xl p-10 text-center cursor-pointer
            transition-all duration-300
            ${isDragActive
              ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-white scale-105 shadow-lg'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50 hover:shadow-md'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="upload-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="1.5" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#upload-pattern)" />
            </svg>
          </div>

          <div className="relative">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg">
              <Upload className="w-8 h-8 text-white" />
            </div>

            {isDragActive ? (
              <div>
                <p className="text-xl font-semibold text-blue-600 mb-2">
                  Drop your file here!
                </p>
                <p className="text-sm text-gray-600">
                  Release to start conversion
                </p>
              </div>
            ) : (
              <>
                <p className="text-xl font-semibold text-gray-800 mb-2">
                  Upload Audio File
                </p>
                <p className="text-base text-gray-600 mb-4">
                  Drag & drop or click to browse
                </p>
                <div className="inline-flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    OPUS
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    OGG
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    WebM
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <FileAudio className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-lg">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Size: {FFmpegConverter.formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              disabled={disabled}
              className="hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Ready indicator */}
          <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Ready for conversion</span>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
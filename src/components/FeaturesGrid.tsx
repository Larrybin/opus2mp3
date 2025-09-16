'use client';

import React from 'react';
import { FileAudio, Settings2, Rocket, Headphones, Lock, Gauge } from 'lucide-react';

const features = [
  {
    icon: FileAudio,
    title: 'Multi-Format Support',
    description: 'Convert OPUS, OGG, and WebM audio files to high-quality MP3 format with ease.',
    highlights: ['OPUS to MP3', 'OGG to MP3', 'WebM to MP3']
  },
  {
    icon: Settings2,
    title: 'Advanced Settings',
    description: 'Customize your output with professional-grade audio settings and quality options.',
    highlights: ['128-320 kbps bitrate', 'Preserve metadata', 'Batch processing ready']
  },
  {
    icon: Rocket,
    title: 'Browser-Powered',
    description: 'Powered by FFmpeg.wasm for lightning-fast conversion directly in your browser.',
    highlights: ['No server uploads', 'Works offline', 'Instant processing']
  },
  {
    icon: Headphones,
    title: 'Premium Audio Quality',
    description: 'Maintain excellent audio quality with industry-standard MP3 encoding.',
    highlights: ['Lossless conversion', 'Professional quality', 'Crystal clear output']
  },
  {
    icon: Lock,
    title: 'Complete Privacy',
    description: 'Your files never leave your device. 100% client-side processing ensures total privacy.',
    highlights: ['No data collection', 'No cloud storage', 'Complete security']
  },
  {
    icon: Gauge,
    title: 'Lightning Fast',
    description: 'Experience blazing-fast conversion speeds with WebAssembly technology.',
    highlights: ['Instant conversion', 'No waiting queues', 'Real-time progress']
  }
];

export function FeaturesGrid() {
  return (
    <section className="py-20 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features, Simple Experience
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need for professional audio conversion, right in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
              >
                {/* Icon Background */}
                <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />

                {/* Content */}
                <div className="relative">
                  <div className="mb-4 inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>

                  <ul className="space-y-2">
                    {feature.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
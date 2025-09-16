'use client';

import React from 'react';
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';

export function HeroSection({ onScrollToConverter }: { onScrollToConverter: () => void }) {
  return (
    <header role="banner" className="relative w-full overflow-hidden bg-gradient-to-br from-white via-blue-50/20 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-60"></div>

      <div className="relative container mx-auto px-4 py-20 md:py-24 lg:py-32">
        <div className="text-center max-w-5xl mx-auto">
          {/* 2025 Trust Signal Badge */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">⚡ Instant Conversion • 🔒 100% Private • ✓ No Upload Required</span>
          </div>

          {/* SEO-Optimized H1 - Hidden for screen readers */}
          <h1 className="sr-only">
            OPUS to MP3 Converter - Free Online Audio Conversion Tool - QuickOpus2MP3
          </h1>

          {/* Visual Title - Optimized for zero-click search */}
          <div className="mb-6">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight">
              Convert OPUS to MP3
            </h2>
            <p className="text-2xl md:text-3xl font-semibold text-blue-600 mt-3">
              QuickOpus2MP3 - Fast & Free
            </p>
          </div>

          <p className="mb-12 text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto" itemProp="description">
            Transform OPUS, OGG, and WebM audio files to MP3 instantly.
            <br />
            <strong className="text-gray-900">Zero upload, 100% browser-based, works offline.</strong>
          </p>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <Zap className="w-10 h-10 text-yellow-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Conversion</h3>
              <p className="text-sm text-gray-600 leading-relaxed">No waiting, no uploads. Process files locally at blazing speed.</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <Shield className="w-10 h-10 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">100% Private</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Your files never leave your device. Complete privacy guaranteed.</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <Sparkles className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Completely Free</h3>
              <p className="text-sm text-gray-600 leading-relaxed">No limits, no registration, no hidden fees. Forever free.</p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onScrollToConverter}
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Start Converting Now
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              ✓ No file size limits
            </span>
            <span className="flex items-center gap-2">
              ✓ Works offline
            </span>
            <span className="flex items-center gap-2">
              ✓ No account required
            </span>
            <span className="flex items-center gap-2">
              ✓ Ad-free experience
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
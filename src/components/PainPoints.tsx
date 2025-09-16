'use client';

import React from 'react';
import { XCircle, ArrowRight, Clock, Shield, FileX } from 'lucide-react';

const painPoints = [
  {
    icon: Clock,
    problem: 'Tired of slow online converters?',
    solution: 'Our tool runs entirely in your browser',
    description: 'No more waiting for uploads and downloads. Convert files instantly with WebAssembly technology that processes everything locally on your device.'
  },
  {
    icon: Shield,
    problem: 'Worried about privacy and file security?',
    solution: 'Your files never leave your device',
    description: 'Complete peace of mind with 100% client-side processing. No servers, no cloud storage, no data collection. Your audio files remain completely private.'
  },
  {
    icon: FileX,
    problem: 'Frustrated with file size limits?',
    solution: 'Convert files up to 100MB with no restrictions',
    description: 'No artificial limitations or premium tiers. Convert large audio files without compression or quality loss, completely free.'
  }
];

export function PainPoints() {
  return (
    <section className="py-20 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            We Solve Real Problems
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Say goodbye to the frustrations of traditional audio converters.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Problem Side */}
                <div className="flex-1">
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                        <XCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {point.problem}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center">
                  <div className={`hidden lg:flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg ${
                    index % 2 === 1 ? 'rotate-180' : ''
                  }`}>
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex lg:hidden items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg rotate-90">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Solution Side */}
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-200">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {point.solution}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-green-600 font-semibold">Problem Solved!</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Experience the difference with a converter built for the modern web.
          </p>
          <a
            href="#converter"
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Try It Now - It&apos;s Free
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
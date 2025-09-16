'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Is QuickOpus2MP3 really free?',
    answer: 'Yes, 100% free forever! There are no hidden costs, no premium tiers, and no limitations. We believe in providing accessible tools for everyone.'
  },
  {
    question: 'Are my audio files safe and private?',
    answer: 'Absolutely! Your files are processed entirely in your browser using WebAssembly technology. No files are ever uploaded to our servers or any third-party service. Once you close the tab, all traces of your files are gone.'
  },
  {
    question: 'What browsers are supported?',
    answer: 'QuickOpus2MP3 works on all modern browsers including Chrome (88+), Firefox (78+), Safari (14+), and Edge (88+). For the best experience, we recommend using the latest version of your preferred browser.'
  },
  {
    question: 'Can I convert multiple files at once?',
    answer: 'Currently, you can convert one file at a time to ensure optimal performance and quality. Batch processing is on our roadmap and will be available soon!'
  },
  {
    question: 'What is the maximum file size I can convert?',
    answer: 'You can convert audio files up to 100MB in size. This limit ensures smooth performance in your browser while still accommodating most audio conversion needs.'
  },
  {
    question: 'How fast is the conversion process?',
    answer: 'Conversion speed depends on your device\'s processing power and the file size. Thanks to WebAssembly technology, most files under 20MB convert in just a few seconds. Larger files may take a bit longer but are still significantly faster than traditional online converters.'
  },
  {
    question: 'Can I use this tool offline?',
    answer: 'Once the page is loaded, the converter works entirely offline! You can bookmark the page and use it without an internet connection after the initial load.'
  },
  {
    question: 'What audio quality can I expect?',
    answer: 'You have full control over the output quality! Choose from 128 kbps (standard), 192 kbps (high quality), or 320 kbps (highest quality) to balance file size and audio fidelity according to your needs.'
  },
  {
    question: 'Why should I trust this converter?',
    answer: 'Our converter is open-source, uses industry-standard FFmpeg for processing, and operates entirely in your browser. You can verify our claims by checking your network tab - you\'ll see no file uploads!'
  },
  {
    question: 'Do you collect any data or analytics?',
    answer: 'We respect your privacy completely. We don\'t track conversions, collect file information, or store any personal data. The only analytics we use are basic page views to understand traffic patterns.'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <HelpCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Everything you need to know about QuickOpus2MP3
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-200 transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`px-6 transition-all duration-200 ease-in-out ${
                    openIndex === index ? 'py-4 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed pb-2">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              We&apos;re here to help! Feel free to reach out if you need any assistance.
            </p>
            <a
              href="https://github.com/Larrybin/opus2mp3/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
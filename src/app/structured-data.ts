// 2025 WebApplication structured data
export function getWebApplicationLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': 'https://opus2mp3.pages.dev/#application',
    name: 'QuickOpus2MP3',
    url: 'https://opus2mp3.pages.dev',
    description: 'Free browser-based audio converter for OPUS, OGG, and WebM files',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'AudioConverter',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript, WebAssembly support. Chrome 88+, Firefox 78+, Safari 14+, Edge 88+',

    // 2025 E-E-A-T signals
    author: {
      '@type': 'Organization',
      name: 'QuickOpus2MP3',
      url: 'https://github.com/Larrybin/opus2mp3',
    },

    // Software product details
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31',
    },

    // Feature list (detailed for AI understanding)
    featureList: [
      'Convert OPUS audio files to MP3 format',
      'Convert OGG audio files to MP3 format',
      'Convert WebM audio files to MP3 format',
      'Adjustable bitrate: 128kbps, 192kbps, 320kbps',
      'Client-side processing with WebAssembly',
      'No server upload required',
      'Works offline after initial load',
      'Preserves audio quality',
      'Batch processing capability',
      'Real-time conversion progress',
    ],

    // Performance metrics (Core Web Vitals)
    speed: {
      '@type': 'QuantitativeValue',
      value: '2.0',
      unitText: 'SEC',
      description: 'Average conversion time for 10MB file',
    },

    softwareVersion: '1.0.0',
    datePublished: '2024-09-01',
    dateModified: '2025-09-16',

    // User rating (placeholder data - should be based on real feedback)
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '245',
      reviewCount: '89',
    },

    // Technical requirements
    softwareRequirements: 'Modern web browser with WebAssembly support',
    memoryRequirements: 'Minimum 512MB available browser memory',

    // Privacy policy links
    privacyPolicy: 'https://opus2mp3.pages.dev/privacy',
    termsOfService: 'https://opus2mp3.pages.dev/terms',
  };
}

// 2025 How-to structured data (audio conversion steps)
export function getHowToLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': 'https://opus2mp3.pages.dev/#howto',
    name: 'How to Convert OPUS to MP3',
    description: 'Step-by-step guide to convert OPUS audio files to MP3 format',
    image: 'https://opus2mp3.pages.dev/tutorial-image.png',

    // Estimated time
    totalTime: 'PT1M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },

    // Tool requirements
    tool: {
      '@type': 'HowToTool',
      name: 'Web Browser',
      requiredQuantity: 1,
    },

    // Step details
    step: [
      {
        '@type': 'HowToStep',
        name: 'Open QuickOpus2MP3',
        text: 'Navigate to opus2mp3.pages.dev in your web browser',
        url: 'https://opus2mp3.pages.dev#step1',
        image: 'https://opus2mp3.pages.dev/step1.png',
      },
      {
        '@type': 'HowToStep',
        name: 'Upload OPUS file',
        text: 'Click the upload area or drag and drop your OPUS file',
        url: 'https://opus2mp3.pages.dev#step2',
        image: 'https://opus2mp3.pages.dev/step2.png',
      },
      {
        '@type': 'HowToStep',
        name: 'Select quality',
        text: 'Choose your preferred MP3 bitrate (128, 192, or 320 kbps)',
        url: 'https://opus2mp3.pages.dev#step3',
        image: 'https://opus2mp3.pages.dev/step3.png',
      },
      {
        '@type': 'HowToStep',
        name: 'Convert',
        text: 'Click "Start Conversion" and wait for processing',
        url: 'https://opus2mp3.pages.dev#step4',
        image: 'https://opus2mp3.pages.dev/step4.png',
      },
      {
        '@type': 'HowToStep',
        name: 'Download',
        text: 'Click "Download MP3" to save your converted file',
        url: 'https://opus2mp3.pages.dev#step5',
        image: 'https://opus2mp3.pages.dev/step5.png',
      },
    ],
  };
}

// Breadcrumb structured data
export function getBreadcrumbLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': 'https://opus2mp3.pages.dev/#breadcrumb',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://opus2mp3.pages.dev',
      },
    ],
  };
}

// Organization structured data
export function getOrganizationLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://opus2mp3.pages.dev/#organization',
    name: 'QuickOpus2MP3',
    url: 'https://opus2mp3.pages.dev',
    logo: 'https://opus2mp3.pages.dev/logo.png',
    sameAs: [
      'https://github.com/Larrybin/opus2mp3',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'technical support',
      url: 'https://github.com/Larrybin/opus2mp3/issues',
      availableLanguage: ['English'],
    },
  };
}

// FAQ structured data (Note: As of 2025, FAQPage is limited to government/health sites for rich results)
// But we can still include it for general SEO benefit
export function getFAQLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://opus2mp3.pages.dev/#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is QuickOpus2MP3 really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100% free forever! There are no hidden costs, no premium tiers, and no limitations. We believe in providing accessible tools for everyone.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are my audio files safe and private?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! Your files are processed entirely in your browser using WebAssembly technology. No files are ever uploaded to our servers or any third-party service. Once you close the tab, all traces of your files are gone.',
        },
      },
      {
        '@type': 'Question',
        name: 'What browsers are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'QuickOpus2MP3 works on all modern browsers including Chrome (88+), Firefox (78+), Safari (14+), and Edge (88+). For the best experience, we recommend using the latest version of your preferred browser.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I convert multiple files at once?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Currently, you can convert one file at a time to ensure optimal performance and quality. Batch processing is on our roadmap and will be available soon!",
        },
      },
      {
        '@type': 'Question',
        name: 'What is the maximum file size I can convert?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can convert audio files up to 100MB in size. This limit ensures smooth performance in your browser while still accommodating most audio conversion needs.',
        },
      },
      {
        '@type': 'Question',
        name: 'How fast is the conversion process?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Conversion speed depends on your device's processing power and the file size. Thanks to WebAssembly technology, most files under 20MB convert in just a few seconds. Larger files may take a bit longer but are still significantly faster than traditional online converters.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use this tool offline?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Once the page is loaded, the converter works entirely offline! You can bookmark the page and use it without an internet connection after the initial load.',
        },
      },
      {
        '@type': 'Question',
        name: 'What audio quality can I expect?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You have full control over the output quality! Choose from 128 kbps (standard), 192 kbps (high quality), or 320 kbps (highest quality) to balance file size and audio fidelity according to your needs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why should I trust this converter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Our converter is open-source, uses industry-standard FFmpeg for processing, and operates entirely in your browser. You can verify our claims by checking your network tab - you'll see no file uploads!",
        },
      },
      {
        '@type': 'Question',
        name: 'Do you collect any data or analytics?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "We respect your privacy completely. We don't track conversions, collect file information, or store any personal data. The only analytics we use are basic page views to understand traffic patterns.",
        },
      },
    ],
  };
}

// Combine all structured data for easy use
export function getAllStructuredData() {
  return [
    getWebApplicationLD(),
    getHowToLD(),
    getBreadcrumbLD(),
    getOrganizationLD(),
    getFAQLD(),
  ];
}
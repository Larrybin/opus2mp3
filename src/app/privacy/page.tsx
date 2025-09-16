import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - QuickOpus2MP3',
  description: 'Privacy policy for QuickOpus2MP3. Learn how we protect your data with 100% client-side processing and zero data collection.',
  alternates: {
    canonical: 'https://opus2mp3.pages.dev/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicy() {
  const lastUpdated = '2024-09-16';

  // 结构化数据
  const privacyPolicyLD = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    description: 'Privacy policy for QuickOpus2MP3 audio converter',
    url: 'https://opus2mp3.pages.dev/privacy',
    dateModified: lastUpdated,
    inLanguage: 'en-US',
    publisher: {
      '@type': 'Organization',
      name: 'QuickOpus2MP3',
      url: 'https://opus2mp3.pages.dev',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(privacyPolicyLD),
        }}
      />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <p className="text-sm text-gray-600 mb-8">Last updated: {lastUpdated}</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                QuickOpus2MP3 is committed to protecting your privacy. This Privacy Policy explains
                our data handling practices for our browser-based audio conversion service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Zero Data Collection</h2>
              <p className="text-gray-700 mb-4">
                <strong>We collect NO data:</strong> QuickOpus2MP3 processes all audio files
                locally in your browser using WebAssembly technology.
              </p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>No audio files uploaded to servers</li>
                <li>No personal information collected</li>
                <li>No tracking cookies</li>
                <li>No user accounts required</li>
                <li>No conversion history stored</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How It Works</h2>
              <p className="text-gray-700 mb-4">
                All audio processing happens entirely in your browser:
              </p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Files processed using FFmpeg.wasm locally</li>
                <li>No network requests during conversion</li>
                <li>Files never leave your device</li>
                <li>Results downloaded directly to your device</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Website Analytics</h2>
              <p className="text-gray-700 mb-4">
                We may use privacy-respecting analytics for basic traffic insights:
              </p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Anonymous page view counts</li>
                <li>General geographic regions (country-level)</li>
                <li>Browser types for compatibility</li>
                <li>No individual tracking or profiling</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                This website is hosted on Cloudflare Pages. Cloudflare may collect minimal
                technical data for service operation. Please refer to{' '}
                <a href="https://www.cloudflare.com/privacy/" target="_blank" rel="noopener noreferrer"
                   className="text-blue-600 hover:text-blue-700 underline">
                  Cloudflare&apos;s Privacy Policy
                </a>{' '}
                for their data handling practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
              <p className="text-gray-700 mb-4">
                Since we don&apos;t collect data, there&apos;s no risk of your information being compromised
                on our servers. All processing occurs locally, ensuring maximum security and privacy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Children&apos;s Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our service doesn&apos;t collect information from anyone, including children under 13.
                The service is safe for users of all ages as no data is collected or transmitted.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Policy Updates</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy occasionally. Changes will be posted on this page
                with an updated revision date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                Questions about this Privacy Policy? Contact us through our{' '}
                <a href="https://github.com/Larrybin/opus2mp3/issues" target="_blank" rel="noopener noreferrer"
                   className="text-blue-600 hover:text-blue-700 underline">
                  GitHub repository
                </a>.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
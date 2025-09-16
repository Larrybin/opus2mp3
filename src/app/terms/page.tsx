import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - QuickOpus2MP3',
  description: 'Terms of service for QuickOpus2MP3 free online audio converter. Clear terms for using our browser-based conversion tool.',
  alternates: {
    canonical: 'https://opus2mp3.pages.dev/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfService() {
  const lastUpdated = '2024-09-16';

  const termsLD = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service',
    description: 'Terms of service for QuickOpus2MP3 audio converter',
    url: 'https://opus2mp3.pages.dev/terms',
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
          __html: JSON.stringify(termsLD),
        }}
      />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <p className="text-sm text-gray-600 mb-8">Last updated: {lastUpdated}</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By using QuickOpus2MP3, you agree to these Terms of Service.
                If you disagree with any part, please don&apos;t use the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
              <p className="text-gray-700 mb-4">
                QuickOpus2MP3 provides free, browser-based audio conversion from OPUS, OGG,
                and WebM formats to MP3. All processing occurs locally using WebAssembly technology.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Usage Rights</h2>
              <p className="text-gray-700 mb-4">You may use this service to:</p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Convert audio files for personal use</li>
                <li>Convert audio files for commercial projects</li>
                <li>Use without attribution (though appreciated)</li>
              </ul>

              <p className="text-gray-700 mt-4">You may not:</p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Reverse engineer or modify the service</li>
                <li>Use for illegal purposes</li>
                <li>Convert copyrighted content without authorization</li>
                <li>Use automated systems to overload the service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Your Content</h2>
              <p className="text-gray-700 mb-4">
                You retain full ownership of audio files you convert. We claim no rights to your content.
                You&apos;re responsible for ensuring you have necessary rights to convert any files.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Service Availability</h2>
              <p className="text-gray-700 mb-4">
                The service is provided &quot;as is&quot; without warranties:
              </p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>No guarantee of uninterrupted operation</li>
                <li>No guarantee of specific conversion quality</li>
                <li>No guarantee of universal browser compatibility</li>
                <li>Use at your own risk</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                QuickOpus2MP3 and its developers are not liable for any indirect, incidental,
                special, or consequential damages, including loss of profits, data, or goodwill.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Privacy</h2>
              <p className="text-gray-700 mb-4">
                All file processing occurs locally in your browser. We don&apos;t collect, store,
                or transmit your files or personal data. See our{' '}
                <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                  Privacy Policy
                </a>{' '}
                for details.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Service Changes</h2>
              <p className="text-gray-700 mb-4">
                We may modify or discontinue the service anytime, with or without notice.
                We&apos;re not liable for any modification, suspension, or discontinuance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact</h2>
              <p className="text-gray-700 mb-4">
                Questions about these Terms? Contact us through our{' '}
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
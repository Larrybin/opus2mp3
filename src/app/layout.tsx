import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "QuickOpus2MP3 - Online Audio Converter",
  description: "Free online converter for OPUS, OGG, WebM audio to MP3 format. Processed entirely in browser, protecting your privacy.",
  keywords: "opus to mp3, ogg to mp3, webm to mp3, audio converter, online audio converter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

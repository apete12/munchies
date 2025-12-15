import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from './components/header/header';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Munchies',
  description: "We'll help you find your next favorite meal!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-4 py-5 `}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}

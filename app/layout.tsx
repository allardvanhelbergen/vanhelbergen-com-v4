import type { ReactNode } from 'react';
import './globals.css';

// Force static site generation for all routes under this layout.
export const dynamic = 'force-static';
// No revalidation (build-time only). Set a number (seconds) later for ISR.
export const revalidate = false;

export const metadata = {
  title: 'Allard van Helbergen',
  description: 'Personal site and portfolio',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full bg-white text-slate-900 antialiased">
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}

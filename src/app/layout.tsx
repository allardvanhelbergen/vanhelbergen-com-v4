import type { ReactNode, JSX } from 'react';
import './globals.css';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata = {
  title: 'Allard van Helbergen',
  description: 'Personal site and portfolio',
};

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="en" className="h-full bg-white text-slate-900 antialiased">
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}

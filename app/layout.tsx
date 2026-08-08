import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Quran App',
  description: 'Quran App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body suppressHydrationWarning className="antialiased selection:bg-emerald-500/30 selection:text-emerald-900 dark:selection:text-emerald-100 font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}

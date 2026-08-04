import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Quran App - Ayah Inspired Apple Liquid Glass',
  description: 'Quran Application inspired by Ayah App layout with Apple Liquid Glassmorphic design system.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Scheherazade+New:wght@400;600;700&family=Vazirmatn:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-900 dark:selection:text-emerald-100 font-sans min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}


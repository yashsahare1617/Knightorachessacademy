import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VisitorTracker from '@/components/shared/VisitorTracker';
import { AuthProvider } from '@/lib/auth-context';

export const metadata: Metadata = {
  title: {
    default: 'KnightOra Chess Academy — Better Thinkers. Stronger Moves.',
    template: '%s | KnightOra Chess Academy',
  },
  description:
    'KnightOra Chess Academy offers world-class chess training for all ages and skill levels. Join structured programs led by expert coaches and unlock your full potential on the board.',
  keywords: ['chess academy', 'chess lessons', 'chess training', 'chess for kids', 'online chess classes', 'knightora', 'chess coaching'],
  authors: [{ name: 'KnightOra Chess Academy' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://knightora.com',
    siteName: 'KnightOra Chess Academy',
    title: 'KnightOra Chess Academy — Better Thinkers. Stronger Moves.',
    description: 'World-class chess training for all ages. Expert coaches, structured programs, real results.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'KnightOra Chess Academy' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://knightora.com'),
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/images/knightora-logo.jpg' },
    ],
    apple: '/images/knightora-logo.jpg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/images/knightora-logo.jpg" />
        <link rel="apple-touch-icon" href="/images/knightora-logo.jpg" />
      </head>
      <body>
        <AuthProvider>
          <VisitorTracker />
          <Navbar />
          <main>{children}</main>
          <Footer />
          {/* Floating WhatsApp button */}
          <a
            href="https://wa.me/918459527115?text=Hi!%20I%27d%20like%20to%20know%20more%20about%20KnightOra%20Chess%20Academy"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float"
            aria-label="Chat on WhatsApp"
          >
            <svg viewBox="0 0 24 24" width="28" height="28" fill="white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#ffffff',
                color: '#0f172a',
                border: '1px solid rgba(201,162,39,0.3)',
                borderRadius: '10px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                fontFamily: 'Inter, sans-serif',
              },
              success: { iconTheme: { primary: '#b8860b', secondary: '#ffffff' } },
              error: { iconTheme: { primary: '#e11d48', secondary: '#ffffff' } },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}

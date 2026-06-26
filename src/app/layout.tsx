import type { Metadata } from 'next';
import './globals.css';
import { SonanceAuthProvider } from '@danainnovations/sonance-auth';
import { ProfileWidget } from '@/components/profile-widget';

export const metadata: Metadata = {
  title: 'Monday Sales Report — Sonance',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SonanceAuthProvider appName="Monday Sales Report">
          <ProfileWidget />
          {children}
        </SonanceAuthProvider>
      </body>
    </html>
  );
}

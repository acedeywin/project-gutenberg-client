import type { Metadata } from 'next';
import Providers from './redux/Provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Project Gutenberg',
  description: 'Project Gutenberg is a platform to download and access free e-books.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

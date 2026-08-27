import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portfolio v2 — Lucas Santos',
  description:
    'Novo portfólio de Lucas Santos: desenvolvimento de software, sites profissionais e experiências digitais.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

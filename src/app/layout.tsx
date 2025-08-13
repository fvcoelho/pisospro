import type { Metadata } from "next";
import "./globals.css";
import RootProvider from "@/components/RootProvider";

export const metadata: Metadata = {
  title: "Pisos Pró",
  description: "Especialistas em instalação, reforma e manutenção de pisos de madeira. Artesanato de qualidade com mais de 15 anos de experiência em São Paulo.",
  keywords: "pisos, madeira, cerâmica, laminado, vinílico, carpete, instalação, reforma, profissional",
  icons: {
    apple: '/apple-touch-icon.png',
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ]
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
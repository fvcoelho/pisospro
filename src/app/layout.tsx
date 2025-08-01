import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import AnalyticsProvider from "@/components/AnalyticsProvider";

export const metadata: Metadata = {
  title: "Pisos-Pró - Soluções Profissionais em Pisos de Madeira",
  description: "Especialistas em instalação, reforma e manutenção de pisos de madeira. Artesanato de qualidade com mais de 25 anos de experiência em São Paulo.",
  keywords: "pisos, madeira, cerâmica, laminado, vinílico, carpete, instalação, reforma, profissional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <AnalyticsProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
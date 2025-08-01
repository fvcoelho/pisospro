import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
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
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
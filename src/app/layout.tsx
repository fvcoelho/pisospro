import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnalyticsProvider from "@/components/AnalyticsProvider";

export const metadata: Metadata = {
  title: "Pisos-Pró - Soluções Profissionais em Pisos",
  description: "Instalação especializada, reforma e manutenção de pisos. Artesanato de qualidade com mais de 25 anos de experiência.",
  keywords: "pisos, madeira, cerâmica, laminado, vinílico, carpete, instalação, reforma, profissional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AnalyticsProvider>
          <Navbar />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
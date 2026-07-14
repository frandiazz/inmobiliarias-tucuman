import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/ui/PageTransition";
import ToastProvider from "@/components/ui/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://tucumaninmuebles.com"

export const metadata: Metadata = {
  title: {
    default: "Tucumán Inmuebles | Portal Inmobiliario de Tucumán",
    template: "%s | Tucumán Inmuebles",
  },
  description:
    "Encontrá tu propiedad ideal en Tucumán. Casas, departamentos, terrenos, dúplex. El portal inmobiliario N°1 de la provincia.",
  keywords: [
    "inmobiliarias Tucumán",
    "propiedades Tucumán",
    "casas en venta Tucumán",
    "departamentos Tucumán",
    "alquiler Tucumán",
    "terrenos Tucumán",
    "portal inmobiliario",
  ],
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Tucumán Inmuebles",
    title: "Tucumán Inmuebles | Portal Inmobiliario de Tucumán",
    description:
      "Encontrá tu propiedad ideal en Tucumán. Casas, departamentos, terrenos y más.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Tucumán Inmuebles | Portal Inmobiliario de Tucumán",
    description:
      "Encontrá tu propiedad ideal en Tucumán. Casas, departamentos, terrenos y más.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <div className="flex-1 pt-20">
          <ToastProvider>
            <PageTransition>{children}</PageTransition>
          </ToastProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}

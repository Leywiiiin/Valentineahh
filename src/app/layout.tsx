import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Lora, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Valentine's Day Niki | With Love",
  description: "A beautiful Valentine's Day dedication for Niki, the love of my life",
  keywords: ["Valentine's Day", "Love", "Romance", "Niki"],
  authors: [{ name: "With Love" }],
  icons: {
    icon: "/valentine-heart.png",
  },
  openGraph: {
    title: "Happy Valentine's Day Niki | With Love",
    description: "A beautiful Valentine's Day dedication for Niki, the love of my life",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${playfair.variable} ${cormorant.variable} ${lora.variable} ${libreBaskerville.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

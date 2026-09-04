import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Treva Antony Ogwang — Product, Data & Technology",
  description: "Product case studies and practical work across fintech, data, and modern technology.",
  openGraph: {
    title: "Treva Antony Ogwang — Product, Data & Technology",
    description: "Product case studies and practical work across fintech, data, and modern technology.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Personal portfolio preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Treva Antony Ogwang — Product, Data & Technology",
    description: "Product case studies and practical work across fintech, data, and modern technology.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/owl-mark.png",
    shortcut: "/owl-mark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

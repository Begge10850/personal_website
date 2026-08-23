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
  title: "Treva Antony Ogwang — Data & Software Portfolio",
  description: "A clean personal portfolio for work across data, artificial intelligence, and modern software.",
  openGraph: {
    title: "Treva Antony Ogwang — Data & Software Portfolio",
    description: "Data, AI & modern software.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Personal portfolio preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Treva Antony Ogwang — Data & Software Portfolio",
    description: "Data, AI & modern software.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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

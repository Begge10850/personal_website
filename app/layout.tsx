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
  title: "Your Name — Data & Software Engineer",
  description: "Personal portfolio of a data and software engineer building useful, dependable digital products.",
  openGraph: {
    title: "Your Name — Data & Software Engineer",
    description: "I build useful things with data and code.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Personal portfolio preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name — Data & Software Engineer",
    description: "I build useful things with data and code.",
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

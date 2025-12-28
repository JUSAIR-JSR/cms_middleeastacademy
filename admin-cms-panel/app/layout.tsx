import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ---------------------------------------
   GLOBAL METADATA (FAVICON CONFIGURED)
--------------------------------------- */
export const metadata: Metadata = {
  title: "CMS - middleeastacademy",
  description: "Admin CMS Panel for middleeastacademy",

  icons: {
    icon: [
      {
        url: "/icons/favicon.ico",
        sizes: "any",
      },
    ],
    shortcut: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
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
        {/* Google Identity Services */}
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="beforeInteractive"
        />

        {children}

        {/* Global Toast Provider */}
        <Toaster
          position="top-right"
          richColors
          closeButton
        />
      </body>
    </html>
  );
}

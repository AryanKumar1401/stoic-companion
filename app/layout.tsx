import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Stoic Companion',
    default: 'Stoic Companion',
  },
  description: "Your daily companion for stoic wisdom and philosophical insights",
  keywords: ["stoicism", "philosophy", "wisdom", "meditation", "daily quotes"],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} font-sans antialiased min-h-screen bg-gradient-to-b from-background to-muted relative`}>
        <div className="fixed inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="fixed inset-0 bg-gradient-to-tr from-background via-transparent to-background -z-10" />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

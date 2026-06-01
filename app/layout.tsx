import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import GrainOverlay from "@/components/GrainOverlay";
import Cursor from "@/components/Cursor";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Maison Noir — Architectural Real Estate",
  description:
    "An exclusive atelier brokering architectural masterpieces, penthouses, and modernist residences across the world's most coveted addresses.",
  keywords: [
    "luxury real estate",
    "architectural homes",
    "penthouses",
    "villas",
    "maison noir",
  ],
};

// This export strictly forces mobile browsers to never zoom out or exceed device boundaries
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents iOS Safari from breaking layout via pinch-zoom quirks
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Josefin+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('mn-theme');var s=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=t?t==='dark':s;if(d){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <SmoothScroll>
          <Cursor />
          <Navigation />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

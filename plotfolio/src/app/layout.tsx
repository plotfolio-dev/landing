import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { landing } from "@/lib/landing-config";
import { analyticsEnabled } from "@/lib/analytics";
import { Analytics } from "@vercel/analytics/next";

const dmSans = localFont({
  src: "./fonts/dm-sans.woff2",
  variable: "--font-dm-sans",
  weight: "100 1000",
  style: "normal",
  display: "swap",
});

const poppins = localFont({
  src: [
    { path: "./fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const caveat = localFont({
  src: "./fonts/caveat.woff2",
  variable: "--font-caveat",
  weight: "400 700",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://landing-virid-phi.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: { title: landing.title, description: landing.description, images: [{ url: "/opengraph-image", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: landing.title, description: landing.description, images: ["/opengraph-image"] },
  title: landing.title,
  description:
    landing.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Extensions may inject root attributes before hydration. This escape hatch
  // applies only to <html>; descendant hydration checks remain enabled.
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${poppins.variable} ${caveat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}{analyticsEnabled && <Analytics />}
      </body>
    </html>
  );
}

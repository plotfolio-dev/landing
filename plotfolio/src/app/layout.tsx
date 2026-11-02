import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
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
  openGraph: { title: "Plotfolio AI — Join early access", description: "Software for construction, collections and property operations.", images: [{ url: "/opengraph-image", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Plotfolio AI — Join early access", description: "Software for construction, collections and property operations.", images: ["/opengraph-image"] },
  title: "Plotfolio AI — AI Software for Every Stage of a Built Asset's Life",
  description:
    "Plotfolio AI builds AI software for every stage of a built asset's life. Milestone and Keeper help developers and facility teams turn messy field updates into money and decisions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${poppins.variable} ${caveat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}<Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ElevenLabsProvider from "./components/ElevenLabsProvider";

const dmSans = localFont({
  src: "./fonts/dm-sans.ttf",
  variable: "--font-dm-sans",
  weight: "100 1000",
  style: "normal",
  display: "swap",
});

const poppins = localFont({
  src: [
    { path: "./fonts/poppins-500.ttf", weight: "500", style: "normal" },
    { path: "./fonts/poppins-600.ttf", weight: "600", style: "normal" },
    { path: "./fonts/poppins-700.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const caveat = localFont({
  src: "./fonts/caveat.ttf",
  variable: "--font-caveat",
  weight: "400 700",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
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
        <ElevenLabsProvider>{children}</ElevenLabsProvider>
      </body>
    </html>
  );
}

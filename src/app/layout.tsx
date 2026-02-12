import type { Metadata } from "next";
import { Space_Grotesk, Young_Serif } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const youngSerif = Young_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-young-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mike & Matty - Strategy Call",
  description:
    "Grow Your Income with YouTube. The exact system used by Mike & Matty to build a multi-million dollar education business.",
  icons: {
    icon: "https://images.squarespace-cdn.com/content/v1/675a118bf08387223db19e47/d5f23eef-5adb-402d-a541-981db4b9247e/favicon.ico?format=100w",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${youngSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}

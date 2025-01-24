import type { Metadata } from "next";
import localFont from "next/font/local";
import { Lexend } from "next/font/google";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"], // เพิ่มน้ำหนัก 300 (Light)
  variable: "--font-lexend", // Custom CSS variable
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bamboo Family Market",
  description: "for Sangadee space",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lexend.variable} bg-[#FFF7EB] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const DMSans_Bold = localFont({
  src: "./fonts/DMSans-Bold.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const DMSans_Reagular = localFont({
  src: "./fonts/DMSans-Regular.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const DMSans_Medium = localFont({
  src: "./fonts/DMSans-Medium.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "MHealth Admin",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${DMSans_Bold.variable} ${DMSans_Reagular.variable} ${DMSans_Medium.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

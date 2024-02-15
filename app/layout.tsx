import type { Metadata } from "next";

import "./globals.css";

import localFont from "next/font/local";

const poppins = localFont({
  src: [
    {
      path: "../public/fonts/poppins/Poppins-Thin.ttf",
      weight: "100",
    },
    {
      path: "../public/fonts/poppins/Poppins-ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "../public/fonts/poppins/Poppins-Light.ttf",
      weight: "300",
    },
    {
      path: "../public/fonts/poppins/Poppins-Regular.ttf",
      weight: "400",
    },
    {
      path: "../public/fonts/poppins/Poppins-Medium.ttf",
      weight: "500",
    },
    {
      path: "../public/fonts/poppins/Poppins-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../public/fonts/poppins/Poppins-Bold.ttf",
      weight: "700",
    },
    {
      path: "../public/fonts/poppins/Poppins-ExtraBold.ttf",
      weight: "800",
    },
    {
      path: "../public/fonts/poppins/Poppins-Black.ttf",
      weight: "900",
    },
  ],
});

export const metadata: Metadata = {
  title: "FilmFiesta",
  description: "Free Movies & Tv Shows Online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${poppins.className}`}>{children}</body>
    </html>
  );
}

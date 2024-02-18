"use client";
import { useState, useEffect } from "react";
import "./globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import SearchFilm from "@/components/Search";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHidden, setIsHidden] = useState(false);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <html lang='en'>
      <body className={`${poppins.className} relative`}>
        <div
          className={` ${
            isHidden ? "overflow-hidden h-screen" : "overflow-y-auto"
          }`}>
          <Navbar toggleHidden={toggleHidden} />
          {children}
        </div>
        <div>{isHidden && <SearchFilm toggleHidden={toggleHidden} />}</div>
      </body>
    </html>
  );
}

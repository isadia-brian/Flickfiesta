import { Poppins } from "next/font/google";

import Navbar from "@/components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700", "800"],
});

export default function NavigationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={poppins.className}>
      <Navbar />
      {children}
    </div>
  );
}

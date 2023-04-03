import "./globals.css";
import { Cabin } from "next/font/google";

import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
  title: "Tangerine Moose Blog App",
  description: "Blog app engineered by the Tangerine Moose team",
  author: "Tangerine Moose Team",
  charSet: "utf-8",
};

const cabin = Cabin({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cabin.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

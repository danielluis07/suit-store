import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const playfar_display = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Corpo Plaza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfar_display.className} bg-black`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

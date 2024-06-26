import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Analytics } from "@vercel/analytics/react";
import { db } from "@/lib/db";
import { getProducts } from "@/actions/get-data/get-products";
import QueryProvider from "@/providers/query-provider";
import { CartNameProvider } from "@/providers/cart-name-provider";

const playfar_display = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Corpo Plaza",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  let user = null;

  if (session) {
    user = await db.user.findUnique({
      where: { id: session?.user.id },
    });
  }

  const allProducts = await getProducts({ isArchived: true });

  console.log(session, "session");
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${playfar_display.className} bg-black`}>
          <QueryProvider>
            <Toaster />
            <CartNameProvider session={session}>
              <Navbar session={session} user={user} products={allProducts} />
              {children}
              <Analytics />
              <Footer />
            </CartNameProvider>
          </QueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}

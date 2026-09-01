import type { Metadata } from "next";
import type { ReactNode } from "react";
import { archivo } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Domeinox",
  description: "Domeinox sh.p.k. — moduli in acciaio, fabbricati in Albania.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it" className={`${archivo.variable} antialiased`}>
      <body className="flex flex-col">{children}</body>
    </html>
  );
}

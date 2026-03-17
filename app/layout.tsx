import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/context/LangContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "PizzaDAO x Música Web3 — Concurso Musical",
  description: "Postula tu canción y gana hasta $200 USD. Temática pizza, comunidad y web3. Licencia CC0.",
  openGraph: {
    title: "PizzaDAO x Música Web3 — Concurso Musical",
    description: "Postula tu canción y gana hasta $200 USD.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased bg-black`}>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}

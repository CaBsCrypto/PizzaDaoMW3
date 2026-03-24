import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/context/LangContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "PizzaDAO × MusicaW3 — Concurso Musical en Español",
  description: "Postula tu canción al primer concurso musical de PizzaDAO y MusicaW3. $350 USDC en premios. Licencia CC0. Cierra el 4 de mayo.",
  metadataBase: new URL('https://pizzadao-mw3.vercel.app'),
  openGraph: {
    title: "PizzaDAO × MusicaW3 — Concurso Musical en Español",
    description: "Postula tu canción y gana hasta $200 USDC. Licencia CC0. Cierra el 4 de mayo.",
    type: "website",
    url: "https://pizzadao-mw3.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "PizzaDAO × MusicaW3 — Concurso Musical en Español",
    description: "Postula tu canción y gana hasta $200 USDC. Licencia CC0. Cierra el 4 de mayo.",
    site: "@Musica_W3",
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

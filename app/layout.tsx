import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/context/LangContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "PizzaDAO × MusicaW3 — Concurso Musical en Español",
  description: "Postula tu canción al primer concurso musical de PizzaDAO y MusicaW3. $350 USDC en premios. Licencia CC0. Cierra el 10 de mayo.",
  metadataBase: new URL('https://pizzadao-mw3.vercel.app'),
  openGraph: {
    title: "PizzaDAO × MusicaW3 — Concurso Musical en Español",
    description: "Postula tu canción y gana hasta $350 USDC. Licencia CC0. Cierra el 10 de mayo.",
    type: "website",
    url: "https://pizzadao-mw3.vercel.app",
    images: [
      {
        url: "https://pizzadao-mw3.vercel.app/opengraph-image",
        width: 1200,
        height: 630,
        alt: "PizzaDAO × MusicaW3 — Concurso Musical en Español",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PizzaDAO × MusicaW3 — Concurso Musical en Español",
    description: "Postula tu canción y gana hasta $350 USDC. Licencia CC0. Cierra el 10 de mayo.",
    site: "@Musica_W3",
    images: ["https://pizzadao-mw3.vercel.app/opengraph-image"],
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

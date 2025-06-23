"use client";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import {Suspense} from "react";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});


const hideHeaderPages = [
  "/Ana/cadastro",
  "/Ana/login",
  "/Ana/alterarSenha",
  "/Ana/recuperar",
  "/Ana/verificarCodi",
  "/"
];


const hideFooterPages = [
  "/Ana/login",
  "/Ana/cadastro",
  "/Ana/alterarSenha",
  "/Ana/recuperar",
  "/Ana/verificarCodi",
  "/",
];

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="pt-BR">
      <Suspense fallback={<div>Carregando...</div>}>
        <body className={poppins.className}>
          {!hideHeaderPages.includes(pathname) && <Header />}
          <main>{children}</main>
          {!hideFooterPages.includes(pathname) && <Footer />}
        </body>
      </Suspense>

    </html>
  );
}

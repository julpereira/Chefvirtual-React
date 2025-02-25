"use client";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});


const hideHeaderPages = [
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
      <body className={poppins.className}>
        {!hideHeaderPages.includes(pathname) && <Header />}
        <main>{children}</main>
        {!hideFooterPages.includes(pathname) && <Footer />}
      </body>
    </html>
  );
}

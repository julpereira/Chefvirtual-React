"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Chefvirtual",
//   description: "Projeto Fábrica de Software",
//   charset: "UTF-8",
//   author: 'Ana Isabely, Camille Patricio, João Bento, João Guerini, João Vitor, Júlia Pereira',
//   keywords: 'CSS, JavaScript, React. Next.js'
// };

const hideHeaderPages = ["/login", "/Guerini/visuInicial"];

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {!hideHeaderPages.includes(pathname) && <Header></Header>}
        {children}
      </body>
    </html>
  );
}

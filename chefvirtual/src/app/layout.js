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
      <body className={poppins.className}>
        {!hideHeaderPages.includes(pathname) && <Header></Header>}
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}

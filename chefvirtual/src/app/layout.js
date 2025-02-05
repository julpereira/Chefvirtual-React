import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chefvirtual",
  description: "Projeto Fábrica de Software",
  charset: "UTF-8",
  author: 'Ana Isabely, Camille Patricio, João Bento, João Guerini, João Vitor, Júlia Pereira',
  keywords: 'CSS, JavaScript, React. Next.js'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

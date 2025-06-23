"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSw');
  const [userId, setUserId] = useState('8');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenFromCookie = Cookies.get("token");
      const idFromCookie = Cookies.get("id");

      console.log("🍪 token:", tokenFromCookie);
      console.log("🍪 id:", idFromCookie);

      setToken(tokenFromCookie || null);
      setUserId(idFromCookie || null);
      setLoading(false);
    }
  }, [pathname]);


  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      router.push(`/Guerini/resulBusca?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  if (loading) {
    return null; // não renderiza nada enquanto carrega o cookie
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerDivPages}>
        <div className={styles.headerImgLogo}>
          <Image src="/img/logo.svg" alt="logo-chef-virtual" width={100} height={90} />
        </div>

        <ul className={styles.ul}>
          <li className={styles.li}>
            <a href="/julia/homepage" className={styles.a}>INÍCIO</a>
          </li>
          <li className={styles.li}>
            <a href={token ? "/Camille" : "/Ana/login"} className={styles.a}>PUBLICAR</a>
          </li>
        </ul>
      </div>

      <div className={styles.headerDivSearch}>
        <input
          type="text"
          placeholder="O que vamos comer hoje?"
          className={styles.headerSearchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className={styles.headerSearchButton} onClick={handleSearch}>
          <Image src="/img/search-icon.webp" alt="Buscar" className={styles.headerSearchIcon} width={20} height={20} />
        </button>
      </div>

      <div className={styles.headerDivEnd}>
        <Link href={userId ? '/julia/perfil?id=' + userId : "/Ana/login"}>
          <Image src="/img/icon-perfil.png" alt="Perfil" width={70} height={70} />
        </Link>
        {!token && (
          <a href="/Ana/login" className={styles.headerGoLoginButton}>Login</a>
        )}
      </div>
    </header>
  );
}

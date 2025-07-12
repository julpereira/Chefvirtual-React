"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import valorUrl from "@/app/urls"; // importe sua url base da API

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para converter imagem do usuário (array buffer) para base64
  const renderImagemBase64 = (imagem) => {
    if (!imagem || !imagem.data) return null;
    const byteArray = new Uint8Array(imagem.data);
    const base64String = btoa(
      byteArray.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
    return `data:image/jpeg;base64,${base64String}`;
  };

  useEffect(() => {
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {});

    const t = cookies.token || null;
    const id = cookies.id || null;
    setToken(t);
    setUserId(id);
    setLoading(false);

    // Se tiver id, buscar foto do usuário
    if (id) {
      fetch(`${valorUrl}/api/Usuarios/getById/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao buscar usuário");
          return res.json();
        })
        .then((data) => {
          // Supondo que a API retorne um objeto usuário
          // e que data.imagemUsuario é o buffer da imagem
          const imgSrc = renderImagemBase64(data.imagemUsuario);
          setUserImage(imgSrc);
        })
        .catch((err) => {
          console.error("Erro ao carregar foto do usuário:", err);
          setUserImage(null);
        });
    } else {
      setUserImage(null);
    }
  }, [pathname]);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      router.push(`/Guerini/resulBusca?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  if (loading) {
    return null; // não renderiza enquanto carrega cookies
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
          {userImage ? (
            <img
              src={userImage}
              alt="Foto do usuário"
              className={styles.userPhoto}
              style={{ width: 70, height: 70, borderRadius: "50%", objectFit: "cover" }}
            />
          ) : (
            <Image src="/img/icon-perfil.png" alt="Perfil" width={70} height={70} />
          )}
        </Link>
        {!token && (
          <a href="/Ana/login" className={styles.headerGoLoginButton}>Login</a>
        )}
      </div>
    </header>
  );
}

"use client";
import Image from "next/image";
import styles from "./header.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        if (searchTerm.trim() !== "") {
            router.push(`/Guerini/resulBusca?query=${encodeURIComponent(searchTerm)}`);
        }
    };

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
                        <a href="/Camille" className={styles.a}>PUBLICAR</a>
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
                <Image src="/img/icon-perfil.png" alt="" width={70} height={70} />
                <a href="/Ana/login" className={styles.headerGoLoginButton}>Login</a>
            </div>
        </header>
    );
}

"use client";
import Image from "next/image";
import styles from "./header.module.css";
import img from '../../../public/img/logo.png'
Image

export default function Header(){
    return(
        <header className={styles.header}>
            <div className={styles.headerDivPages}>
                <div className={styles.headerImgLogo}>
                    <Image src="/img/logo.png" alt="logo-chef-virtual"width={100} height=   {90}></Image>
                </div>

                <ul className={styles.ul}>
                    <li className={styles.li}><a href="/julia/homepage" className={styles.a} >INÍCIO</a></li>
                    <li className={styles.li}><a href="/Camille" className={styles.a}>PUBLICAR</a></li>
                </ul>
            </div>

            <div className={styles.headerDivSearch}>
                    <input type="text" placeholder="O que vamos comer hoje?" className={styles.headerSearchInput}></input>
                <button className={styles.headerSearchButton} onclick="goPesquisa()">
                    <Image src="/img/search-icon.webp" alt="Buscar" className={styles.headerSearchIcon} width={20} height={20}></Image>
                </button>
            </div>

            <div className={styles.headerDivEnd}>
                <Image src="/img/icon-perfil.png" alt="" width={70} height={70}></Image>
                <a href="/Ana/login" className={styles.headerGoLoginButton}>Login</a>
            </div>
        </header> 
    )
} 
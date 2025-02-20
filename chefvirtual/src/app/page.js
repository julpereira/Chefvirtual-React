"use client"
import Image from "next/image";
import styles from "@/app/page.module.css";


export default function Header(){
    return(
        <div className={styles.react}>
            <main className={styles.corpo}>
                <div className={styles.logoDiv}>
                    <Image src="/img/logo.svg" id="logo-img" alt="" width={600} height={600}></Image>
                </div>
        
                <div className={styles.infosDiv}>
                    <h2 className={styles.infosDivH2}>Explore o melhor do Universo Culinário </h2>
                    <p className={styles.infosDivP}>Aproveite uma vasta coleção de receitas deliciosas e práticas para todos os gostos e ocasiões.</p>
                    <a href="./julia/homepage" id={styles.buttonAccess}>Acesse Aqui</a>
                </div>

                <div className={styles.imagensDiv}>
                    <Image src="/img/alimentos.svg" alt="alimento" width={700} height={700}></Image>
                </div>
            </main>
        </div>
    )
}


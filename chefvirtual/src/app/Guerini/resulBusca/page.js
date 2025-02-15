"use client"
import Image from "next/image";
import styles from "./resulBusca.module.css";
import RecipeCard from "@/components/ReceitaResult";
import { Poppins } from "next/font/google";

const poppinsFont = Poppins({
    subsets: ["latin"],
    weight: "400",
})
export default function ResulBusca(){
    return(
        <div className={styles.Main}>
            <h2 className={`${styles.titleResult} ${poppinsFont.className}}`}>20 Resultados para <span className={styles.digitoPesquisa}>Pastel</span> </h2>
            <div className={styles.elementos}>
                <RecipeCard></RecipeCard>
                <RecipeCard></RecipeCard>
                <RecipeCard></RecipeCard>
                <RecipeCard></RecipeCard>
                <RecipeCard></RecipeCard>
                <RecipeCard></RecipeCard>
                <RecipeCard></RecipeCard>
                <RecipeCard></RecipeCard>
            </div>
        </div>
    )
}


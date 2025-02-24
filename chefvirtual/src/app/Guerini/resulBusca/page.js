"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/router"; 
import styles from "./resulBusca.module.css";
import RecipeCard from "@/components/ReceitaResult";
import { Poppins } from "next/font/google";
import ModalPesquisa from "@/components/modalPesquisa/modalPesquisa";
import { SlidersHorizontal } from "lucide-react";

const poppinsFont = Poppins({
    subsets: ["latin"],
    weight: "400",
});

export default function ResulBusca() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [query, setQuery] = useState("Nenhuma pesquisa");

    const router = useRouter(); 
    const { query: queryParam } = router.query;  // Obtendo o parâmetro "query" da URL

    useEffect(() => {
        if (queryParam) {
            setQuery(queryParam);
        }
    }, [queryParam]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <div className={styles.Main}>
                <div className={styles.headerBusca}>
                    <h2 className={`${styles.titleResult} ${poppinsFont.className}`}>
                        20 Resultados para <span className={styles.digitoPesquisa}>{query}</span>
                    </h2>

                    <button 
                        onClick={openModal} 
                        className={styles.filterButton}
                        aria-label="Filtrar"
                    >
                        <SlidersHorizontal size={28} color="#FF914D" />
                    </button>
                </div>

                <div className={styles.elementos}>
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                </div>

                <ModalPesquisa isOpen={isModalOpen} onClose={closeModal} />
            </div>
        </Suspense>
    );
}

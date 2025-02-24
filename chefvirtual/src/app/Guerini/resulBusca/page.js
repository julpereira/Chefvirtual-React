"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
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

    const searchParams = useSearchParams();

    useEffect(() => {
        const searchQuery = searchParams.get("query");
        if (searchQuery) {
            setQuery(searchQuery);
        }
    }, [searchParams]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        // Envolvendo tudo com Suspense para garantir que o uso do `useSearchParams` aconteça somente no lado do cliente
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

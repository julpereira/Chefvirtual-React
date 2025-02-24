"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic"; 
import styles from "./resulBusca.module.css";
import RecipeCard from "@/components/ReceitaResult";
import { Poppins } from "next/font/google";
import ModalPesquisa from "@/components/modalPesquisa/modalPesquisa";
import { SlidersHorizontal } from "lucide-react";

const poppinsFont = Poppins({
    subsets: ["latin"],
    weight: "400",
});

const RouterComponent = dynamic(() => import("next/router"), { ssr: false });

export default function ResulBusca() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [query, setQuery] = useState("pastel");

    const [router, setRouter] = useState(null);

    useEffect(() => {

        import("next/router").then((module) => {
            setRouter(module.useRouter());
        });
    }, []);

    useEffect(() => {
        if (router) {
            const { query: queryParam } = router.query;
            if (queryParam) {
                setQuery(queryParam);
            }
        }
    }, [router]);

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
                        <SlidersHorizontal size={28} color="#000000" />
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

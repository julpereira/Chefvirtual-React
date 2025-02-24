import { Suspense } from 'react';
import { useState } from 'react';
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
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "Nenhuma pesquisa";

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <Suspense fallback={<div>Loading...</div>}>
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

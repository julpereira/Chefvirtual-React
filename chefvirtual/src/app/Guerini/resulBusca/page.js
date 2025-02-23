'use client';
import { useState } from 'react';
import Image from "next/image";
import styles from "./resulBusca.module.css";
import RecipeCard from "@/components/ReceitaResult";
import { Poppins } from "next/font/google";
import ModalPesquisa from "@/components/modalPesquisa/modalPesquisa";

const poppinsFont = Poppins({
    subsets: ["latin"],
    weight: "400",
});

export default function ResulBusca() {
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const openModal = () => {
        setIsModalOpen(true); 
    };

    const closeModal = () => {
        setIsModalOpen(false); 
    };

    return (
        <div className={styles.Main}>
            <h2 className={`${styles.titleResult} ${poppinsFont.className}}`}>
                20 Resultados para <span className={styles.digitoPesquisa}>Pastel</span>
            </h2>

            <button onClick={openModal} style={{ padding: '10px 20px', backgroundColor: '#FF914D', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Pesquisa avançada
            </button>

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

            {/* Modal */}
            <ModalPesquisa isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}
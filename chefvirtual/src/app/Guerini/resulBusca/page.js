"use client";

import { useState, useEffect, Suspense } from "react";
import valorURL from '@/app/urls';
import { useRouter, useSearchParams } from "next/navigation";
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
    // Lógica para exibição visual
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Lógica para executar controlar serviço
    const searchParams = useSearchParams();
    const querya = searchParams.get("query");
    const [receitas, setReceitas] = useState([]);
    const [message, setMessage] = useState("");

    const router = useRouter();

    useEffect(() => {

        async function fetchData() {
            try {
                setReceitas([]);
                setMessage("Buscando receitas...");

                const response = await fetch(`${valorURL}/api/Receitas/BuscaPorTitulo?tituloReceita=${querya}`);
                const data = await response.json();
                console.log("Dados recebidos:", data);

                if (response.ok) {
                    setReceitas(data);
                    setMessage(data.length + (receitas.length === 1 ? " Resultado" : " Resultados" + " para"));
                }

                if (response.status === 404 || data.length === 0) {
                    console.log("Nenhum resultado encontrado para a pesquisa.");
                    setMessage("Nenhum resultado encontrado para a pesquisa");
                }

                console.log("Dados recebidos:", data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        }

    fetchData();
    }, [querya]);


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <div className={styles.Main}>
                <div className={styles.headerBusca}>
                    <h2 className={`${styles.titleResult} ${poppinsFont.className}`}>
                        {message} {receitas.length > 0 ? <span className={styles.digitoPesquisa}>{querya}</span> : ''}
                    </h2>

                    {receitas.length > 0 ?
                        <button 
                            onClick={openModal} 
                            className={styles.filterButton}
                            aria-label="Filtrar"
                        >
                            <SlidersHorizontal size={28} color="#000000" />
                        </button>
                        : null}
                </div>

                <div className={styles.elementos}>
                    {receitas.map((item, index) => (
                        <RecipeCard 
                            key={index} data={item} />
                    ))}
                </div>

                <ModalPesquisa isOpen={isModalOpen} onClose={closeModal} />
            </div>
        </Suspense>
    );
}

"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
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
    const [query, setQuery] = useState("macarronada");
    const [receitas, setReceitas] = useState([]);

    const router = useRouter();

    useEffect(() => {

        async function fetchData() {
            try {
                console.log("Iniciando busca por receitas com o título:", query);
                const response = await fetch(`https://chefvirtual.dev.vilhena.ifro.edu.br/api/api/Receitas/BuscaPorTitulo?tituloReceita=${query}`);
                const data = await response.json();
                console.log("Iniciando busca por receitas aaaaaaaaaaaa o título:", query);

                if (response.ok) {
                    setReceitas(data);
                }

                if (data.length === 0) {
                    console.log("Nenhum resultado encontrado para a pesquisa.");
                }

                console.log("Dados recebidos:", data);
                
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        }

    fetchData();
    }, [query]);

//   useEffect(() => {
//     if (router.query && router.query.query) {
//       setQuery(router.query.query);
//     }
//   }, [router.query]);


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <div className={styles.Main}>
                <div className={styles.headerBusca}>
                    <h2 className={`${styles.titleResult} ${poppinsFont.className}`}>
                        {receitas.length} {receitas.length === 1 ? "Resultado" : "Resultados"} para <span className={styles.digitoPesquisa}>{query}</span>
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

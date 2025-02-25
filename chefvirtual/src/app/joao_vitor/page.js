"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic"; 
import styles from "./page.module.css";
import RecipeCard from "@/components/ReceitaResult";
import { Poppins } from "next/font/google";

const poppinsFont = Poppins({
    subsets: ["latin"],
    weight: "400",
});

const RouterComponent = dynamic(() => import("next/router"), { ssr: false });

export default function Historico() {
    const [historico, setHistorico] = useState([]);

    useEffect(() => {
    
        const historicoSimulado = [
            { id: 1, nome: "Receita de Pastel", descricao: "Pastel de carne com queijo." },
            { id: 2, nome: "Bolo de Chocolate", descricao: "Bolo fofinho com cobertura de chocolate." },
            { id: 3, nome: "Pizza Caseira", descricao: "Pizza de marguerita feita em casa." },
            { id: 4, nome: "Sushi Simples", descricao: "Sushi de salmão e arroz." },
            { id: 5, nome: "Salada Caesar", descricao: "Salada com frango grelhado e croutons." },
            { id: 6, nome: "Sopa de Abóbora", descricao: "Sopa cremosa de abóbora com gengibre." },
        ];
        setHistorico(historicoSimulado);
    }, []);

    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <div className={styles.Main}>
                <div className={styles.headerBusca}>
                    <h2 className={`${styles.titleResult} ${poppinsFont.className}`}>
                        Histórico de Visualizações
                    </h2>
                </div>

                <div className={styles.elementos}>
                    {historico.length > 0 ? (
                        historico.map((item) => (
                            <RecipeCard key={item.id} recipe={item} />
                        ))
                    ) : (
                        <p>Nenhum item no histórico.</p>
                    )}
                </div>
            </div>
        </Suspense>
    );
}
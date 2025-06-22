'use client';

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
    const [mensagem, setMensagem] = useState("Carregando histórico...");
    const idUsuario = 2; // 🔁 Substitua por um valor dinâmico (ex: contexto do login)

    useEffect(() => {
        async function buscarHistorico() {
            try {
                const resposta = await fetch(`https://chefvirtual.dev.vilhena.ifro.edu.br/api/Historico?idUsuario=${idUsuario}`);
                const dados = await resposta.json();

                if (resposta.ok && dados.length > 0) {
                    setHistorico(dados);
                    setMensagem("Histórico de Visualizações");
                } else {
                    setMensagem("Nenhum item encontrado no histórico.");
                }
            } catch (erro) {
                console.error("Erro ao buscar histórico:", erro);
                setMensagem("Erro ao carregar histórico.");
            }
        }

        buscarHistorico();
    }, []);

    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <div className={styles.Main}>
                <div className={styles.headerBusca}>
                    <h2 className={`${styles.titleResult} ${poppinsFont.className}`}>
                        {mensagem}
                    </h2>
                </div>

                <div className={styles.elementos}>
                    {historico.map((item) => (
                        <RecipeCard 
                            key={item.id} 
                            recipe={{
                                id: item.receita_id,
                                titulo: item.titulo, 
                                descricao: item.descricao,
                                imagem: item.imagem 
                            }} 
                        />
                    ))}
                </div>
            </div>
        </Suspense>
    );
}

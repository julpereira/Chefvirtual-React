"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import RecipeCard from "@/components/ReceitaResult";
import valorURL from "@/app/urls";

export default function ResulBuscaAvancada() {
    const searchParams = useSearchParams();
    const [receitas, setReceitas] = useState([]);
    const [mensagem, setMensagem] = useState("Buscando receitas...");

    useEffect(() => {
        async function fetchReceitas() {
            try {
                const query = searchParams.toString();
                const response = await fetch(`${valorURL}/api/Receitas/BuscaAvancada?${query}`);

                if (!response.ok) {
                    setMensagem("Nenhuma receita encontrada com os filtros aplicados.");
                    return;
                }

                const data = await response.json();
                setReceitas(data);
                setMensagem(`${data.length} resultado(s) encontrado(s).`);
            } catch (error) {
                setMensagem("Erro ao buscar receitas.");
            }
        }

        fetchReceitas();
    }, [searchParams]);

    return (
        <div>
            <h1>{mensagem}</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {receitas.map((receita) => (
                    <RecipeCard key={receita.id} data={receita} />
                ))}
            </div>
        </div>
    );
}

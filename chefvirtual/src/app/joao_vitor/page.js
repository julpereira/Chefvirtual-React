"use client";
import { useState, useEffect } from "react";
import styles from "../joao_vitor/page.module.css";
import { Poppins } from "next/font/google";
import Cookies from "js-cookie";
import dynamic from 'next/dynamic';

const RecipeCard = dynamic(
  () => import('@/components/ReceitaResult').then(mod => mod.default || mod),
  {
    loading: () => <div>Carregando receita...</div>,
    ssr: false
  }
);

const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const API_BASE_URL = "https://chefvirtual.dev.vilhena.ifro.edu.br/api";

export default function HistoricoReceitasPostadas() {
  const [receitasPostadas, setReceitasPostadas] = useState([]);
  const [mensagem, setMensagem] = useState("Carregando receitas postadas...");
  const [idUsuario, setIdUsuario] = useState(null);

  useEffect(() => {
    const userId = Cookies.get("id");
    setIdUsuario(userId || null);
  }, []);

  useEffect(() => {
    async function carregarReceitasPostadas() {
      if (!idUsuario) {
        setMensagem("Você precisa estar logado para ver suas receitas.");
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/Receitas/BuscaPorUsuario?idUsuario=${idUsuario}`);
        if (response.ok) {
          const dados = await response.json();
          if (dados.length === 0) {
            setMensagem("Você ainda não postou nenhuma receita.");
          } else {
            setReceitasPostadas(dados);
            setMensagem("Minhas Receitas");
          }
        } else {
          setMensagem("Erro ao buscar suas receitas.");
        }
      } catch (error) {
        console.error("Erro ao carregar receitas:", error);
        setMensagem("Erro ao carregar suas receitas.");
      }
    }

    carregarReceitasPostadas();
  }, [idUsuario]);

  return (
    <div className={styles.Main}>
      <div className={styles.headerBusca}>
        <h2 className={`${styles.titleResult} ${poppinsFont.className}`}>
          {mensagem}
        </h2>
      </div>

      <div className={styles.elementos}>
        {receitasPostadas.length > 0 ? (
          receitasPostadas.map((item, index) => (
            <RecipeCard key={index} data={item} />
          ))
        ) : (
          <p className={styles.nenhumItem}>{mensagem}</p>
        )}
      </div>
    </div>
  );
}

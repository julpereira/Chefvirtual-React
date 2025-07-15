"use client";
import { useState, useEffect } from "react";
import styles from "../joao_vitor/page.module.css";
import { Poppins } from "next/font/google";
import Cookies from "js-cookie";
import dynamic from 'next/dynamic';

// Importação dinâmica com fallback
const RecipeCard = dynamic(
  () => import('@/components/ReceitaResult')
    .then(mod => mod.default || mod),
  { 
    loading: () => <div>Carregando receita...</div>,
    ssr: false 
  }
);

const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const API_BASE_URL = "http://localhost:3000/api";

// Função para registrar visualizações
export async function registrarVisualizacao(receitaId, idUsuario) {
  if (!receitaId) return false;

  try {
    // Se não tem usuário, salva localmente
    if (!idUsuario) {
      return await adicionarVisualizacaoLocal(receitaId);
    }

    // Tenta registrar no servidor
    const response = await fetch(`${API_BASE_URL}/historico`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idUsuario, idReceita: receitaId }),
    });

    if (!response.ok) throw new Error("Falha ao registrar");
    return true;

  } catch (error) {
    console.error("Erro ao registrar:", error);
    return await adicionarVisualizacaoLocal(receitaId);
  }
}

// Função auxiliar para histórico local
async function adicionarVisualizacaoLocal(receitaId) {
  try {
    const historico = JSON.parse(localStorage.getItem("historico") || "[]");
    const novoHistorico = [
      { receitaId, data: new Date().toISOString() },
      ...historico.filter(item => item.receitaId !== receitaId)
    ].slice(0, 20);
    
    localStorage.setItem("historico", JSON.stringify(novoHistorico));
    return true;
  } catch (error) {
    console.error("Erro ao salvar :", error);
    return false;
  }
}

export default function Historico() {
  const [historico, setHistorico] = useState([]);
  const [mensagem, setMensagem] = useState("Carregando histórico...");
  const [idUsuario, setIdUsuario] = useState(null);

  useEffect(() => {
    const userId = Cookies.get("id");
    setIdUsuario(userId || null);
  }, []);

  useEffect(() => { 
    async function carregarHistorico() {
      try {
        // Para usuários logados
        if (idUsuario) {
          const response = await fetch(`${API_BASE_URL}/historico/historico?idUsuario=${idUsuario}`);
          ;
          if (response.ok) {
            const dados = await response.json();
            setHistorico(dados);
            setMensagem("Histórico de Visualizações");
            return;
          }
        }

        // Para usuários não logados
        const localData = JSON.parse(localStorage.getItem("historico") || "[]");
        setHistorico(localData);
        setMensagem(localData.length ? "Histórico" : "Nenhuma visualização");

      } catch (error) {
        console.error("Erro ao carregar:", error);
        setMensagem("Erro ao carregar histórico");
      }
    }

    carregarHistorico();
  }, [idUsuario]);

  return (
    <div className={styles.Main}>
      <div className={styles.headerBusca}>
        <h2 className={`${styles.titleResult} ${poppinsFont.className}`}>
          {mensagem}
        </h2>
      </div>

      <div className={styles.elementos}>
        {historico.length > 0 ? (
          historico.map((item, index) => {
            const recipeData = {
              id: item.receitaId || item.id,
              tituloReceita: item.titulo || `Receita ${item.receitaId || item.id}`,
              tempoPreparo: item.tempo_preparo || 0,
              mediaAvaliacao: item.mediaAvaliacao || 0,
              imagemReceita: item.imagem || null
            };

            return (
              <div key={`${item.receitaId || item.id}_${index}`}>
                {RecipeCard ? (
                  <RecipeCard data={recipeData} />
                ) : (
                  <div>Erro ao carregar card</div>
                )}
              </div>
            );
          })
        ) : (
          <p className={styles.nenhumItem}>{mensagem}</p>
        )}
      </div>
    </div>
  );
} 

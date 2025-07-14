// === [components/modalPesquisa/ModalPesquisa.js] ===
"use client";

import { useState, useEffect } from "react";
import styles from "./modalPesquisa.module.css";
import { useRouter } from "next/navigation";

export default function ModalPesquisa({ isOpen, onClose }) {
  const router = useRouter();
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [recipeType, setRecipeType] = useState("");
  const [tempoSelecionado, setTempoSelecionado] = useState("");

  const [ingredientes, setIngredientes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [tempos, setTempos] = useState([]);

  useEffect(() => {
    async function fetchIngredientes() {
      try {
        const res = await fetch("/api/ingredientes");
        const data = await res.json();
        setIngredientes(data);
      } catch (err) {
        console.error("Erro ao buscar ingredientes:", err);
      }
    }

    async function fetchCategorias() {
      try {
        const res = await fetch("/api/Categorias");
        const data = await res.json();
        setCategorias(data);
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
      }
    }

    async function fetchTempos() {
      try {
        const res = await fetch("/api/Receitas");
        const data = await res.json();

        const temposUnicos = [...new Set(data.map(item => item.tempoPreparo))]
          .filter(t => t !== null)
          .sort((a, b) => a - b);

        const faixas = [];
        const intervalo = 10;

        for (let i = 0; i < temposUnicos.length; i += intervalo) {
          const min = temposUnicos[i];
          const max = temposUnicos[i + intervalo - 1] || temposUnicos[temposUnicos.length - 1];
          faixas.push(`${min}-${max}`);
        }

        setTempos(faixas);
      } catch (err) {
        console.error("Erro ao buscar tempos de preparo:", err);
      }
    }

    if (isOpen) {
      fetchIngredientes();
      fetchCategorias();
      fetchTempos();
    }
  }, [isOpen]);

  const handleBuscarClick = () => {
    const queryParams = new URLSearchParams();

    if (selectedRating > 0) queryParams.append("notaMinima", selectedRating);
    if (selectedIngredients.length > 0) queryParams.append("ingredientes", selectedIngredients.join(","));
    if (tempoSelecionado) {
      const [tempoMinimo, tempoMaximo] = tempoSelecionado.split("-");
      if (tempoMinimo) queryParams.append("tempoMinimo", tempoMinimo);
      if (tempoMaximo) queryParams.append("tempoMaximo", tempoMaximo);
    }
    if (recipeType && recipeType !== "Selecione") queryParams.append("tipo", recipeType);

    router.push(`/joao_vitor/resulBuscaAvancada?${queryParams.toString()}`);
    onClose();
  };

  const toggleIngredient = (nome) => {
    setSelectedIngredients(prev =>
      prev.includes(nome) ? prev.filter(i => i !== nome) : [...prev, nome]
    );
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>

        <h2 className={styles.modalTitle}>Busca Avançada</h2>

        <div className={styles.filtroSection}>
          <label>Nota mínima:</label>
          <select value={selectedRating} onChange={e => setSelectedRating(Number(e.target.value))}>
            <option value={0}>Selecione</option>
            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}+</option>)}
          </select>
        </div>

        <div className={styles.filtroSection}>
          <label>Ingredientes:</label>
          <div className={styles.checkboxContainer}>
            {ingredientes.map((item, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  value={item.nome}
                  checked={selectedIngredients.includes(item.nome)}
                  onChange={() => toggleIngredient(item.nome)}
                />
                {item.nome}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.filtroSection}>
          <label>Categoria:</label>
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            <option value="">Selecione</option>
            {categorias.map((cat, index) => (
              <option key={index} value={cat.nome}>{cat.nome}</option>
            ))}
          </select>
        </div>

        <div className={styles.filtroSection}>
          <label>Tempo de Preparo:</label>
          <select value={tempoSelecionado} onChange={e => setTempoSelecionado(e.target.value)}>
            <option value="">Selecione</option>
            {tempos.map((faixa, idx) => (
              <option key={idx} value={faixa}>{faixa} min</option>
            ))}
          </select>
        </div>

        <div className={styles.filtroSection}>
          <label>Tipo de Receita:</label>
          <input
            type="text"
            placeholder="Ex: bolo, vegetariana, etc."
            value={recipeType}
            onChange={e => setRecipeType(e.target.value)}
          />
        </div>

        <div className={styles.botaoContainer}>
          <button className={styles.searchButton} onClick={handleBuscarClick}>Buscar</button>
        </div>
      </div>
    </div>
  );
}


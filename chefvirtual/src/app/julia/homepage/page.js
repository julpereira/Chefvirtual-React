"use client"
import React, { useEffect, useState } from "react";
import styles from "./homepage.module.css";
import valorURL from "@/app/urls";

export default function Homepage() {
  const categories = [
    { name: "Doces", img: "/img/doces.png", link: "#" },
    { name: "Salgados", img: "/img/salgados.png", link: "#" },
    { name: "Comidas Frias", img: "/img/cfrias.png", link: "#" },
    { name: "Comidas Quentes", img: "/img/cquentes.png", link: "#" },
  ];

  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchReceitas() {
      try {
        const response = await fetch(valorURL+"/api/Receitas");
        if (!response.ok) {
          throw new Error("Erro ao buscar receitas");
        }
        const data = await response.json();
        setReceitas(data);
      } catch (err) {
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReceitas();
  }, []);

  if (loading) {
    return <div className={styles.container}>Carregando receitas...</div>;
  }

  if (erro) {
    return <div className={styles.container}>Erro: {erro}</div>;
  }

  return (
    <div className={styles.container}>

      {/* Se você tiver categorias dinâmicas, pode buscar aqui também */}
      {/* Vou manter seu bloco de categorias estático ou vazio */}
      <div className={styles.categories}>
        {categories.map((category, index) => (
          <a key={index} href={category.link} className={styles.category}>
            <img src={category.img} alt={category.name} />
          </a>
        ))}

        <h1 className={styles.h1}>
          Desbrave novos sabores e culturas, explorando o mundo através da culinária!
        </h1>
      </div>

      <div className={styles.items}>
        {receitas.length === 0 && <p>Nenhuma receita encontrada.</p>}

        {receitas.map((receita) => (
          <div className={styles.item} key={receita.id}>
            <a href={`/joao_bento/visu_receita?id=${receita.id}`} className={styles.recipeLink}>
              {receita.imagemReceita ? (
                <img
                  src={`data:image/jpeg;base64,${receita.imagemReceita}`}
                  alt={receita.tituloReceita}
                  className={styles.itemImage}
                />
              ) : (
                <div className={styles.noImage}>Sem imagem</div>
              )}
            </a>

            <h2>
              <a href={`/joao_bento/visu_receita?id=${receita.id}`} className={styles.recipeTitle}>
                {receita.tituloReceita}
              </a>
            </h2>

            <p>
              Por{" "}
              <a href={`/usuario/${receita.usuario.id}`} className={styles.authorLink}>
                {receita.usuario.nome}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

 import React from "react";
import styles from "./homepage.module.css";

export default function Homepage() {
  const items = [
    { name: "Pizza de Pepperoni", author: "Claudia Herz", img: "/img/ppepp.png", link: "../joao_bento/visu_receita", authorLink: "./perfil" },
    { name: "Banoffee", author: "Jordan Elias", img: "/img/banoffe.png", link: "/receita/banoffee", authorLink: "#" },
    { name: "Milkshake de café e chocolate", author: "Sofia Ransford", img: "/img/milkshake.png", link: "/receita/milkshake", authorLink: "#" },
    { name: "Coxinha", author: "Maria Souza", img: "/img/coxinha.png", link: "/receita/coxinha", authorLink: "#" },
    { name: "Torta de Frango", author: "Mayu Kondou", img: "/img/tortafrango.png", link: "/receita/torta-de-frango", authorLink: "#" },
    { name: "Vatapá", author: "Guilherme Barros", img: "/img/vatapa.png", link: "/receita/vatapa", authorLink: "#s" },
    { name: "Torta de Uva e Maçã", author: "Victoria Steen", img: "/img/tuvamaca.png", link: "/receita/torta-de-uva", authorLink: "#" },
    { name: "Brigadeiro", author: "Carlos Alberto", img: "/img/brigadeiro.png", link: "/receita/brigadeiro", authorLink: "#" },
    { name: "Pudim", author: "Vitor Barbosa", img: "/img/pudim.png", link: "/receita/pudim", authorLink: "#" },
    { name: "Salpicão", author: "Gabriel Lima", img: "/img/salpicao.png", link: "/receita/salpicao", authorLink: "#" },
    { name: "Lasanha", author: "Ana Silva", img: "/img/lasanha.png", link: "/receita/lasanha", authorLink: "#" },
    { name: "Salada Caesar", author: "Marta Rocha", img: "/img/caesarsalad.png", link: "/receita/salada-caesar", authorLink: "#" },
  ];

  const categories = [
    { name: "Doces", img: "/img/doces.png", link: "#" },
    { name: "Salgados", img: "/img/salgados.png", link: "#" },
    { name: "Comidas Frias", img: "/img/cfrias.png", link: "#" },
    { name: "Comidas Quentes", img: "/img/cquentes.png", link: "#" },
  ];

  return (
    <div className={styles.container}>

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
        {items.map((item, index) => (
          <div className={styles.item} key={index}>

            <a href={item.link} className={styles.recipeLink}>
              <img src={item.img} alt={item.name} className={styles.itemImage} />
            </a>
            <h2>
              <a href={item.link} className={styles.recipeTitle}>{item.name}</a>
            </h2>
            <p>
              Por <a href={item.authorLink} className={styles.authorLink}>{item.author}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

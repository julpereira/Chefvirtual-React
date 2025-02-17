import React from "react";
import styles from "@/app/julia/homepage/homepage.module.css";

export default function Homepage() {
  const items = [
    { name: "Pizza de Pepperoni", author: "Claudia Herz", img: "/img/ppepp.png", link: "/pizza" },
    { name: "Banoffee", author: "Jordan Elias", img: "/img/banoffe.png", link: "/banoffee" },
    { name: "Milkshake de café e chocolate", author: "Sofia Ransford", img: "/img/milkshake.png", link: "/milkshake" },
    { name: "Coxinha", author: "Maria Souza", img: "/img/coxinha.png", link: "/coxinha" },
    { name: "Torta de Frango", author: "Mayu Kondou", img: "/img/tortafrango.png", link: "/torta-frango" },
    { name: "Vatapá", author: "Guilherme Barros", img: "/img/vatapa.png", link: "/vatapa" },
    { name: "Torta de Uva e Maçã", author: "Victoria Steen", img: "/img/tuvamaca.png", link: "/torta-uva" },
    { name: "Brigadeiro", author: "Carlos Alberto", img: "/img/brigadeiro.png", link: "/brigadeiro" },
    { name: "Pudim", author: "Vitor Barbosa", img: "/img/pudim.png", link: "/pudim" },
    { name: "Salpicão", author: "Gabriel Lima", img: "/img/salpicao.png", link: "/salpicao" },
    { name: "Lasanha", author: "Ana Silva", img: "/img/lasanha.png/", link: "/lasanha" },
    { name: "Salada Caesar", author: "Marta Rocha", img: "/img/caesarsalad.png", link: "/salada-caesar" },
  ];

  const categories = [
    { name: "Doces", img: "/img/doces.png", link: "/doces" },
    { name: "Salgados", img: "/img/salgados.png", link: "/salgados" },
    { name: "Comidas Frias", img: "/img/cfrias.png", link: "/comidas-frias" },
    { name: "Comidas Quentes", img: "/img/cquentes.png", link: "/comidas-quentes" },
  ];

  return (
    <div className={styles.container}>

      <div className={styles.categories}>
        {categories.map((category, index) => (
          <a key={index} href={category.link} className={styles.category}>
            <img src={category.img} alt={category.name} />
          </a>
        ))}

        <h1 className={styles.h1}>Desbrave novos sabores e culturas, explorando o mundo através da culinária</h1>
      </div>

      <div className={styles.items}>
        {items.map((item, index) => (
          <div className={styles.item} key={index}>
            <a href={item.link}>
              <img src={item.img} alt={item.name} className={styles.itemImage} />
            </a>
            <h2>
              <a href={item.link}>{item.name}</a>
            </h2>
            <p>
              Por <a href={`/autor/${item.author.replace(" ", "-").toLowerCase()}`}>{item.author}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

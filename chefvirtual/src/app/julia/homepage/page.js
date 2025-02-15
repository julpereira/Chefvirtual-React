import React from 'react';
import styles from './homepage.module.css'


export default function Homepage() {
  const items = [
    { name: "Pizza de Pepperoni", author: "Claudia Herz", img: "pizza-url" },
    { name: "Banoffee", author: "Jordan Elias", img: "banoffee-url" },
    { name: "Milkshake de café e chocolate", author: "Sofia Ransford", img: "milkshake-url" },
    { name: "Coxinha", author: "Maria Souza", img: "coxinha-url" },
    { name: "Torta de Frango", author: "Mayu Kondou", img: "torta-frango-url" },
    { name: "Vatapá", author: "Guilherme Barros", img: "vatapa-url" },
    { name: "Torta de Uva e Maçã", author: "Victoria Steen", img: "torta-uva-url" },
    { name: "Brigadeiro", author: "Carlos Alberto", img: "brigadeiro-url" },
    { name: "Pudim", author: "Vitor Barbosa", img: "pudim-url" },
    { name: "Salpicão", author: "Gabriel Lima", img: "salpicao-url" },
    { name: "Lasanha", author: "Ana Silva", img: "lasanha-url" },
    { name: "Salada Caesar", author: "Marta Rocha", img: "salada-caesar-url" },
  ];

  return (
    <div className={styles.container}>
      <h1>Menu</h1>
      <div className={styles.categories}>
        <button>Doces</button>
        <button>Salgados</button>
        <button>Comidas Frias</button>
        <button>Comidas Quentes</button>
      </div>
      <div className={styles.items}>
        {items.map((item, index) => (
          <div className={styles.item} key={index}>
            <img src={item.img} alt={item.name} />
            <h2>{item.name}</h2>
            <p>Por {item.author}</p>
          </div>
        ))}
      </div>
      <footer className={styles.footer}>
        <p>Quem Somos | Política de privacidade | Termos de uso | Contato</p>
      </footer>
    </div>
  );
}


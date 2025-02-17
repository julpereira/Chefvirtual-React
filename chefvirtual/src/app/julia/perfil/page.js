import React from "react";
import styles from "./perfil.module.css";

const recipes = [
  { name: "Pizza de Pepperoni", img: "/img/ppepp.png", link: "/receita/pizza-de-pepperoni" },
  { name: "Picolé de Framboesa", img: "/img/picole.png", link: "/receita/picole-de-framboesa" },
  { name: "Bolo de Chocolate", img: "/img/bolodechocolate.png", link: "/receita/bolo-de-chocolate" },
  { name: "Pão de Queijo", img: "/img/paodequeijo.png", link: "/receita/pao-de-queijo" },
  { name: "Donuts Tradicional", img: "/img/donuts.png", link: "/receita/donuts-tradicional" },
  { name: "Empadão de Frango", img: "/img/empadao.png", link: "/receita/empadao-de-frango" },
];

export default function Perfil() {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <img className={styles.profileimg} src="/img/claudiah.png" alt="Claudia Herz" />
        <h2>Claudia Herz</h2>
        <p>@herzclaudia1980</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>
        <button className={styles.edit}> <a href="../joao_bento/ed_perfil">Editar Perfil</a></button>
        <button className={styles.delete}>Excluir Conta</button>
        
        <div className={styles.socialIcons}>
          <a href="#"><img src="/img/facebook.png" alt="Facebook" /></a>
          <a href="#"><img src="/img/instagram.png" alt="Instagram" /></a>
          <a href="#"><img src="/img/youtube.png" alt="YouTube" /></a>
        </div>
      </div>

      <div className={styles.recipesContainer}>
        <h3>Histórico de Receitas</h3>
        <button className={styles.showhistory}>Mostrar</button>
        <div className={styles.recipelist}>
          {recipes.map((recipe, index) => (
            <div key={index} className={styles.recipeitem}>
              <a href={recipe.link}>
                <img src={recipe.img} alt={recipe.name} className={styles.recipeimg} />
              </a>
              <p>{recipe.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

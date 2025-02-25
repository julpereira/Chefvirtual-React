"use client";
import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaLock } from 'react-icons/fa'; 
import { useRouter } from "next/navigation";
import styles from "./perfil.module.css";

const recipes = [
    { name: "Pizza de Pepperoni", author: "Claudia Herz", img: "/img/ppepp.png", link: "../joao_bento/visu_receita", authorLink: "./perfil" },
    { name: "Picolé de Framboesa", author: "Claudia Herz", img: "/img/picole.png", link: "/receita/picole-de-framboesa", authorLink: "./perfil" },
    { name: "Bolo de Chocolate", author: "Claudia Herz", img: "/img/bolodechocolate.png", link: "/receita/bolo-de-chocolate", authorLink: "./perfil" },
    { name: "Pão de Queijo", author: "Claudia Herz", img: "/img/paodequeijo.png", link: "/receita/pao-de-queijo", authorLink: "./perfil" },
    { name: "Donuts Tradicional", author: "Claudia Herz", img: "/img/donuts.png", link: "/receita/donuts-tradicional", authorLink: "./perfil" },
    { name: "Empadão de Frango", author: "Claudia Herz", img: "/img/empadao.png", link: "/receita/empadao-de-frango", authorLink: "./perfil" },
];

export default function Perfil() {
  const [showPopup, setShowPopup] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    setShowPopup(true);
  };

  const confirmDelete = () => {
    if (password === "1234") {
      alert("Conta excluída com sucesso!");
      router.push("/julia/homepage");
    } else {
      setError("Senha incorreta. Tente novamente.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <img className={styles.profileimg} src="/img/claudiah.png" alt="Claudia Herz" />
        <h2>Claudia Herz</h2>
        <p>@herzclaudia1980</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br></br> 
          Nunc vulputate libero et velit interdum,<br></br> ac aliquet odio mattis.
        </p>
        <a className={styles.edit} href="../joao_bento/ed_perfil">Editar Perfil</a>
        <a className={styles.delete} onClick={handleDelete}>Excluir Conta</a>
        
        <div className={styles.socialIcons}>
          <a href="#" className={styles.icon}><FaFacebook /></a>
          <a href="#" className={styles.icon}><FaInstagram /></a>
          <a href="#" className={styles.icon}><FaYoutube /></a>
        </div>
      </div>

      <div className={styles.recipesContainer}>
        <h3>Histórico de Receitas</h3>
        <a className={styles.showhistory} href="../joao_vitor">Mostrar</a>

        <div className={styles.recipes}>
          {recipes.map((recipe, index) => (
            <div className={styles.recipe} key={index}>
              <a href={recipe.link} className={styles.recipeLink}>
                <img src={recipe.img} alt={recipe.name} className={styles.recipeImage} />
              </a>
              <h2>
                <a href={recipe.link} className={styles.recipeTitle}>{recipe.name}</a>
              </h2>
              <p>
                Por <a href={recipe.authorLink} className={styles.authorLink}>{recipe.author}</a>
              </p>
            </div>
          ))}
        </div>
      </div>

      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2>Tem certeza que deseja excluir sua conta?</h2>
            <p>Esta ação não pode ser desfeita. (Senha para conseguir excluir: 1234)</p>
            <div className={styles.passwordContainer}>
              <input 
                type={passwordVisible ? "text" : "password"} 
                placeholder="Digite sua senha"  
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className={styles.passwordInput}
              />
               <i
                    className={`${passwordVisible ? 'fa-eye-slash' : 'fa-eye'} ${styles.eyeIcon}`} 
                   onClick={togglePasswordVisibility} 
                ></i>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button onClick={confirmDelete} className={styles.confirmDelete}>Confirmar</button>
            <button onClick={() => setShowPopup(false)} className={styles.cancel}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

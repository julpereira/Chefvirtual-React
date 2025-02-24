import React, { useState } from 'react';
import styles from './receitaResult.module.css'; 
// import 'bootstrap-icons/font/bootstrap-icons.css';
// Supondo que o arquivo de CSS esteja aqui

const RecipeCard = () => {
  // Estado para armazenar a avaliação (quantas estrelas foram clicadas)
  const [rating, setRating] = useState(0);

  // Função para alterar a avaliação quando uma estrela for clicada
  const handleClick = (index) => {
    setRating(index + 1); // A avaliação é 1-based (1, 2, 3,...)
  };

  // Criando um array de 5 estrelas
  const stars = [0, 1, 2, 3, 4];

  return (
    <div className={styles.elemento}>
      <h2>Pastel Tradicional</h2>
      <img src="/img/FotosExemplo.png" alt="Pastel Tradicional" />
      <div className={styles.divAvaliacao}>
      {stars.map((star, index) => (
          <i
            key={index}
            className={`bi bi-star-fill ${rating > index ? 'filled' : ''}`} // Preenche a estrela com base no rating
          ></i>
        ))}
      </div>
      <div className={styles.divTempo}>
        <h3>55 min</h3>
        <img src="/img/Icon-tempo.png" alt="Tempo" />
      </div>
    </div>
  );
};

export default RecipeCard;
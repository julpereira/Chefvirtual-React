'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './receitaResult.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useRouter } from 'next/navigation';
// Supondo que o arquivo de CSS esteja aqui

function formatarTempo(minutos) {
  if (!minutos || minutos === 0) return "N/A";

  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;

  if (horas > 0) {
    if (mins > 0) {
      return `${horas}h e ${mins}m`;
    } else {
      return `${horas}h`;
    }
  } else {
    return `${mins}m`;
  }
}

function gerarEstrelas(media) {
  const estrelas = [];

  for (let i = 0; i < 5; i++) {
    if (media >= i + 1) {
      estrelas.push("full");
    } else if (media > i && media < i + 1) {
      estrelas.push("half");
    } else {
      estrelas.push("empty");
    }
  }

  return estrelas;
}


const RecipeCard = ({ data }) => {
  // Estado para armazenar a avaliação (quantas estrelas foram clicadas)
  console.log(data);
  const [rating, setRating] = useState(0);
  const tempoPreparo = formatarTempo(data.tempoPreparo);
  const estrelas = gerarEstrelas(data.mediaAvaliacao || 0);
  const imageSrc = `data:image/png;base64,${data.imagemReceita}`;
  const router = useRouter();

  const goToRecipe = (id) => {
    router.push(`/joao_bento/visu_receita?id=${id}`);
  }

  console.log(imageSrc);
  return (
    <div className={styles.elemento} onClick={() => goToRecipe(data.id)}>
      <h2>{data.tituloReceita}</h2>
      <img src={`data:image/jpeg;base64,${data.imagemReceita}`} width={200} height={200} />
      <div className={styles.divAvaliacao}>
        {estrelas.map((tipo, index) => (
          <i
            key={index}
            className={
              tipo === "full"
                ? "bi bi-star-fill"
                : tipo === "half"
                  ? "bi bi-star-half"
                  : "bi bi-star"
            }
          ></i>
        ))}
      </div>
      <div className={styles.divTempo}>
        <h3>{tempoPreparo}</h3>
        <img src="/img/Icon-tempo.png" alt="Tempo" />
      </div>
    </div>
  );
};

export default RecipeCard;
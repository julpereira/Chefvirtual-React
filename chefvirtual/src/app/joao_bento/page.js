'use client'
import React, { useState } from 'react';
import styles from './page.module.css'; // Inclua seus arquivos CSS
import Image from 'next/image';

const App = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const goBack = () => {
    window.history.back();
    console.log('Está funcionando');
  };

  return (
    <div className="App">
      <main>
        {/* Primeira parte */}
        <section className={styles.info_receita}>
          <div className={styles.voltar} onClick={goBack}>
            <img className={styles.seta_voltar} src="/img/seta_voltar.png" alt="" />
            <p>Voltar</p>
          </div>
          <div className={styles.titulo}>
            <p>Pizza de Peperoni</p>
          </div>

          <div className={styles.receita}>
            {[...Array(5)].map((_, index) => (
              <i key={index} className={`bi ${index < rating ? 'bi-star-fill' : 'bi-star'}`} />
            ))}
            <p>3.5/5 (10 avaliações)</p>
            <div className={styles.icon_fav}>
              <i className="bi bi-bookmark" style={{ fontSize: '3vh' }} />
            </div>
          </div>

          <div className={styles.dis_receita}>
            <div className={styles.div_img}>
              <img id="img_receita" src="/img/imagem_receita.png" alt="Pizza" />
            </div>

            <div className={styles.div_rec}>
              <h2>Descrição da receita:</h2>
              <p>A pizza pode ser assada em forno a lenha, elétrico ou a gás, cada método conferindo um sabor e
                textura únicos.</p>
            </div>
          </div>

          <div className={styles.sb_rec}>
            <button className={styles.openModalBtn} onClick={() => alert('Modal aberto')}>
              Avalie a receita <i className="bi bi-star-fill" />
            </button>

            <div className={styles.tempo}>
              <p>Tempo de preparo:</p>
              <p id="preparo">
                <i className="bi bi-clock" />1h 30min
              </p>
            </div>
          </div>
        </section>

        {/* Ingredientes */}
        <section className={styles.ingredientes}>
          <div className={styles.ingredientes2}>
            <div className={styles.ingredientes3}>
              <h2>Ingredientes</h2>
              <div className={styles.ingredientes4}>
                <ul>
                  <li>Massa 500g</li>
                  <li>Queijo 300g</li>
                  <li>Água 300ml</li>
                  <li>Óleo 200ml</li>
                  <li>Tomate 100g</li>
                  <li>Açúcar 100g</li>
                  <li>Calabresa 300g</li>
                  <li>Sal 50g</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Modo de Preparo */}
        <section className={styles.des_receita}>
          <div className={styles.preparo}>
            <div className={styles.preparo2}><h2>Modo de preparo</h2></div>
            <div className={styles.preparo3}><ul>
              <li>Misture a Massa com óleo e com açúcar e sal</li>
              <li>Depois você despeja em uma forma</li>
              <li>Leve ao forno a 210°C</li>
              <li>Retire do forno e corte em fatias</li>
            </ul>
            </div>
          </div>
        </section>

        {/* Comentários */}
        <section className={styles.comentários}>
          <div className={styles.coment}>Comentários</div>
          <div className={styles.comentario}>
            {/* Repetição de Comentários */}
            {['Ana', 'João', 'Hiago', 'Bento'].map((name, index) => (
              <div key={index} className={`${styles.comen} ${styles[`comen${index + 1}`]}`}>
                <div className={styles.denuncia}>
                  <p>Denunciar</p>
                </div>
                <div className={styles['star-comen']}>
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill" />
                  ))}
                </div>
                <div className={styles.comenta}>
                  <p>Que pizza deliciosa</p>
                </div>
                <Image src={'/img/icon-perfil.png'} width={45}
                  height={43} alt='aaaaaaaaaa' />
                <p>{name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;

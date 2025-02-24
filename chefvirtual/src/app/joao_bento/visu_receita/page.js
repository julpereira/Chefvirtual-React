'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import { AlarmClock, Star, Bookmark, X } from 'lucide-react';

const App = () => {
  const [ratingData, setRatingData] = useState({ rating: 0, comment: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); 
  const [reportReason, setReportReason] = useState('');
  const [otherReason, setOtherReason] = useState(''); 
  const [isFavorited, setIsFavorited] = useState(false); 



  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited); 
  };

  
  const openModal = () => setIsModalOpen(true);

  
  const closeModal = () => setIsModalOpen(false);

  
  const handleRating = (index) => {
    setRatingData((prev) => ({ ...prev, rating: index }));
  };

  // Função para enviar a avaliação
  const handleSubmitRating = () => {
    alert(`Avaliação enviada! Nota: ${ratingData.rating}/5 - Comentário: ${ratingData.comment}`);
    setRatingData({ rating: 0, comment: '' }); 
    setIsModalOpen(false); 
  };

  
  const openReportModal = () => setIsReportModalOpen(true);

  
  const closeReportModal = () => setIsReportModalOpen(false);

  // Função de enviar a denúncia
  const handleReportSubmit = () => {
    const reasonToSubmit = reportReason === 'Outro' ? otherReason : reportReason;
    alert(`Denúncia enviada! Motivo: ${reasonToSubmit}`);
    setIsReportModalOpen(false);
  };


  // Função de compartilhar
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Pizza de Peperoni',
        text: 'Confira esta deliciosa receita de Pizza de Peperoni!',
        url: window.location.href,
      }).catch((error) => console.log('Erro ao compartilhar:', error));
    } else {
      alert('Compartilhamento não disponível neste navegador.');
    }
  };



  return (
    <div className="container">
      <main>
        
        <section className={styles.info_receita}>
          <div className={styles.voltar} onClick={goBack} aria-label="Voltar para a página anterior">
            <img className={styles.seta_voltar} src="/img/seta_voltar.png" alt="Voltar" />
            <p>Voltar</p>
          </div>
          <div className={styles.titulo}>
            <h1>Pizza de Peperoni</h1>
          </div>

          <div className={styles.receita}>
            <div className={styles.estrelas}>
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={index < 4 ? styles.avaliacoes1 : styles.avaliacoes5} 
                  size={25}
                />
              ))}
            </div>

            <p>4/5 (10 avaliações)</p>

            <div className={styles.icon_fav} onClick={toggleFavorite} aria-label="Adicionar aos favoritos">
              <Bookmark
                className={styles.fav}
                size={25}
                fill={isFavorited ? 'gold' : 'none'} 
              />
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

          <div className={styles.autor}>
            <p>Receita feito(a) por <a href="../julia/perfil">Claudia Herz</a></p>
          </div>

          <div className={styles.sb_rec}>
            <button className={styles.openModalBtn} onClick={openModal} aria-label="Avaliar a receita">
              <span className={styles.avalie}>Avalie a receita</span>
              <Star className={styles.star_rec} size={25} />
            </button>

            <div className={styles.tempo}>
              <p>Tempo de preparo:</p>
              <p id="preparo">
                <AlarmClock className={styles.relogio} size={20} />
                <span className={styles.hora}>1h 30min</span>
              </p>
            </div>
          </div>

          <div className={styles.sb_rec2}>
            <div className={styles.denunciar}>
              <button onClick={openReportModal} aria-label="Denunciar conteúdo">
                Denunciar
              </button>
            </div>

            <div className={styles.compartilhar}>
              <button onClick={handleShare} aria-label="Compartilhar receita">
                Compartilhar
              </button>
            </div>
          </div>

          {isModalOpen && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <h2>Deixe sua avaliação</h2>
                <div className={styles.modalEstrelas}>
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={index < ratingData.rating ? styles.avaliacoes1 : styles.avaliacoes5}
                      size={30}
                      onClick={() => handleRating(index + 1)}
                      aria-label={`Avaliar com ${index + 1} estrela${index + 1 > 1 ? 's' : ''}`}
                    />
                  ))}
                </div>
                <textarea
                  value={ratingData.comment}
                  onChange={(e) => setRatingData({ ...ratingData, comment: e.target.value })}
                  placeholder="Digite seu comentário..."
                  aria-label="Deixe um comentário"
                  className={styles.comentar2}
                  style={{
                    height: '12vh',
                  }}
                />
                <div className={styles.modalButtons}>
                  <X className={styles.closeIcon} size={30} onClick={closeModal} aria-label="Fechar modal" />
                  <button className={styles.submitButton} onClick={handleSubmitRating}>Enviar</button>
                </div>
              </div>
            </div>
          )}
          
        </section>

        {/* Modal de Denúncia */}
        {isReportModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>Escolha o motivo da denúncia</h2>
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className={styles.reportSelect}
                aria-label="Motivo da denúncia"
              >
                <option value="">Selecione um motivo...</option>
                <option value="Conteúdo ofensivo">Conteúdo ofensivo</option>
                <option value="Erro na receita">Erro na receita</option>
                <option value="Outro">Outro</option>
              </select>

              {reportReason === 'Outro' && (
                <textarea
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  placeholder="Descreva o motivo..."
                  className={styles.otherReasonInput}
                  aria-label="Descreva o motivo da denúncia"
                />
              )}

              <div className={styles.modalButtons}>
                <X className={styles.closeIcon} size={30} onClick={closeReportModal} aria-label="Fechar modal" />
                <button className={styles.submitButton} onClick={handleReportSubmit}>Enviar</button>
              </div>
            </div>
          </div>
        )}

        
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



        
        <section className={styles.comentarios}>
          <div className={styles.coment}><h2>Comentários</h2></div>
          <div className={styles.comentario}>
            {['Ana', 'João', 'Hiago', 'Bento'].map((name, index) => (
              <div key={index} className={`${styles.comen} ${styles[`comen${index + 1}`]}`}>
                <div className={styles.denuncia}>
                  <p>Denunciar</p>
                </div>
                <div className={styles.star_comen}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={styles.avaliacoes1} size={18} />
                  ))}
                </div>

                <div className={styles.comenta}>
                  <p>Que pizza deliciosa</p>
                </div>
                <Image src={'/img/icon-perfil.png'} width={45} height={43} alt='perfil' />
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

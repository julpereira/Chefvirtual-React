'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import { AlarmClock, Star, Bookmark, X, AlignCenter } from 'lucide-react';
import { useSearchParams } from "next/navigation";
import valorURL from '@/app/urls';
import { useRouter, usePathname } from "next/navigation";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const App = () => {
  const pathname = usePathname();
  const [ratingData, setRatingData] = useState({ rating: 0, comment: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);
  const [receita, setReceita] = useState(null); // <- aqui ficam os dados da API
  const [comentarios, setComentarios] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {});

    setToken(cookies.token || null);
    setUserId(cookies.id || null);
    setLoading(false);
  }, [pathname]);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {

    async function getReceitas() {
      try {
        const response = await fetch(valorURL + '/api/Receitas/GetReceita?idReceita=' + id);
        if (!response.ok) throw new Error('Erro ao buscar receita');
        const data = await response.json();
        setReceita(data); // Salva a receita no estado
        console.log(data);
      } catch (error) {
        console.error('Erro ao buscar receita:', error);
        alert('Não foi possível carregar a receita.');
      }
    }

    async function getComentarios() {
      try {
        const response = await fetch(valorURL + '/api/Comentarios/GetComentarios?idReceita=' + id);
        if (!response.ok) throw new Error('Erro ao buscar comentários');
        const data = await response.json();
        setComentarios(data);
      } catch (error) {
        console.error('Erro ao buscar comentários:', error);
      }
    }

    /*async function getFavoritos() {
      try {
        const response = await fetch(valorURL + '/api/Favoritos/GetFavoritos?usuarioId=2');
        if (!response.ok) throw new Error('Erro ao buscar favoritos');
        const data = await response.json();
        setFavoritos(data);
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
      }
    }*/

    //getFavoritos();
    getComentarios();
    getReceitas();

  }, []);

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = '/';
  };

  const toggleFavorite = () => setIsFavorited(!isFavorited);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleRating = (index) => setRatingData((prev) => ({ ...prev, rating: index }));

  const handleSubmitRating = () => {
    alert(`Avaliação enviada! Nota: ${ratingData.rating}/5 - Comentário: ${ratingData.comment}`);
    setRatingData({ rating: 0, comment: '' });
    setIsModalOpen(false);
  };

  const openReportModal = () => setIsReportModalOpen(true);
  const closeReportModal = () => setIsReportModalOpen(false);

  const handleReportSubmit = () => {
    const reasonToSubmit = reportReason === 'Outro' ? otherReason : reportReason;
    alert(`Denúncia enviada! Motivo: ${reasonToSubmit}`);
    setIsReportModalOpen(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: receita?.nome || 'Receita',
        text: 'Confira esta deliciosa receita!',
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
            <h1>{receita ? receita.tituloReceita : 'Carregando...'}</h1>
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
              <img
                id="img_receita"
                src={`data:image/png;base64,${receita?.imagemReceita}`}
                alt={`Imagem da receita ${receita?.tituloReceita}`}
              />
              {/*<img id="img_receita" src="/img/imagem_receita.png" alt="Imagem da receita" />*/}
            </div>

            <div className={styles.div_rec}>
              <h2>Descrição da receita:</h2>
              <p>{receita ? receita.descricao : 'Carregando descrição...'}</p>
            </div>
          </div>

          <div className={styles.autor}>
            <p>Receita feita por <a href={`../usuario/perfil?idUsuario=${receita?.usuario?.id}`}>{receita?.usuario?.nome || '(Carregando Autor...)'}</a></p>
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
                  style={{ height: '12vh' }}
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
            {comentarios.length === 0 ? (
              <p>Ainda não Possui Comentários</p>

            ) : (
              comentarios.map((comentario, index) => (
                <div key={index} className={`${styles.comen} ${styles[`comen${(index % 4) + 1}`]}`}>
                  <div className={styles.denuncia}><p>Denunciar</p></div>
                  <div className={styles.star_comen}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={styles.avaliacoes1} size={18} />
                    ))}
                  </div>
                  <div className={styles.comenta}>
                    <p>{comentario.comentario}</p>
                  </div>
                  <Image src={'/img/icon-perfil.png'} width={45} height={43} alt='perfil' />
                  <p>{comentario ? comentario.nomeUsuario : 'Carregando...'}</p>

                </div>
              ))
            )}

          </div>
        </section>
      </main>
    </div>
  );
};

export default App;

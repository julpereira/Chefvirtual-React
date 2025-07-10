'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import { AlarmClock, Star, Bookmark, X, AlignCenter } from 'lucide-react';
import { useSearchParams, usePathname } from "next/navigation";
import valorUrl from '@/app/urls.js';

const App = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [id, setId] = useState(null);
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
  const [ingredientes, setIngredientes] = useState([]);
  const [etapas, setEtapas] = useState([]);



  useEffect(() => {
    const idFromUrl = searchParams.get("id");
    setId(idFromUrl);
  }, [searchParams]);

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

  useEffect(() => {
    if (!id) return;
    async function getReceitas() {
      try {
        const response = await fetch(valorUrl + '/api/Receitas/GetReceita?idReceita=' + id);
        if (!response.ok) throw new Error('Erro ao buscar receita');
        const data = await response.json();
        console.log('Receita recebida:', data);
        setReceita(data); // Salva a receita no estado
        console.log(data);
      } catch (error) {
        console.error('Erro ao buscar receita:', error);
        alert('Não foi possível carregar a receita.');
      } finally {
        setLoading(false);
      }
    }

    async function getComentarios() {
      try {
        const response = await fetch(valorUrl + '/api/Comentarios/GetComentarios?idReceita=' + id);
        if (!response.ok) throw new Error('Erro ao buscar comentários');
        const data = await response.json();
        setComentarios(data);
      } catch (error) {
        console.error('Erro ao buscar comentários:', error);
      }
      finally {
        setLoading(false);
      }
    }

    async function getIngredientes() {
      try {
        const response = await fetch(valorUrl + '/api/Ingredientes/GetIngredientes?idReceita=' + id);
        if (!response.ok) throw new Error('Erro ao buscar ingredientes');
        const data = await response.json();
        setIngredientes(data);
      } catch (error) {
        console.error('Erro ao buscar ingredientes:', error);
      }
    }

    async function getEtapas() {
      try {
        const response = await fetch(valorUrl + '/api/etapas?idReceita=' + id);
        if (!response.ok) throw new Error('Erro ao buscar etapas');
        const data = await response.json();
        setEtapas(data);
      } catch (error) {
        console.error('Erro ao buscar etapas:', error);
      }
    }

    getComentarios();
    getReceitas();
    getIngredientes();
    getEtapas();
  }, [id]);

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = '/';
  };

  const toggleFavorite = () => setIsFavorited(!isFavorited);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleRating = (index) => setRatingData((prev) => ({ ...prev, rating: index }));

  const postComentario = async () => {
    const comentario = ratingData.comment.trim();

    if (!comentario) {
      alert('Por favor, digite um comentário.');
      return;
    }

    try {
      const response = await fetch(`${valorUrl}/api/Comentarios/PostComentarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          receitaId: id,
          usuarioId: userId,
          comentario: comentario
        })
      });

      if (!response.ok) throw new Error('Erro ao postar comentário');

      const data = await response.json();

      setComentarios((prev) => [...prev, data]);
      setRatingData({ rating: 0, comment: '' });
      closeModal();

    } catch (error) {
      console.error('Erro ao postar comentário:', error);
      alert('Erro ao postar. Verifique se você está logado e tente novamente.');
    }
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


  function formatarTempo(minutos) {
    if (!minutos || isNaN(minutos)) return 'Tempo inválido';

    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;

    if (horas > 0) {
      return `${horas}h ${minutosRestantes}min`;
    } else {
      return `${minutosRestantes} minutos`;
    }
  }

  function nomeFor(nome) {
    if (!nome) return 'Carregando...';
    const nomeFormatado = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
    return nomeFormatado;
  }

  if (loading) {
    return <div className={styles.container}>Carregando receitas...</div>;
  }

  return (
    <div className="container">
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
            {receita?.imagemReceita ? (
              <img
                className={styles.img_receita}
                src={`data:image/jpeg;base64,${receita.imagemReceita}`}
                alt={`Imagem da receita ${receita.tituloReceita}`}
              />
            ) : (
              <img
                className={styles.img_receita}
                alt="Carregando imagem da receita..."
              />
            )}
          </div>

          <div className={styles.div_rec}>
            <h2>Descrição da receita:</h2>
            <p>{receita ? receita.descricao : 'Carregando descrição...'}</p>
          </div>
        </div>

        <div className={styles.autor}>
          <p>Receita feita por {receita?.usuario?.id && receita?.usuario?.nome ? (
            <a href={`../julia/perfil?idUsuario=${receita.usuario.id}`}>
              {nomeFor(receita.usuario.nome)}
            </a>
          ) : (
            <span>(Carregando Autor...)</span>
          )}</p>
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
              <span className={styles.hora}>
                {receita ? formatarTempo(Number(receita.tempoPreparo)) : 'Carregando Tempo'}
              </span>
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


        {/* Modal de Avaliação */}

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
                id="comentar"
                value={ratingData.comment}
                onChange={(e) => setRatingData({ ...ratingData, comment: e.target.value })}
                placeholder="Digite seu comentário..."
                aria-label="Deixe um comentário"
                className={styles.comentar2}
                style={{ height: '12vh' }}
              />
              <div className={styles.modalButtons}>
                <X className={styles.closeIcon} size={30} onClick={closeModal} aria-label="Fechar modal" />
                <button className={styles.submitButton} onClick={postComentario}>Enviar</button>

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
                {ingredientes.length === 0 ? (
                  <li>Carregando ingredientes...</li>
                ) : (
                  ingredientes.map((item, index) => (
                    <li key={index}>
                      {item.nomeIngrediente.toUpperCase()}
                    </li>
                  ))
                )}
              </ul>

            </div>
          </div>
        </div>
      </section>

      <section className={styles.des_receita}>
        <div className={styles.preparo}>
          <div className={styles.preparo2}><h2>Modo de preparo</h2></div>
          <div className={styles.preparo3}>
            <ul>
              {etapas.length === 0 ? (
                <li>Carregando etapas...</li>
              ) : (
                etapas.map((etapa, index) => (
                  <li key={etapa.id || index}>
                    {etapa.descricao}
                  </li>
                ))
              )}
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
              <div key={comentario.id || index} className={`${styles.comen} ${styles[`comen${(index % 4) + 1}`]}`}>
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
    </div>
  );
};

export default App;

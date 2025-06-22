'use client'
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Cookies from 'js-cookie';
import { X, Plus, Minus } from "lucide-react";
import DropDownRegiao from "@/components/DropDownAdicionarReceita/DropDownRegiao";
import valorURL from "../urls";



export default function Camille() {
  // Estados principais
  const [image, setImage] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [etapas, setEtapas] = useState([{
    id: 1,
    conteudo: '',
    ingredientes: []
  }]);
  const [ingredientesDisponiveis, setIngredientesDisponiveis] = useState([]);
  const [ingredientesFiltrados, setIngredientesFiltrados] = useState([]);
  const [buscaIngrediente, setBuscaIngrediente] = useState('');
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState([]);
  const [porcoes, setPorcoes] = useState('');
  const [customPorcoes, setCustomPorcoes] = useState('');
  const [regiao, setRegiao] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  // Filtra ingredientes conforme digitação

  useEffect(() => {
    async function buscarIngredientes() {
      try {
        const res = await fetch(`${valorURL}/api/ingredientes`);
        if (!res.ok) throw new Error('Erro ao buscar ingredientes');

        const data = await res.json();
        // Supondo que o retorno seja: [{ id: 1, nome: "Farinha de trigo" }, ...]
        const nomesIngredientes = data.map(ing => ing.nome);
        setIngredientesDisponiveis(nomesIngredientes);
      } catch (error) {
        console.error("Erro ao carregar ingredientes:", error);
      }
    }

    buscarIngredientes();
  }, []);


  useEffect(() => {
    if (buscaIngrediente.trim() === '') {
      setIngredientesFiltrados([]);
    } else {
      const filtrados = ingredientesDisponiveis.filter(ingrediente =>
        ingrediente.toLowerCase().includes(buscaIngrediente.toLowerCase())
      );
      setIngredientesFiltrados(filtrados);
    }
  }, [buscaIngrediente, ingredientesDisponiveis]);

  // Handlers de imagem
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => setImage(null);

  // Handlers de tempo
  const handleMinutesChange = (e) => {
    const mins = Math.max(0, parseInt(e.target.value, 10) || 0);
    setMinutes(mins % 60);
    setHours(prev => prev + Math.floor(mins / 60));
  };

  const handleHoursChange = (e) => {
    setHours(Math.max(0, parseInt(e.target.value, 10) || 0));
  };

  // Handlers de etapas
  const adicionarEtapa = () => {
    setEtapas(prev => [...prev, {
      id: prev.length + 1,
      conteudo: '',
      ingredientes: []
    }]);
  };

  const removerEtapa = (id) => {
    if (etapas.length > 1) {
      setEtapas(prev => prev.filter(e => e.id !== id).map((e, i) => ({ ...e, id: i + 1 })));
    }
  };

  const atualizarConteudo = (id, conteudo) => {
    setEtapas(prev => prev.map(e => e.id === id ? { ...e, conteudo } : e));
  };

  // Handlers de ingredientes
  const adicionarIngrediente = () => {
    if (buscaIngrediente.trim() && !ingredientesDisponiveis.includes(buscaIngrediente.trim())) {
      const novoIngrediente = buscaIngrediente.trim();
      setIngredientesDisponiveis([...ingredientesDisponiveis, novoIngrediente]);
      setIngredientesSelecionados([...ingredientesSelecionados, novoIngrediente]);
      setBuscaIngrediente('');
      setIngredientesFiltrados([]);
    }
  };

  const selecionarIngrediente = (ingrediente) => {
    if (!ingredientesSelecionados.includes(ingrediente)) {
      setIngredientesSelecionados([...ingredientesSelecionados, ingrediente]);
    }
    setBuscaIngrediente('');
    setIngredientesFiltrados([]);
  };

  const removerIngredienteSelecionado = (ingrediente) => {
    setIngredientesSelecionados(ingredientesSelecionados.filter(i => i !== ingrediente));

    // Remove de todas as etapas
    setEtapas(prev => prev.map(etapa => ({
      ...etapa,
      ingredientes: etapa.ingredientes.filter(i => i.nome !== ingrediente)
    })));
  };

  // Handlers para ingredientes nas etapas
  const adicionarIngredienteEtapa = (etapaId, ingrediente) => {
    if (!ingredientesSelecionados.includes(ingrediente)) return;

    setEtapas(prev => prev.map(etapa => {
      if (etapa.id === etapaId && !etapa.ingredientes.some(i => i.nome === ingrediente)) {
        return {
          ...etapa,
          ingredientes: [...etapa.ingredientes, {
            nome: ingrediente,
            quantidade: 1,
            medida: '',
            unidade: 'un'
          }]
        };
      }
      return etapa;
    }));
  };

  const atualizarQuantidade = (etapaId, ingredienteNome, novaQuantidade) => {
    setEtapas(prev => prev.map(etapa => {
      if (etapa.id === etapaId) {
        return {
          ...etapa,
          ingredientes: etapa.ingredientes.map(i =>
            i.nome === ingredienteNome ? { ...i, quantidade: novaQuantidade } : i
          )
        };
      }
      return etapa;
    }));
  };

  const atualizarMedida = (etapaId, ingredienteNome, novaMedida) => {
    setEtapas(prev => prev.map(etapa => {
      if (etapa.id === etapaId) {
        return {
          ...etapa,
          ingredientes: etapa.ingredientes.map(i =>
            i.nome === ingredienteNome ? { ...i, medida: novaMedida } : i
          )
        };
      }
      return etapa;
    }));
  };

  const atualizarUnidade = (etapaId, ingredienteNome, novaUnidade) => {
    setEtapas(prev => prev.map(etapa => {
      if (etapa.id === etapaId) {
        return {
          ...etapa,
          ingredientes: etapa.ingredientes.map(i =>
            i.nome === ingredienteNome ? { ...i, unidade: novaUnidade } : i
          )
        };
      }
      return etapa;
    }));
  };

  const removerIngredienteEtapa = (etapaId, ingredienteNome) => {
    setEtapas(prev => prev.map(etapa => {
      if (etapa.id === etapaId) {
        return {
          ...etapa,
          ingredientes: etapa.ingredientes.filter(i => i.nome !== ingredienteNome)
        };
      }
      return etapa;
    }));
  };

  // Handler de submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const idUsuario = Cookies.get('id');

    if (!idUsuario) {
      alert("Usuário não está autenticado.");
      return;
    }

    const tempo_preparo = (parseInt(hours || 0) * 60) + parseInt(minutes || 0);
    const porcoesFinal = porcoes === 'mais' ? customPorcoes : porcoes;

    const formDataReceita = new FormData();
    formDataReceita.append("titulo", titulo);
    formDataReceita.append("descricao", descricao);
    formDataReceita.append("tempo_preparo", tempo_preparo);
    formDataReceita.append("qtn_pessoas", porcoesFinal);
    formDataReceita.append("idUsuario", idUsuario);

    const fileInput = document.getElementById("image-upload");
    if (fileInput?.files.length > 0) {
      formDataReceita.append("imagem", fileInput.files[0]);
    } else {
      alert("Adicione uma imagem.");
      return;
    }

    try {
      const response = await fetch(`${valorURL}/api/Publicacao/PublicarReceita`, {
        method: "POST",
        body: formDataReceita
      });
      const resultado = await response.json();

      if (!response.ok) {
        alert("Erro ao criar receita: " + resultado.erro);
        return;
      }

      const idReceita = resultado.id;

      // Ingredientes
      const ingredientesFormatados = [];
      etapas.forEach(etapa => {
        etapa.ingredientes.forEach(i => {
          ingredientesFormatados.push({
            nome: i.nome,
            quantidade: i.quantidade,
            medida: i.medida || '',
            unidade: i.unidade
          });
        });
      });
      console.log(ingredientesFormatados[0])

      await fetch(`${valorURL}/api/Publicacao/PublicarIngrediente/${idReceita}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredientes: ingredientesFormatados
        })
      });

      // Etapas
      const etapasFormatadas = etapas.map((e, index) => ({
        numeroEtapa: index + 1,
        descricao: e.conteudo
      }));

      await fetch(`${valorURL}/api/Publicacao/PublicarEtapa/${idReceita}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          etapas: etapasFormatadas
        })
      });

      alert("Receita publicada com sucesso!");
      window.location.href = '/julia/homepage';

    } catch (error) {
      console.error(error);
      alert("Erro ao enviar dados da receita.");
    }
  };


  return (
    <div className={styles.container}>
      <h2>Publicação de receita</h2>
      <form className={styles.containerFormulario} onSubmit={handleSubmit}>

        {/* Seção 1 - Imagem e Descrição */}
        <h3 className={styles.camposColoridos}>SUA RECEITA</h3>
        <div className={styles.primeiroCampo}>
          <div className={styles.campoAdicionarImagem}>
            <label htmlFor="image-upload" className={styles.lableImagem}>
              {image ? (
                <>
                  <img src={image} alt="Preview" className={styles.imagemReceita} />
                  <button type="button" onClick={removeImage} className={styles.botaoExluirImagem}>
                    <X size={18} />
                  </button>
                </>
              ) : <span>Coloque a Imagem da receita</span>}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className={styles.InputOploaodImagem}
              onChange={handleImageChange}
            />
          </div>

          <div className={styles.campoInputNomeEscricao}>
            <div className={styles.containerInput}>
              <label>TÍTULO DA RECEITA:</label>
              <input
                className={styles.inputPrenchimento}
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>
            <div className={styles.containerInput}>
              <label>DESCRIÇÃO (Opcional):</label>
              <textarea
                className={styles.inputPrenchimento}
                cols="30"
                rows="10"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Seção 2 - Tempo, Porções e Região */}
        <div className={styles.segundoCampo}>
          <div className={styles.containerTempo}>
            <h4 className={styles.camposColoridos}>Tempo de Preparo*:</h4>
            <div className={styles.horaMinutos}>
              <div className={styles.campoHorasMinutos}>
                <input
                  type="number"
                  value={hours}
                  onChange={handleHoursChange}
                  min="0"
                  className={styles.campoInputtempo}
                />
                <label>Hora(s)</label>
              </div>
              <div className={styles.campoHorasMinutos}>
                <input
                  type="number"
                  value={minutes}
                  onChange={handleMinutesChange}
                  min="0"
                  className={styles.campoInputtempo}
                />
                <label>Minuto(s)</label>
              </div>
            </div>
          </div>

          <div className={styles.containerPorcoes}>
            <h4 className={styles.camposColoridos}>Serve quantas pessoas?*</h4>
            <div className={styles.opcoesPorcoes}>
              {[1, 2, 3, 4].map((num) => (
                <label key={num} className={styles.opcaoPorcao}>
                  <input
                    type="radio"
                    name="porcoes"
                    value={num}
                    checked={porcoes === num.toString()}
                    onChange={(e) => setPorcoes(e.target.value)}
                  />
                  {num}
                </label>
              ))}
              <label className={styles.opcaoPorcao}>
                <input
                  type="radio"
                  name="porcoes"
                  value="mais"
                  checked={porcoes === 'mais'}
                  onChange={(e) => setPorcoes(e.target.value)}
                />
                Mais de 4
              </label>
              {porcoes === 'mais' && (
                <input
                  type="number"
                  min="5"
                  value={customPorcoes}
                  onChange={(e) => setCustomPorcoes(e.target.value)}
                  placeholder="Quantidade exata"
                  className={styles.inputCustomPorcoes}
                />
              )}
            </div>
          </div>

          {/*<div className={styles.containerRegiao}>
            <h4 className={styles.camposColoridos}>Região (Opcional):</h4>
            <DropDownRegiao onChange={(value) => setRegiao(value)} />
          </div>*/}
        </div>

        {/* Seção 3 - Ingredientes com Busca Dinâmica */}
        <div className={styles.containerIngredientes}>
          <h4 className={styles.camposColoridos}>Ingredientes*:</h4>

          <div className={styles.buscaIngredienteContainer}>
            <input
              type="text"
              value={buscaIngrediente}
              onChange={(e) => setBuscaIngrediente(e.target.value)}
              placeholder="Digite para buscar ou adicionar ingrediente"
              className={styles.inputBusca}
              onKeyPress={(e) => e.key === 'Enter' && adicionarIngrediente()}
            />
            <button
              type="button"
              onClick={adicionarIngrediente}
              className={styles.btnAdicionar}
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Lista de ingredientes filtrados */}
          {buscaIngrediente && (
            <div className={styles.listaFiltrada}>
              {ingredientesFiltrados.length > 0 ? (
                ingredientesFiltrados.map((ingrediente, index) => (
                  <div
                    key={index}
                    className={styles.itemFiltrado}
                    onClick={() => selecionarIngrediente(ingrediente)}
                  >
                    {ingrediente}
                  </div>
                ))
              ) : (
                <div className={styles.semResultados}>
                  Nenhum ingrediente encontrado. Pressione Enter ou clique no + para adicionar.
                </div>
              )}
            </div>
          )}

          {/* Ingredientes selecionados */}
          <div className={styles.ingredientesSelecionados}>
            {ingredientesSelecionados.map((ingrediente, index) => (
              <div key={index} className={styles.ingredienteSelecionado}>
                <span>{ingrediente}</span>
                <button
                  type="button"
                  onClick={() => removerIngredienteSelecionado(ingrediente)}
                  className={styles.botaoRemover}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Seção 4 - Etapas de Preparo */}
        <div className={styles.terceiroCampo}>
          <div className={styles.containerEtapas}>
            {etapas.map((etapa) => (
              <div key={etapa.id} className={styles.containerEtapa}>
                <div className={styles.containerBtnLabel}>
                  <button
                    type="button"
                    onClick={() => removerEtapa(etapa.id)}
                    className={styles.btnExluirEtapa}
                  >
                    <X size={18} />
                  </button>
                  <label className={`${styles.camposColoridos} ${styles.tituloEtapa}`}>
                    Etapa {etapa.id}
                  </label>
                </div>
                <input
                  type="text"
                  value={etapa.conteudo}
                  onChange={(e) => atualizarConteudo(etapa.id, e.target.value)}
                  className={styles.inputEtapa}
                  required
                  placeholder="Descreva esta etapa"
                />

                {/* Seletor de Ingredientes para a Etapa */}
                <div className={styles.filtroIngredientes}>
                  <label>Adicionar ingrediente a esta etapa:</label>
                  <select
                    onChange={(e) => e.target.value && adicionarIngredienteEtapa(etapa.id, e.target.value)}
                    className={styles.selectIngredientes}
                    value=""
                  >
                    <option value="">Selecione um ingrediente</option>
                    {ingredientesSelecionados.map((ingrediente, index) => (
                      <option
                        key={index}
                        value={ingrediente}
                        disabled={etapa.ingredientes.some(i => i.nome === ingrediente)}
                      >
                        {ingrediente}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Lista de Ingredientes da Etapa com Quantidades */}
                <div className={styles.ingredientesEtapa}>
                  {etapa.ingredientes.map((ingrediente, idx) => (
                    <div key={idx} className={styles.ingredienteQuantidade}>
                      <span className={styles.nomeIngrediente}>{ingrediente.nome}</span>

                      <div className={styles.controleQuantidade}>
                        <input
                          type="number"
                          min="0"
                          value={ingrediente.quantidade}
                          onChange={(e) => atualizarQuantidade(
                            etapa.id,
                            ingrediente.nome,
                            parseInt(e.target.value) || 0
                          )}
                          className={styles.inputQuantidade}
                        />

                        <select
                          value={ingrediente.medida}
                          onChange={(e) => atualizarMedida(etapa.id, ingrediente.nome, e.target.value)}
                          className={styles.selectFracao}
                        >
                          <option value="">Medida</option>
                          <option value="Xicaras">xícara</option>
                          <option value="Unidades">unidades</option>
                          <option value="ml">ml</option>
                          <option value="gramas">gramas</option>
                          <option value="copo">copo</option>
                          <option value="colheres">colheres</option>
                        </select>

                        <select
                          value={ingrediente.unidade}
                          onChange={(e) => atualizarUnidade(etapa.id, ingrediente.nome, e.target.value)}
                          className={styles.selectUnidade}
                        >
                          <option value="">Unidade</option>
                          <option value="chá">chá</option>
                          <option value="sopa">sopa</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => removerIngredienteEtapa(etapa.id, ingrediente.nome)}
                          className={styles.botaoRemover}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button type="button" onClick={adicionarEtapa} className={styles.btnAdicionarEtapa}>
            + ADICIONAR MAIS ETAPAS
          </button>
        </div>

        {/* Botão de Envio */}
        <div className={styles.containerBtnEnviar}>
          <button type="submit" className={styles.btnEnviarFormulario}>
            Enviar sua receita
          </button>
        </div>
      </form>
    </div>
  );
}
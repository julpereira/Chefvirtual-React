'use client'
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { X, Plus, Minus } from "lucide-react";
import DropDownRegiao from "@/components/DropDownAdicionarReceita/DropDownRegiao";

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
  const [ingredientesDisponiveis, setIngredientesDisponiveis] = useState([
    'Farinha de trigo', 'Açúcar', 'Ovos', 'Leite', 'Manteiga', 'Fermento',
    'Chocolate', 'Óleo', 'Sal', 'Canela', 'Baunilha', 'Limão', 'Morango',
    'Nozes', 'Amêndoas', 'Aveia', 'Mel', 'Iogurte', 'Queijo', 'Tomate'
  ]);
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
            fracao: '',
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

  const atualizarFracao = (etapaId, ingredienteNome, novaFracao) => {
    setEtapas(prev => prev.map(etapa => {
      if (etapa.id === etapaId) {
        return {
          ...etapa,
          ingredientes: etapa.ingredientes.map(i => 
            i.nome === ingredienteNome ? { ...i, fracao: novaFracao } : i
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
  const handleSubmit = (event) => {
    event.preventDefault();
    const dadosFormulario = {
      titulo,
      descricao,
      image,
      tempo: {
        hours,
        minutes
      },
      ingredientesSelecionados,
      etapas: etapas.map(etapa => ({
        etapa: etapa.id,
        descricao: etapa.conteudo,
        ingredientes: etapa.ingredientes
      })),
      porcoes: porcoes === 'mais' ? customPorcoes : porcoes,
      regiao
    };
    
    console.log("Dados do Formulário:", dadosFormulario);
    // Adicione aqui a lógica de envio para seu backend
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

          <div className={styles.containerRegiao}>
            <h4 className={styles.camposColoridos}>Região (Opcional):</h4>
            <DropDownRegiao onChange={(value) => setRegiao(value)} />
          </div>
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
                          value={ingrediente.fracao}
                          onChange={(e) => atualizarFracao(etapa.id, ingrediente.nome, e.target.value)}
                          className={styles.selectFracao}
                        >
                          <option value="">Inteiro</option>
                          <option value="1/2">Meio</option>
                          <option value="1/3">Um terço</option>
                          <option value="1/4">Um quarto</option>
                          <option value="3/4">Três quartos</option>
                        </select>
                        
                        <select
                          value={ingrediente.unidade}
                          onChange={(e) => atualizarUnidade(etapa.id, ingrediente.nome, e.target.value)}
                          className={styles.selectUnidade}
                        >
                          <option value="un">un</option>
                          <option value="xíc">xícara</option>
                          <option value="col">colher</option>
                          <option value="g">gramas</option>
                          <option value="ml">ml</option>
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
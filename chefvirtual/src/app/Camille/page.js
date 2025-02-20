'use client'
import styles from "./page.module.css";
import { useState } from "react";
import { X } from "lucide-react";
import DropDownRegiao from "@/components/DropDownAdicionarReceita/DropDownRegiao";
import DropDownIngradientes from "@/components/DropDownAdicionarReceita/DropDownIngredientes";
export default function Camille() {

  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const handleMinutesChange = (e) => {
    let mins = parseInt(e.target.value, 10);
    if (isNaN(mins) || mins < 0) mins = 0;
    setHours((prevHours) => Math.floor(mins / 60) + prevHours);
    setMinutes(mins % 60);
  };

  const handleHoursChange = (e) => {
    let hrs = parseInt(e.target.value, 10);
    if (isNaN(hrs) || hrs < 0) hrs = 0;
    setHours(hrs);
  };

  const removeImage = () => setImage(null);

  const [etapas, setEtapas] = useState([
    { id: 1, conteudo: '' },
    { id: 2, conteudo: '' },
    { id: 3, conteudo: '' },
    { id: 4, conteudo: '' },
  ]);

  const adicionarEtapa = () => {
    const novaEtapa = {
      id: etapas.length + 1,
      conteudo: '',
    };
    setEtapas([...etapas, novaEtapa]);
  };

  const removerEtapa = (id) => {
    if (etapas.length > 1) {
      const novasEtapas = etapas.filter((etapa) => etapa.id !== id);
      setEtapas(novasEtapas.map((etapa, index) => ({ ...etapa, id: index + 1 })));
    } else {
      alert("Não é possível remover a última etapa.");
    }
  };

  const atualizarConteudo = (id, conteudo) => {
    const novasEtapas = etapas.map((etapa) =>
      etapa.id === id ? { ...etapa, conteudo } : etapa
    );
    setEtapas(novasEtapas);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // 🔴 Agora o formulário não será enviado
    console.log("Formulário não enviado");
  };
  

  return (
    <div className={styles.container}>
      <h2>Publicação de receita</h2>
      <form className={styles.containerFormulario} onSubmit={handleSubmit}>
        <h3 className={styles.camposColoridos}>SUA RECEITA</h3>
        <div className={styles.primeiroCampo}>
          <div className={styles.campoAdicionarImagem}>
            <label
              htmlFor="image-upload"
              className={styles.lableImagem}
            >
              {image ? (
                <>
                  <img src={image} alt="Preview" className={styles.imagemReceita} />
                  <button
                    onClick={removeImage}
                    className={styles.botaoExluirImagem}
                  >
                    <X size={18} />
                  </button>
                </>
              ) : (
                <span>Coloque a Imagem da receita</span>
              )}
            </label>
            <input id="image-upload" type="file" accept="image/*" className={styles.InputOploaodImagem} onChange={handleImageChange} />
          </div>
          <div className={styles.campoInputNomeEscricao}>
            <div className={styles.containerInput}>
              <label>TÍTULO DA RECEITA:</label>
              <input className={styles.inputPrenchimento} type="text" />
            </div>
            <div className={styles.containerInput}>
              <label>DESCRIÇÃO (Opicional):</label>
              <textarea className={styles.inputPrenchimento} cols="30" rows="10"></textarea>
            </div>
          </div>
        </div>
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
          <div className={styles.containerIngredientes}>
            <h4 className={styles.camposColoridos}>Ingredientes*:</h4>
            <DropDownIngradientes />
          </div>
          <div className={styles.containerRegiao}>
            <h4 className={styles.camposColoridos}>Região*:</h4>
            <DropDownRegiao />
          </div>
        </div>
        <div className={styles.terceiroCampo}>
          <div className={styles.containerEtapas}>
            {etapas.map((etapa) => (
              <div key={etapa.id} className={styles.containerEtapa}>
                <div className={styles.containerBtnLabel}>
                  <button type="button" onClick={() => removerEtapa(etapa.id)} className={styles.btnExluirEtapa}>
                    <X size={18} />
                  </button>
                  <label className={`${styles.camposColoridos} ${styles.tituloEtapa}`}>Etapa {etapa.id}</label>
                </div>
                <input
                  type="text"
                  value={etapa.conteudo}
                  onChange={(e) => atualizarConteudo(etapa.id, e.target.value)}
                  className={styles.inputEtapa}
                />
              </div>
            ))}
          </div>
          <div>
            <button type="button" onClick={adicionarEtapa} className={styles.btnAdicionarEtapa}>
              + ADICIONAR MAIS ETAPAS
            </button>
          </div>
        </div>
        <div className={styles.containerBtnEnviar}>
          <button type="submit" className={styles.btnEnviarFormulario}>
            Enviar sua receita
          </button>
        </div>
      </form>
    </div>
  );
}
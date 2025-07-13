'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ingredientes = [
  "Abacaxi", "Abobrinha", "Açúcar", "Alecrim", "Alho", "Amêndoas", "Avelã", "Banana",
  "Batata", "Berinjela", "Brócolis", "Camarão", "Canela", "Carne de boi", "Castanha",
  "Cebola", "Cebolinha", "Cenoura", "Chocolate", "Coco ralado", "Coentro", "Cominho",
  "Creme de leite", "Cravo", "Curry", "Espinafre", "Farinha de trigo", "Fermento",
  "Frango", "Gengibre", "Laranja", "Leite", "Leite condensado", "Limão", "Louro",
  "Lula", "Maçã", "Mamão", "Manga", "Manjericão", "Manteiga", "Mel", "Morango",
  "Noz-moscada", "Nozes", "Óleo", "Orégano", "Ovo", "Páprica", "Peixe", "Pimenta",
  "Pimentão", "Polvo", "Porco", "Queijo", "Repolho", "Requeijão", "Sal", "Salsa",
  "Tomate", "Uva", "Vinagre"
];

export default function ModalPesquisa({ isOpen, onClose }) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipeType, setRecipeType] = useState('');
  const [timeRange, setTimeRange] = useState(''); // rename to timeRange para ficar mais claro
  const router = useRouter();

  useEffect(() => {
    if (isOpen) document.body.classList.add('modal-open');
    else document.body.classList.remove('modal-open');
  }, [isOpen]);

  const handleRatingClick = (rating) => setSelectedRating(rating);
  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleIngredientToggle = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient) ? prev.filter((i) => i !== ingredient) : [...prev, ingredient]
    );
  };

  const handleBuscarClick = () => {
    const queryParams = new URLSearchParams();

    if (selectedRating > 0) {
      queryParams.append("notaMinima", selectedRating);
    }

    if (selectedIngredients.length > 0) {
      queryParams.append("ingredientes", selectedIngredients.join(","));
    }

    if (timeRange && timeRange !== 'selecione') {
      const [tempoMinimo, tempoMaximo] = timeRange.split("-");

      if (tempoMinimo) queryParams.append("tempoMinimo", tempoMinimo);
      if (tempoMaximo) queryParams.append("tempoMaximo", tempoMaximo);
    }

    if (recipeType && recipeType !== "") {
      queryParams.append("tipo", recipeType);
    }

    router.push(`/joao_vitor/resulBuscaAvancada?${queryParams.toString()}`);
    onClose();
  };

  const filteredIngredients = ingredientes.filter((i) =>
    i.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="overlay" style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="modal" style={{ width: '75vw', height: '75vh', backgroundColor: 'white', padding: '20px', borderRadius: '10px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ height: '100%', overflowY: 'auto', paddingRight: '10px' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>×</button>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h1>Filtrar pesquisa</h1>
          </div>

          <div className="filters">
            <div style={{ marginBottom: '20px' }}>
              <label>Nota</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div key={rating} onClick={() => handleRatingClick(rating)} style={{ cursor: 'pointer' }}>
                    <Image
                      src={rating <= selectedRating ? '/img/estrelaC.png' : '/img/estrelaF.png'}
                      alt="estrela"
                      width={30}
                      height={30}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label>Ingredientes</label>
              <input type="text" placeholder="Pesquisar ingredientes" value={searchTerm} onChange={handleSearch} style={{ width: '100%', padding: '10px', borderRadius: '5px', marginBottom: '10px' }} />
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {filteredIngredients.map((ingredient) => (
                  <div key={ingredient} style={{ marginBottom: '5px' }}>
                    <label>
                      <input type="checkbox" checked={selectedIngredients.includes(ingredient)} onChange={() => handleIngredientToggle(ingredient)} />
                      {ingredient}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label>Tempo (Min.)</label>
              <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
                <option value="selecione">Selecione</option>
                <option value="0-5">0-5 Minutos</option>
                <option value="5-15">5-15 Minutos</option>
                <option value="15-30">15-30 Minutos</option>
                <option value="30-60">30-60 Minutos</option>
                <option value="60-120">60-120 Minutos</option>
                <option value="120-240">120-240 Minutos</option>
                <option value="240-360">240-360 Minutos</option>
                <option value="360-10000">360+ Minutos</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label>Tipos de Receitas</label>
              <select value={recipeType} onChange={(e) => setRecipeType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
                <option value="">Selecione</option>
                <option value="Doce">Doce</option>
                <option value="Salgado">Salgado</option>
                <option value="Comidas Frias">Comidas Frias</option>
                <option value="Comidas quentes">Comidas quentes</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <button onClick={handleBuscarClick} style={{ padding: '10px 20px', backgroundColor: '#FF914D', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

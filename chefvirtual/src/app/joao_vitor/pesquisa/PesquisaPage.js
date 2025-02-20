'use client'
import { useState } from 'react';

export default function PesquisaPage() {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const selectRating = (rating) => {
        console.log(`Avaliação selecionada: ${rating}`);
    };

    return (
        <div>
            <h1>Página de Pesquisa</h1>

            {}
            {isModalOpen && (
                <div className="overlay" style={{ width: '100vw', height: '110vh', position: 'fixed', top: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="modal" style={{ width: '65vw', height: '65vh', backgroundColor: 'white', padding: '20px', borderRadius: '10px', position: 'relative' }}>
                        <button className="close-btn" onClick={closeModal} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>
                            &#10006;
                        </button>

                        <div className="search-icon" style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <img src="./assets/img/lupa.png" height="90" width="90" alt="Ícone de pesquisa" />
                        </div>

                        <div className="filters">
                            <div className="filter-group" style={{ marginBottom: '20px' }}>
                                <label>Nota</label>
                                <div className="stars" style={{ display: 'flex', gap: '10px' }}>
                                    {[5, 4, 3, 2, 1].map((rating) => (
                                        <div key={rating}>
                                            <input
                                                type="radio"
                                                id={`star${rating}`}
                                                name="rating"
                                                value={rating}
                                            />
                                            <label htmlFor={`star${rating}`} onClick={() => selectRating(rating)}>
                                                ⭐
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="filter-group" style={{ marginBottom: '20px' }}>
                                <label>Tempo (Min.)</label>
                                <select style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
                                    <option value="selecione">Selecione</option>
                                    <option value="0-5">0-5 Minutos</option>
                                    <option value="5-15">5-15 Minutos</option>
                                    <option value="15-30">15-30 Minutos</option>
                                    <option value="30-60">30-60 Minutos</option>
                                    <option value="60-120">60-120 Minutos</option>
                                    <option value="120-240">120-240 Minutos</option>
                                    <option value="240-360">240-360 Minutos</option>
                                    <option value="360+">360+ Minutos</option>
                                </select>
                            </div>

                            <div className="filter-group" style={{ marginBottom: '20px' }}>
                                <label>Tipos de Receitas</label>
                                <select style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
                                    <option>Selecione</option>
                                    <option>Doce</option>
                                    <option>Salgado</option>
                                </select>
                            </div>

                            <div className="filter-group ingredients" style={{ marginBottom: '20px' }}>
                                <label>Ingredientes</label>
                                <select style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
                                    <option>Selecione</option>
                                </select>
                                <div className="ingredients-options" style={{ marginTop: '10px' }}>
                                    <label><input type="checkbox" /> Morango</label>
                                    <label><input type="checkbox" /> Abacate</label>
                                    <label><input type="checkbox" /> Chocolate</label>
                                </div>
                            </div>

                            <div className="filter-group">
                                <label>País de Origem</label>
                                <select style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
                                    <option>Selecione</option>
                                    <option>Brasil</option>
                                    <option>Estados Unidos</option>
                                    <option>Itália</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
'use client'
import { useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react'
import styles from './estiloDropDown.module.css'

const countries = [
    "Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"
];

export default function DropDownRegiao() {
    const [search, setSearch] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const filteredCountries = countries.filter((country) =>
        country.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={styles.containerDropDown}>
            <div className={styles.campoInputDrop}>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar região..."
                    className={styles.inputDrop}
                />
                <p onClick={() => setIsOpen(!isOpen)}>{
                    isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} className={styles.chevronStyle}/>
                }
                </p>
            </div>

            {isOpen && (
                <ul className={styles.listaOpcoes}>
                    {filteredCountries.length > 0 ? (
                        filteredCountries.map((country, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setSelectedCountry(country);
                                    setSearch(country);
                                    setIsOpen(false);
                                }}
                                className={styles.opcaoDrop}
                            >
                                {country}
                            </li>
                        ))
                    ) : (
                        <li className={styles.mensagemErro}>Nenhum país encontrado</li>
                    )}
                </ul>
            )}
        </div>
    );
}

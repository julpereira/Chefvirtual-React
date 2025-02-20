import { useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react'

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
        <div className="relative w-64">
            <div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar país..."
                    className="w-full p-2 border rounded-md"
                />
                <p onClick={() => setIsOpen(!isOpen)}>{
                    isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />
                }
                </p>
            </div>

            {isOpen && (
                <ul className="absolute left-0 w-full bg-white border rounded-md mt-1 max-h-40 overflow-y-auto shadow-md">
                    {filteredCountries.length > 0 ? (
                        filteredCountries.map((country, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setSelectedCountry(country);
                                    setSearch(country);
                                    setIsOpen(false);
                                }}
                                className="p-2 cursor-pointer hover:bg-gray-200"
                            >
                                {country}
                            </li>
                        ))
                    ) : (
                        <li className="p-2 text-gray-500">Nenhum país encontrado</li>
                    )}
                </ul>
            )}
            {selectedCountry && <p className="mt-2">País selecionado: {selectedCountry}</p>}
        </div>
    );
}

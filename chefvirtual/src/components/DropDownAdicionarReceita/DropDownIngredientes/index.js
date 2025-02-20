import { useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react'

const ingredients = [
    { id: 1, name: "Farinha" },
    { id: 2, name: "Açúcar" },
    { id: 3, name: "Ovos" },
    { id: 4, name: "Leite" },
    { id: 5, name: "Manteiga" },
    { id: 6, name: "Fermento" },
    { id: 7, name: "Chocolate" },
    { id: 8, name: "Baunilha" },
    { id: 9, name: "Sal" },
    { id: 10, name: "Canela" }
];

export default function DropDownIngredientes() {
    const [search, setSearch] = useState("");
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const filteredIngredients = ingredients.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleCheckboxChange = (ingredient) => {
        setSelectedIngredients((prev) => {
            if (prev.some(item => item.id === ingredient.id)) {
                return prev.filter(item => item.id !== ingredient.id);
            } else {
                return [...prev, ingredient];
            }
        });
    };

    return (
        <div className="relative w-64">
            <div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar ingrediente..."
                    className="w-full p-2 border rounded-md"
                />
                <p onClick={() => setIsOpen(!isOpen)}>{
                    isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />
                }
                </p>
            </div>

            {isOpen && (
                <ul className="absolute left-0 w-full bg-white border rounded-md mt-1 max-h-40 overflow-y-auto shadow-md">
                    {filteredIngredients.length > 0 ? (
                        filteredIngredients.map((ingredient) => (
                            <li
                                key={ingredient.id}
                                className="p-2 cursor-pointer flex items-center justify-between hover:bg-gray-200"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedIngredients.some(item => item.id === ingredient.id)}
                                    onChange={() => handleCheckboxChange(ingredient)}
                                    className="ml-2"
                                />
                                {ingredient.name}
                            </li>
                        ))
                    ) : (
                        <li className="p-2 text-gray-500">Nenhum ingrediente encontrado</li>
                    )}
                </ul>
            )}
            {selectedIngredients.length > 0 && (
                <div className="mt-2">
                    <p>Ingredientes selecionados:</p>
                    <ul>
                        {selectedIngredients.map(ingredient => (
                            <li key={ingredient.id}>{ingredient.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

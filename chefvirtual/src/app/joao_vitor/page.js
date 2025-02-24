"use client"
import { useEffect, useState } from 'react';
import Header from '@/components/Header/index';
import Footer from '@/components/Footer/index';
import RecipeCard from '@/components/ReceitaResult';  

const receitas = [
    {
        titulo: "Receita 1",
        descricao: "Descrição: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        imagem: "/img/FotosExemplo.png",  
        avaliacao: [true, true, true, false, false]
    },
    {
        titulo: "Receita 2",
        descricao: "Descrição: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        imagem: "/img/FotosExemplo.png",  
        avaliacao: [true, true, false, true, true]
    },
    {
        titulo: "Receita 3",
        descricao: "Descrição: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        imagem: "/img/FotosExemplo.png", 
        avaliacao: [true, true, true, true, false]
    },
];

function Page() {
    const [elementos, setElementos] = useState([]);

    useEffect(() => {
        const novosElementos = receitas.map(receita => {
            return {
                titulo: receita.titulo,
                descricao: receita.descricao,
                imagem: receita.imagem,
                avaliacao: receita.avaliacao.map(avaliado => (
                    `/img/${avaliado ? 'estrelaC.png' : 'estrelaF.png'}`  
                ))
            };
        });
        setElementos(novosElementos);
    }, []);

    return (
        <div>
           
            <main>
                    <div className="div-resultados">
                    <div className="div-elementos">
                        {elementos.map((receita, index) => (
                            <RecipeCard key={index} receita={receita} />  
                        ))}
                    </div>
                </div>
            </main>
            
        </div>
    );
}

export default Page;
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import RecipeCard from '@/components/ReceitaResult';
import styles from './page.module.css';
import { Poppins } from 'next/font/google';

const poppinsFont = Poppins({ subsets: ['latin'], weight: '400' });

export default function ResulBuscaAvancada() {
    const [receitas, setReceitas] = useState([]);
    const [mensagem, setMensagem] = useState('Buscando receitas...');
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setMensagem('Buscando receitas...');
                setReceitas([]);

                const queryParams = new URLSearchParams();

                const notaMinima = searchParams.get('notaMinima');
                const tempoMinimo = searchParams.get('tempoMinimo');
                const tempoMaximo = searchParams.get('tempoMaximo');
                const tipo = searchParams.get('tipo');
                const ingredientes = searchParams.get('ingredientes');

                if (notaMinima) queryParams.append('notaMinima', notaMinima);
                if (tempoMinimo) queryParams.append('tempoMinimo', tempoMinimo);
                if (tempoMaximo) queryParams.append('tempoMaximo', tempoMaximo);
                if (tipo) queryParams.append('tipo', tipo);
                if (ingredientes) queryParams.append('ingredientes', ingredientes);

                const res = await fetch(`http://localhost:9000/api/Receitas/BuscaAvancada?${queryParams.toString()}`);
                const data = await res.json();

                if (res.ok && data.length > 0) {
                    setReceitas(data);
                    setMensagem(`${data.length} resultado${data.length === 1 ? '' : 's'} encontrado${data.length === 1 ? '' : 's'}`);
                } else {
                    setMensagem('Nenhuma receita encontrada com os filtros aplicados.');
                }

            } catch (error) {
                console.error('Erro ao buscar receitas avançadas:', error);
                setMensagem('Erro ao buscar receitas.');
            }
        };

        fetchData();
    }, [searchParams]);

    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <div className={styles.Main}>
                <div className={styles.headerBusca}>
                    <h2 className={`${styles.titleResult} ${poppinsFont.className}`}>
                        {mensagem}
                    </h2>
                </div>

                <div className={styles.elementos}>
                    {receitas.map((item, index) => (
                        <RecipeCard key={index} data={item} />
                    ))}
                </div>
            </div>
        </Suspense>
    );
}
    

'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import styles from './alterarSenha.module.css'; 

export default function AlterarSenha() {
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [erro, setErro] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!novaSenha || !confirmaSenha) {
            setErro('Por favor, preencha todos os campos.');
            return;
        }

        
        if (novaSenha !== confirmaSenha) {
            setErro('As senhas não coincidem.');
            return;
        }

        
        setErro('');
        alert('Senha alterada com sucesso!');
        router.push('/Ana/login');
    };

    return (
        <div className={styles.centralizaTudo}>
            
            <div
                className={styles.fundoComImagem}
                style={{ backgroundImage: "url('/img/imagemfundo.png')" }}
            >
                <div className={styles.caixaDeLogin}>
                    <h3 className={styles.titulo}>Alterar Senha</h3>
                    
                    {erro && <p className={styles.erro}>{erro}</p>}
                    <form id="formAlterarSenha" onSubmit={handleSubmit}>
                        <div className={styles.campoEntrada}>
                            <input
                                type="password"
                                placeholder="Nova senha"
                                value={novaSenha}
                                onChange={(e) => setNovaSenha(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.campoEntrada}>
                            <input
                                type="password"
                                placeholder="Confirme sua nova senha"
                                value={confirmaSenha}
                                onChange={(e) => setConfirmaSenha(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.botaoLogin}>
                            Salvar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
'use client';
import React, { useState } from 'react';
import styles from './alterarSenha.module.css'; // Importando o CSS Module

export default function AlterarSenha() {
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação dos campos
        if (!novaSenha || !confirmaSenha) {
            setErro('Por favor, preencha todos os campos.');
            return;
        }

        // Verifica se as senhas coincidem
        if (novaSenha !== confirmaSenha) {
            setErro('As senhas não coincidem.');
            return;
        }

        // Se as senhas coincidirem, limpa o erro
        setErro('');
        alert('Senha alterada com sucesso!');
    };

    return (
        <div className={styles.centralizaTudo}>
            <div className={styles.caixaDeLogin}>
                <h3 className={styles.titulo}>Alterar Senha</h3>
                {/* Mensagem de erro */}
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
    );
}
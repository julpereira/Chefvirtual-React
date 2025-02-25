'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaLock } from 'react-icons/fa'; 
import styles from './alterarSenha.module.css';

export default function AlterarSenha() {
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [erro, setErro] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); 
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

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
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
                            <FaLock className={styles.icone} />
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Nova senha"
                                value={novaSenha}
                                onChange={(e) => setNovaSenha(e.target.value)}
                                required
                            />
                            <i
                                className={`fas ${passwordVisible ? "fa-eye-slash" : "fa-eye"} ${styles.eyeIcon}`} 
                                onClick={togglePasswordVisibility}
                            ></i>
                        </div>
                        <div className={styles.campoEntrada}>
                            <FaLock className={styles.icone} /> 
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Confirme sua nova senha"
                                value={confirmaSenha}
                                onChange={(e) => setConfirmaSenha(e.target.value)}
                                required
                            />
                            <i
                                className={`fas ${passwordVisible ? "fa-eye-slash" : "fa-eye"} ${styles.eyeIcon}`}
                                onClick={togglePasswordVisibility}
                            ></i>
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

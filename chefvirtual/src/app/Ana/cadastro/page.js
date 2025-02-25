'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { FaUser, FaLock } from 'react-icons/fa';  
import styles from './cadastro.module.css';

function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const router = useRouter(); 

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nome || !email || !senha || !confirmaSenha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (senha !== confirmaSenha) {
            alert('As senhas não coincidem.');
            return;
        }

        console.log('Nome:', nome);
        console.log('Email:', email);
        console.log('Senha:', senha);

        alert('Cadastro realizado com sucesso!');
        router.push('/julia/homepage');
    };

    const handleLoginClick = () => {
        router.push('/Ana/login');
    };

    return (
        <div className={styles.body}>
            <div className={styles.containerLaranja}>
                <img src="/img/logo.svg" alt="Logo Chef Virtual" />
                <p>
                    Junte-se à Comunidade <br />
                    CHEF VIRTUAL! <br />
                </p>
                <p>Acesse sua conta <br /> agora mesmo</p>
               
                <button
                    type="button"
                    className={styles.botao}
                    onClick={handleLoginClick} 
                >
                    Entrar
                </button>
            </div>

            <div className={styles.centralizaTudo}>
                <div className={styles.caixaDeLogin}>
                    <div className={styles.tituloCadastro}>
                        Criar conta
                    </div>
                    <form id="formCadastro" onSubmit={handleSubmit}>
                        <div className={styles.campoEntrada}>
                            <FaUser className={styles.icon} /> 
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.campoEntrada}>
                            <FaUser className={styles.icon} /> 
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.campoEntrada}>
                            <FaLock className={styles.icon} /> 
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.campoEntrada}>
                            <FaLock className={styles.icon} /> 
                            <input
                                type="password"
                                id="confirmaSenha"
                                name="confirmaSenha"
                                placeholder="Confirme sua senha"
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

export default Cadastro;

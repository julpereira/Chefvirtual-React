'use client'; 
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import styles from './login.module.css';

function Page() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const router = useRouter(); 

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!usuario || !senha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        
        console.log('Usuário:', usuario);
        console.log('Senha:', senha);
        alert('Login realizado com sucesso!');
    };

    const handleEsqueciSenhaClick = () => {
        router.push('/Ana/recuperar'); 
    };

    return (
        <div
            className={styles.centralizaTudo}
            style={{ backgroundImage: "url('/img/backgroundImg.png')" }}
        >
            <div
                className={styles.fundoComImagem}
                style={{ backgroundImage: "url('/img/imagemfundo.png')" }}
            >
                <div className={styles.caixaDeLogin}>
                    <div className={styles.logo}>
                        <img src="/img/logo.png" alt="Logo Chef Virtual" />
                    </div>
                    <form id="formLogin" onSubmit={handleSubmit}>
                        <div className={styles.campoEntrada}>
                            <i className={`fas fa-user ${styles.icon}`}></i>
                            <input
                                type="text"
                                id="usuario"
                                name="usuario"
                                placeholder="Usuário"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.campoEntrada}>
                            <i className={`fas fa-lock ${styles.icon}`}></i>
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
                        <div className={styles.esqueciSenha}>
                            <button
                                onClick={handleEsqueciSenhaClick} // Redireciona para a página de recuperação de senha
                                className={styles.linkIndex}
                                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                            >
                                Esqueceu a senha?
                            </button>
                        </div>
                        <button type="submit" className={styles.botaoLogin}>
                            Login
                        </button>
                    </form>
                    <div className={styles.outrasOpcoesLogin}>
                        <div className={styles.iconesRedesSociais}>
                            <img
                                src="/img/apple-logo-1-1 1.png"
                                alt="Login Apple"
                            />
                            <img
                                src="/img/Google-Symbol 1.png"
                                alt="Login Google"
                            />
                        </div>
                    </div>
                    <div className={styles.linkCadastro}>
                        <p>
                            Não possui conta?{' '}
                            <button
                                onClick={() => router.push('/Ana/cadastro')} // Redireciona para a página de cadastro
                                className={styles.linkIndex}
                                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                            >
                                Cadastre-se
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
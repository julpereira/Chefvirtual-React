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

        router.push('/julia/homepage');
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
                        <img src="/img/logo.svg" alt="Logo Chef Virtual" />
                    </div>
                    <form id="formLogin" onSubmit={handleSubmit}>
                        
                        <div className={styles.campoEntrada}>
                            <img
                                src="/img/user.png2.png" 
                                alt="Ícone de usuário"
                                className={styles.icone}
                            />
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
                            <img
                                src="/img/senha.png.png" 
                                alt="Ícone de cadeado"
                                className={styles.icone}
                            />
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

                        {/* Botão "Esqueceu a senha?" */}
                        <div className={styles.esqueciSenha}>
                            <button
                                onClick={handleEsqueciSenhaClick}
                                className={styles.linkIndex}
                                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                            >
                                Esqueceu a senha?
                            </button>
                        </div>

                        {/* Botão de Login */}
                        <button type="submit" className={styles.botaoLogin}>
                            Login
                        </button>
                    </form>

                    {/* Outras opções de login */}
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

                    {/* Link para cadastro */}
                    <div className={styles.linkCadastro}>
                        <p>
                            Não possui conta?{' '}
                            <button
                                onClick={() => router.push('/Ana/cadastro')}
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
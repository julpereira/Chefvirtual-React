'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaLock, FaUser } from 'react-icons/fa';
import styles from './login.module.css';

function Page() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!usuario || !senha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        try {
            // Monta a URL com os parâmetros de query (encodeURIComponent para evitar problemas)
            const url = `https://chefvirtual.dev.vilhena.ifro.edu.br/api/api/Login/ConfirmarLogin?email=${encodeURIComponent(usuario)}&senha=${encodeURIComponent(senha)}`;
            // Faz a requisição GET
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                // Se status não for 2xx, pega o erro da API
                const errorData = await response.json();
                alert('Erro: ' + (errorData.erro || 'Falha no login'));
                return;
            }

            const data = await response.json();

            // Aqui você pode salvar o token retornado, por exemplo, no localStorage
            console.log('Token recebido:', data.token);

            alert('Login realizado com sucesso!');
            router.push('/julia/homepage');

        } catch (error) {
            console.error('Erro na requisição de login:', error);
            alert('Erro ao tentar realizar login. Tente novamente.');
        }
    };

    const handleEsqueciSenhaClick = () => {
        router.push('/Ana/recuperar');
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
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
                            <FaUser className={styles.icone} />
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
                            <FaLock className={styles.icone} />
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="senha"
                                name="senha"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                            <i
                                className={`${passwordVisible ? 'fa-eye-slash' : 'fa-eye'} ${styles.eyeIcon}`}
                                onClick={togglePasswordVisibility}
                            >

                            </i>
                        </div>

                        <div className={styles.esqueciSenha}>
                            <button
                                onClick={handleEsqueciSenhaClick}
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

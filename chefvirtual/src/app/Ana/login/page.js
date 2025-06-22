'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaLock, FaUser } from 'react-icons/fa';
import styles from './login.module.css';
import valorURL from '@/app/urls';

export default function Page() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');

        if (!usuario || !senha) {
            setErro('Por favor, preencha todos os campos.');
            return;
        }

        setCarregando(true);

        try {
            const url = `${valorURL}/api/Login/ConfirmarLogin?email=${encodeURIComponent(usuario)}&senha=${encodeURIComponent(senha)}`;
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok || !data.token || !data.idUsuario) {
                setErro(data.erro || 'Usuário ou senha inválidos.');
                setCarregando(false);
                return;
            }


            // Redireciona e força recarregamento da página
            router.push('/julia/homepage');
            router.refresh();

        } catch (error) {
            console.error('Erro no login:', error);
            setErro('Erro ao tentar realizar login. Tente novamente mais tarde.');
        } finally {
            setCarregando(false);
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
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                            <i
                                className={`${passwordVisible ? 'fa-eye-slash' : 'fa-eye'} ${styles.eyeIcon}`}
                                onClick={togglePasswordVisibility}
                            ></i>
                        </div>

                        {erro && <p style={{ color: 'red', textAlign: 'center' }}>{erro}</p>}

                        <div className={styles.esqueciSenha}>
                            <button
                                onClick={handleEsqueciSenhaClick}
                                className={styles.linkIndex}
                                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                                type="button"
                            >
                                Esqueceu a senha?
                            </button>
                        </div>

                        <button type="submit" className={styles.botaoLogin} disabled={carregando}>
                            {carregando ? 'Entrando...' : 'Login'}
                        </button>
                    </form>

                    <div className={styles.outrasOpcoesLogin}>
                        <div className={styles.iconesRedesSociais}>
                            <img src="/img/apple-logo-1-1 1.png" alt="Login Apple" />
                            <img src="/img/Google-Symbol 1.png" alt="Login Google" />
                        </div>
                    </div>

                    <div className={styles.linkCadastro}>
                        <p>
                            Não possui conta?{' '}
                            <button
                                onClick={() => router.push('/Ana/cadastro')}
                                className={styles.linkIndex}
                                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                                type="button"
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

'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock } from 'react-icons/fa';
import styles from './cadastro.module.css';
import valorURL from '@/app/urls';

function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome || !email || !senha || !confirmaSenha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (senha !== confirmaSenha) {
            alert('As senhas não coincidem.');
            return;
        }

        try {
            const response = await fetch(`${valorURL}/api/Usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome,
                    email,
                    senha
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.erro || 'Erro ao cadastrar usuário');
            }

            alert('Cadastro realizado com sucesso!');
            realizarLogin();
            router.push('/julia/homepage');
        } catch (error) {
            alert(error.message);
        }
    };

    const realizarLogin = async () => {
        const url = `${valorURL}/api/Login/ConfirmarLogin?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`;
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
    }


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

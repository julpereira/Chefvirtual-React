'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser } from 'react-icons/fa';
import styles from './recuperar.module.css';
import emailjs from '@emailjs/browser';
import valorUrl from '@/app/urls';

async function getCodigoPorEmail(email) {
    if (!email || !email.includes('@')) {
        throw new Error('E-mail inválido');
    }

    try {
        const response = await fetch(valorUrl + `/api/Verificacao/GetCodigoPorEmail/?email=${encodeURIComponent(email)}`);

        if (!response.ok) {
            const data = await response.json();
            if (response.status === 404) {
                throw new Error('E-mail não encontrado no sistema.');
            }
            throw new Error(data.erro || 'Erro ao enivar código, verefique se o email é válido.');
        }

        const codigo = await response.json();
        return codigo.codigo_verificacao;
    } catch (error) {
        throw new Error(error.message || 'Erro inesperado');
    }
}

function Recuperar() {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            alert('Por favor, preencha o campo de e-mail.');
            return;
        }

        try {
            const codigo = await getCodigoPorEmail(email);
            
            const templateParams = {
                to_name: email,
                from_name: 'Chef Virtual',
                message: `Seu código de verificação é: ${codigo}`,
                to_email: email
            };

            const result = await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            );

            console.log('Email enviado com sucesso:', result.status);
            alert('Um e-mail de recuperação foi enviado para: ' + email);
            localStorage.setItem('emailRecuperacao', email);
            
            router.push('/Ana/verificarCodi');
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
            alert(error.message); // exibe mensagem como "E-mail não encontrado no sistema."
        }
    };


    return (
        <div className={styles.centralizaTudo}>
            <div
                className={styles.fundoComImagem}
                style={{ backgroundImage: "url('/img/imagemfundo.png')" }}
            >
                <div className={styles.caixaDeLogin}>
                    <div className={styles.logo}>
                        <img src="/img/logo.svg" alt="Logo Chef Virtual" />
                    </div>
                    <h3 className={styles.titulo}>Esqueceu senha?</h3>
                    <p className={styles.texto}>
                        Para redefinir sua senha, insira aqui<br />seu endereço de e-mail.
                    </p>
                    <form id="formRecupSenha" onSubmit={handleSubmit}>
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
                        <button type="submit" className={styles.botaoLogin}>
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Recuperar;

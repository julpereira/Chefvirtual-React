'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './veriCodi.module.css';
import valorUrl from '@/app/urls';


async function getPerfilPorEmail(email) {
    if (!email || !email.includes('@')) {
        throw new Error('E-mail inválido');
    }

    try {
        const response = await fetch(`${valorUrl}/api/Usuarios/getByEmail?email=${encodeURIComponent(email)}`);

        if (!response.ok) {
            const data = await response.json();
            if (response.status === 404) {
                throw new Error('E-mail não encontrado no sistema.');
            }
            throw new Error(data.erro || 'Erro ao enivar código, verefique se o email é válido.');
        }

        const dadosJson = await response.json();
        console.log(dadosJson[0].id)
        return dadosJson[0].id;
    } catch (error) {
        throw new Error(error.message || 'Erro inesperado');
    }
}


function VerificarCodigo() {
    const [codigo, setCodigo] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();

    useEffect(() => {
        localStorage.setItem('emailRecuperacao', 'hiagogabriel1132@gmail.com');
        const emailSalvo = localStorage.getItem('emailRecuperacao');
        if (!emailSalvo) {
            alert('E-mail não encontrado. Volte e solicite o código novamente.');
            router.push('/Ana/recuperar');
        } else {
            setEmail(emailSalvo);
        }
    }, [router]);

    const handleCodigoChange = (e) => {
        const valor = e.target.value;
        const codigoLimitado = valor.slice(0, 6);
        setCodigo(codigoLimitado);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!codigo) {
            alert('Por favor, insira o código.');
            return;
        }

        if (codigo.length !== 6) {
            alert('O código deve ter 6 dígitos.');
            return;
        }

        try {
            const response = await fetch(`${valorUrl}/api/Verificacao/GetCodigoPorEmail?email=${encodeURIComponent(email)}`);
            const data = await response.json();


            if (!response.ok) throw new Error(data.erro || 'Erro na verificação.');

            if (data.codigo_verificacao === codigo) {
                const id = await getPerfilPorEmail(email);
                localStorage.setItem('idUsuario', id);
                alert('Código verificado com sucesso!');
                router.push('/Ana/alterarSenha');
            } else {
                alert('Código inválido. Verifique o código enviado no e-mail.');
            }
        } catch (error) {
            console.error('Erro:', error.message);
            alert('Erro ao verificar o código. Tente novamente.');
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
                    <h3 className={styles.titulo}>Verifique seu endereço de e-mail</h3>
                    <p className={styles.texto}>
                        O código de verificação foi enviado<br />para seu e-mail.
                    </p>
                    <form id="formVerificarCodigo" onSubmit={handleSubmit}>
                        <div className={styles.campoEntrada}>
                            <i className={`fas fa-user ${styles.icon}`}></i>
                            <input
                                type="text"
                                id="codigo"
                                name="codigo"
                                placeholder="Insira o código (6 dígitos)"
                                value={codigo}
                                onChange={handleCodigoChange}
                                maxLength={6}
                            />
                        </div>
                        <button type="submit" className={styles.botaoLogin}>
                            Redefinir senha
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default VerificarCodigo;

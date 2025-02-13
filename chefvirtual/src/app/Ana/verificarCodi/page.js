'use client'; // Adicionado para usar hooks no Next.js
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importando o useRouter do Next.js
import styles from './veriCodi.module.css';

function VerificarCodigo() {
    // Estado para armazenar o valor do campo de código
    const [codigo, setCodigo] = useState('');
    const router = useRouter(); // Inicializando o useRouter

    // Função para lidar com a mudança no campo de código
    const handleCodigoChange = (e) => {
        const valor = e.target.value;

        // Filtra apenas números e limita a 6 dígitos
        const apenasNumeros = valor.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        const codigoLimitado = apenasNumeros.slice(0, 6); // Limita a 6 dígitos

        // Atualiza o estado com o valor filtrado e limitado
        setCodigo(codigoLimitado);
    };

    // Função para lidar com a submissão do formulário
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita o recarregamento da página

        // Validação do campo
        if (!codigo) {
            alert('Por favor, insira o código.');
            return;
        }

        if (codigo.length !== 6) {
            alert('O código deve ter exatamente 6 dígitos.');
            return;
        }

        // Simulação de verificação de código (substitua por uma chamada à API)
        console.log('Código:', codigo);
        alert('Código verificado com sucesso!');

        // Redireciona para a página de alteração de senha
        router.push('/Ana/alterarSenha');
    };

    return (
        <div className={styles.centralizaTudo}>
            <div
                className={styles.fundoComImagem}
                style={{ backgroundImage: "url('/img/imagemfundo.png')" }}
            >
                <div className={styles.caixaDeLogin}>
                    <div className={styles.logo}>
                        <img src="/img/logo.png" alt="Logo Chef Virtual" />
                    </div>
                    <h3 className={styles.titulo}>Verifique seu endereço de e-mail</h3>
                    <p className={styles.texto}>
                        O código de verificação foi enviado<br />para seu e-mail.
                    </p>
                    <form id="formVerificarCodigo" onSubmit={handleSubmit}>
                        <div className={styles.campoEntrada}>
                            <i className={`fas fa-user ${styles.icon}`}></i>
                            <input
                                type="text" // Usamos type="text" para permitir a manipulação do valor
                                id="codigo"
                                name="codigo"
                                placeholder="Insira o código (6 dígitos)"
                                value={codigo}
                                onChange={handleCodigoChange} // Função para filtrar números e limitar a 6 dígitos
                                maxLength={6} // Limita o campo a 6 caracteres
                                required
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
'use client'; 
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import styles from './veriCodi.module.css';

function VerificarCodigo() {
    
    const [codigo, setCodigo] = useState('');
    const router = useRouter();

 
    const handleCodigoChange = (e) => {
        const valor = e.target.value;

      
        const apenasNumeros = valor.replace(/\D/g, ''); 
        const codigoLimitado = apenasNumeros.slice(0, 6); 
        
        setCodigo(codigoLimitado);
    };


    
    const handleSubmit = (e) => {
        e.preventDefault(); 

      
        if (!codigo) {
            alert('Por favor, insira o código.');
            return;
        }

        if (codigo.length !== 6) {
            alert('O código deve ter 6 dígitos.');
            return;
        }

        
        console.log('Código:', codigo);
        alert('Código verificado com sucesso!');

        //
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
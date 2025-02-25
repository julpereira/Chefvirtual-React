'use client'; 
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { FaUser } from 'react-icons/fa';  
import styles from './recuperar.module.css';

function Recuperar() {
  
    const [email, setEmail] = useState('');
    const router = useRouter(); 

    
    const handleSubmit = (e) => {
        e.preventDefault();

       
        if (!email) {
            alert('Por favor, preencha o campo de e-mail.');
            return;
        }

       
        console.log('E-mail:', email);
        alert('Um e-mail de recuperação foi enviado para: ' + email);

        router.push('/Ana/verificarCodi');
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
import React, { useState } from "react";
import styles from "./login.module.css";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Usuário:", usuario);
    console.log("Senha:", senha);
  };

  return (
    <div className={styles.centralizaTudo}>
      <div className={styles.fundoComImagem}>
        <div className={styles.caixaDeLogin}>
          <div className={styles.logo}>
            <img src="./assets/img/logo.png" alt="Logo" />
          </div>
          <form onSubmit={handleSubmit} id="formLogin" method="POST">
            <div className={styles.campoEntrada}>
              <i className="fas fa-user"></i>
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
              <i className="fas fa-lock"></i>
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
              <a href="recupSenha.html">Esqueceu a senha?</a>
            </div>
            <button type="submit" className={styles.botaoLogin}>Login</button>
          </form>
          <div className={styles.outrasOpcoesLogin}>
            <div className={styles.iconesRedesSociais}>
              <img src="./assets/img/apple-logo-1-1 1.png" alt="Login Apple" />
              <img src="./assets/img/Google-Symbol 1.png" alt="Login Google" />
            </div>
          </div>
          <div className={styles.linkCadastro}>
            <p>Não possui conta? <a href="cadastro.html">Cadastre-se</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

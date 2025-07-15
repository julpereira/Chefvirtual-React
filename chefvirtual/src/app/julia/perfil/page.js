"use client";
import React, { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { useRouter } from "next/navigation";
import styles from "./perfil.module.css";
import valorUrl from "@/app/urls";
import { Cookie } from "next/font/google";
import Cookies from "js-cookie";

export default function Perfil() {
  const [perfil, setPerfil] = useState(null);
  const [id, setId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const getCookie = (name) => {
      if (typeof document === "undefined") return null;
      const value = document.cookie;
      const parts = value.split(`${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
      return null;
    };

    const cookieId = getCookie("id");
    if (cookieId) setId(cookieId);
  }, []);

  useEffect(() => {
    if (!id) return;

    const carregarPerfil = async () => {
      try {
        const response = await fetch(`${valorUrl}/api/Usuarios/getById/${id}`);
        if (!response.ok) throw new Error("Erro ao carregar perfil");
        const data = await response.json();
        setPerfil(data);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };

    carregarPerfil();
  }, [id]);

  const handleDelete = () => {
    Cookies.remove('token');
    Cookies.remove('id');
    Cookies.remove('userType');
    setShowPopup(true);
    setPassword("");
    setError("");
  };

  const confirmDelete = async () => {
    if (password !== "1234") {
      setError("Senha incorreta. Tente novamente.");
      return;
    }

    try {
      const response = await fetch(`${valorUrl}/api/Usuarios/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao excluir conta.");

      alert("Conta excluída com sucesso!");
      document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.push("/julia/homepage");
    } catch (err) {
      console.error(err);
      setError("Erro ao excluir conta.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogout = () => {
    // document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    Cookies.remove('token');
    Cookies.remove('id');
    Cookies.remove('userType');
    router.push("/julia/homepage");
  };

  const renderImagemBase64 = (imagem) => {
    if (!imagem || !imagem.data) return "/img/default.png";
    const byteArray = new Uint8Array(imagem.data);
    const base64String = btoa(
      byteArray.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
    return `data:image/jpeg;base64,${base64String}`;
  };

  if (!id) return <div>Usuário não autenticado.</div>;
  if (!perfil) return <div>Carregando perfil...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <img
          className={styles.profileimg}
          src={renderImagemBase64(perfil.imagemUsuario)}
          alt={perfil.nome}
        />
        <h2>{capitalizeFirstLetter(perfil.nome)}</h2>
        <p>@{perfil.email.split("@")[0]}</p>

        {perfil.biografia ? (
          <p className={styles.biografia}>{perfil.biografia}</p>
        ) : (
          <p className={styles.biografia}>Sem biografia cadastrada.</p>
        )}

        <div className={styles.socialIcons}>
          <a href={perfil.facebook || "#"} target="_blank" rel="noopener noreferrer" className={styles.icon}>
            <FaFacebook />
          </a>
          <a href={perfil.instagram || "#"} target="_blank" rel="noopener noreferrer" className={styles.icon}>
            <FaInstagram />
          </a>
          <a href={perfil.youtube || "#"} target="_blank" rel="noopener noreferrer" className={styles.icon}>
            <FaYoutube />
          </a>
        </div>

        <a className={styles.edit} href="../joao_bento/ed_perfil">Editar Perfil</a>
        <a className={styles.sair} onClick={handleLogout}>Sair da Conta</a>
        <a className={styles.delete} onClick={handleDelete}>Excluir Conta</a>
      </div>

      <div className={styles.recipesContainer}>
        <h3>Histórico de Receitas</h3>
        <a className={styles.showhistory} href="../joao_vitor">Mostrar</a>
        <div className={styles.recipes}>
          {/* Históricos de receitas podem ser renderizados aqui */}
        </div>
      </div>

      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2>Tem certeza que deseja excluir sua conta?</h2>
            <p>Esta ação não pode ser desfeita. (Senha: 1234)</p>
            <div className={styles.passwordContainer}>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.passwordInput}
              />
              <i
                className={`${passwordVisible ? "fa-eye-slash" : "fa-eye"} ${styles.eyeIcon}`}
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button onClick={confirmDelete} className={styles.confirmDelete}>Confirmar</button>
            <button onClick={() => setShowPopup(false)} className={styles.cancel}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

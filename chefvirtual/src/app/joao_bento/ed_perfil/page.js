'use client';

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

import styles from './perfil.module.css';
import valorUrl from "@/app/urls";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

export default function EditProfile() {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    async function fetchPerfil() {
      try {
        const userId = getCookie('id');
        if (!userId) throw new Error('Usuário não autenticado');

        const response = await fetch(`${valorUrl}/api/Usuarios/getById/${userId}`);
        const text = await response.text();

        if (!response.ok) throw new Error(`Erro ao carregar perfil: ${response.status} ${response.statusText}`);

        let user;
        try {
          user = JSON.parse(text);
        } catch {
          throw new Error('Resposta da API não é JSON válido');
        }

        if (!user || !user.nome) throw new Error('Usuário não encontrado');

        setPerfil(user);

        reset({
          username: user.nome || '',
          email: user.email || '',
          facebook: user.facebook || '',
          instagram: user.instagram || '',
          youtube: user.youtube || '',
          bio: user.biografia || '',
        });

        if (user.imagemUsuario && user.imagemUsuario.data) {
          const blob = new Blob([new Uint8Array(user.imagemUsuario.data)], { type: 'image/jpeg' });
          setProfileImage(URL.createObjectURL(blob));
        } else {
          setProfileImage('/img/default.png');
        }
      } catch (error) {
        console.error(error);
        setModalMessage(`Erro: ${error.message}`);
        setIsModalOpen(true);
      }
    }

    fetchPerfil();
  }, [reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      if (!perfil) throw new Error('Perfil não carregado');

      if (data.password && data.password !== data.confirmPassword) {
        throw new Error('As senhas não coincidem');
      }

      const formData = new FormData();
      formData.append('nome', data.username);
      formData.append('email', data.email);
      formData.append('facebook', data.facebook || '');
      formData.append('instagram', data.instagram || '');
      formData.append('youtube', data.youtube || '');
      formData.append('biografia', data.bio || '');

      if (data.imagemUsuario && data.imagemUsuario.length > 0) {
        formData.append('imagemUsuario', data.imagemUsuario[0]);
      }

      if (data.password && data.password.length > 0) {
        formData.append('senha', data.password);
      }

      const response = await fetch(`${valorUrl}/api/Usuarios/${perfil.id}`, {
        method: 'PATCH',
        body: formData,
      });

      const text = await response.text();

      if (!response.ok) {
        let errorMessage = 'Erro ao atualizar perfil';
        try {
          const err = JSON.parse(text);
          errorMessage = err.erro || errorMessage;
        } catch {
          console.error('Resposta de erro não JSON:', text);
        }
        throw new Error(errorMessage);
      }

      setModalMessage('Alterações salvas com sucesso!');
      setIsModalOpen(true);
      setTimeout(() => setIsModalOpen(false), 3000);
    } catch (error) {
      setModalMessage(`Erro: ${error.message}`);
      setIsModalOpen(true);
    }
  };

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className={styles.mae}>
      <div
        className={styles.voltar}
        onClick={goBack}
        role="button"
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter') goBack(); }}
      >
        <img className={styles.seta_voltar} src="/img/seta_voltar.png" alt="Voltar" />
        <p>Voltar</p>
      </div>

      <div className={styles.form}>
        <div className={styles.uploadLabel}>
          {profileImage ? (
            <img src={profileImage} alt="Prévia" className={styles.previewImage} />
          ) : (
            <span className={styles.uploadText}>Clique para adicionar foto</span>
          )}
          <input
            type="file"
            accept="image/*"
            {...register("imagemUsuario")}
            onChange={handleImageChange}
            className={styles.uploadInput}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.columns}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Nome de Usuário</label>
              <input
                {...register("username", { required: 'Nome é obrigatório' })}
                className={styles.input}
              />
              {errors.username && <p className={styles.errorMessage}>{errors.username.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>E-mail</label>
              <input
                type="email"
                {...register("email", { required: 'Email é obrigatório' })}
                className={styles.input}
              />
              {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Nova Senha</label>
              <input
                type="password"
                {...register("password", {
                  minLength: { value: 8, message: 'Mínimo 8 caracteres' },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message: 'Deve conter maiúscula e minúscula',
                  },
                })}
                className={styles.input}
              />
              {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Confirmar Senha</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  validate: value => value === watch("password") || 'As senhas não coincidem',
                })}
                className={styles.input}
              />
              {errors.confirmPassword && <p className={styles.errorMessage}>{errors.confirmPassword.message}</p>}
            </div>

            <div className={styles.socialSection}>
              <h3 className={styles.socialTitle}>Redes Sociais</h3>

              <div>
                <label className={styles.label}>
                  <FaYoutube className={styles.youtubeIcon} />
                  YouTube
                </label>
                <input
                  type="url"
                  {...register("youtube")}
                  placeholder="Ex: www.youtube.com/@perfil"
                  className={styles.input}
                />
              </div>

              <div>
                <label className={styles.label}>
                  <FaFacebook className={styles.facebookIcon} />
                  Facebook
                </label>
                <input
                  type="url"
                  {...register("facebook")}
                  placeholder="Ex: www.facebook.com/perfil"
                  className={styles.input}
                />
              </div>

              <div>
                <label className={styles.label}>
                  <FaInstagram className={styles.instagramIcon} />
                  Instagram
                </label>
                <input
                  type="url"
                  {...register("instagram")}
                  placeholder="Ex: www.instagram.com/perfil"
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          <div className={styles.bioAndSocial}>
            <div className={styles.formGroup}>
              <label className={styles.label}><h2>Biografia</h2></label>
              <textarea {...register("bio")} className={styles.textarea} rows="3" />
            </div>

            <button type="submit" className={styles.submitButton}>Salvar</button>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>{modalMessage}</p>
            <button onClick={() => setIsModalOpen(false)} className={styles.closeButton}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

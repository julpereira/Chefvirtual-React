'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from './perfil.module.css'; // Importa o módulo CSS

export default function EditProfile() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [profileImage, setProfileImage] = useState(null);

    const onSubmit = (data) => {
        console.log(data);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    const goBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '/'; // Caso não haja histórico, redireciona para a página inicial
        }
    };

    return (
        <div className={styles.mae}>
            <div className={styles.voltar} onClick={goBack} aria-label="Voltar para a página anterior">
                <img className={styles.seta_voltar} src="/img/seta_voltar.png" alt="Voltar" />
                <p>Voltar</p>
            </div>
            <div className={styles.form}> {/* Não precisa repetir a classe form aqui */}
                {/* Foto de perfil */}
                <div className={styles.uploadLabel}>
                    {profileImage ? (
                        <img src={profileImage} alt="Prévia" className={styles.previewImage} />
                    ) : (
                        <span className={styles.uploadText}>Clique para adicionar foto</span>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageChange} className={styles.uploadInput} />
                </div>

                {/* Formulário */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.columns}>
                        {/* Nome de usuário e Nova Senha */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Nome de Usuário</label>
                            <input {...register("username", { required: true })} className={styles.input} />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>E-mail</label>
                            <input type="email" {...register("email", { required: true })} className={styles.input} />
                        </div>

                        {/* Nova Senha e Confirmar Senha */}
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Nova Senha</label>
                            <input type="password" {...register("password", { required: true, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/ })} className={styles.input} />
                            {errors.password && <p className={styles.errorMessage}>A senha deve ter no mínimo 8 caracteres, incluindo 1 maiúscula e 1 minúscula.</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Confirmar Senha</label>
                            <input type="password" {...register("confirmPassword", { required: true, validate: value => value === watch("password") })} className={styles.input} />
                            {errors.confirmPassword && <p className={styles.errorMessage}>As senhas não coincidem.</p>}
                        </div>

                        {/* Redes Sociais */}
                        <div className={styles.socialSection}>
                            <h3 className={styles.socialTitle}>Redes Sociais</h3>
                            <div>
                                <label className={styles.label}>YouTube</label>
                                <input type="url" {...register("youtube")} placeholder="Ex: www.youtube.com/@perfil" className={styles.input} />
                            </div>
                            <div>
                                <label className={styles.label}>Facebook</label>
                                <input type="url" {...register("facebook")} placeholder="Ex: www.facebook.com/perfil" className={styles.input} />
                            </div>
                            <div>
                                <label className={styles.label}>Instagram</label>
                                <input type="url" {...register("instagram")} placeholder="Ex: www.instagram.com/perfil" className={styles.input} />
                            </div>
                        </div>
                    </div>

                    {/* Biografia */}
                    <div className={styles.bioAndSocial}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}><h2>Biografia</h2></label>
                            <textarea {...register("bio")} className={styles.textarea} rows="3"></textarea>
                        </div>

                        <button type="submit" className={styles.submitButton}>Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

"use client";
import styles from "./footer.module.css";

export default function Footer(){
  return (
    <footer className={styles.footer}>
      <div className={styles.FooterNav}>
        <ul className={styles.ul}>
          <li><a href="#">Quem Somos</a></li>
          <li><a href="#">Política de privacidade</a></li>
          <li><a href="#">Termos de uso</a></li>
          <li><a href="#">Contato</a></li>
        </ul>
      </div>
    </footer>
  );
};



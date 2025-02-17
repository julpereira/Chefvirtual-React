"use client";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.FooterNav}>
        <ul className={styles.ul}>
          <li><a href="#" aria-label="Quem Somos">Quem Somos</a></li>
          <li><a href="#" aria-label="Política de Privacidade">Política de privacidade</a></li>
          <li><a href="#" aria-label="Termos de Uso">Termos de uso</a></li>
          <li><a href="#" aria-label="Contato">Contato</a></li>
        </ul>
      </div>
  
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Chefvirtual. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
"use client"; // Indica que este es un Client Component

import { useRouter } from "next/navigation"; // Importa useRouter
import Image from "next/image";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  const router = useRouter(); // Inicializa el router

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactClick = () => {
    router.push("/contact"); // Redirige a la página de contacto
  };

  return (
    <footer className={styles.footer}>
      {/* Contenedor de las tres columnas */}
      <div className={styles.copyright}>
      </div>
      <div className={styles.footerColumns}>
        {/* Columna del logo y texto */}
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <Image
              src="/logo.svg" // Ruta del logo en la carpeta public
              alt="SuiteLabs Logo"
              width={176} // Ajusta el tamaño del logo
              height={56} // Ajusta el tamaño del logo
            />
          </div>
          <p className={styles.logoText}>
            SuiteLabs is your premier choice for building and growing eCommerce businesses running on NetSuite eCommerce (SuiteCommerce).
          </p>
        </div>

        {/* Columna de MENU */}
        <div className={styles.menu}>
          <h3>MENU</h3>
          <button onClick={scrollToTop}>Home</button>
          <button onClick={handleContactClick}>Contact Us</button>
        </div>

        {/* Columna de GET IN TOUCH */}
        <div className={styles.getInTouch}>
          <h3>GET IN TOUCH</h3>
          <button onClick={handleContactClick} className="primaryButton">
            Contact Us
          </button>
        </div>
      </div>

      {/* Línea separadora y copyright */}
      <div className={styles.copyright}>
        <p>Copyright © {new Date().getFullYear()} SuiteLabs</p>
      </div>
    </footer>
  );
}
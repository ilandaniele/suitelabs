import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image
          src="/logo.svg" // Ruta del logo en la carpeta public
          alt="SuiteLabs Logo"
          width={176} // Tamaño del logo como en la imagen
          height={56} // Tamaño del logo como en la imagen
        />
      </div>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <div className={styles.dropdown}>
          <Link href="/services">Services</Link>
          <div className={styles.dropdownContent}>
            <Link href="/services/suitecommerce">SuiteCommerce Development</Link>
            <Link href="/services/seo">eCommerce SEO & Growth Marketing</Link>
          </div>
        </div>
        <Link href="/blog">Blog</Link>
        <Link href="/contact" className={styles.contactButton}>Contact Us</Link>
      </nav>
    </header>
  );
}
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Header.module.css";

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image
          src="/logo.svg"
          alt="SuiteLabs Logo"
          width={190}
          height={65}
        />
      </div>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <div
          className={styles.dropdown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link href="/services" className={styles.dropdownLink}>
            Services
            <span className={`${styles.arrow} ${isHovered ? styles.rotate : ""}`}>▼</span>
          </Link>
          <div className={styles.dropdownContent}>
            <Link href="/services/suitecommerce">SuiteCommerce Development</Link>
            <Link href="/services/seo">eCommerce SEO & Growth Marketing</Link>
          </div>
        </div>
        <Link href="/blog">Blog</Link>
        <Link href="/contact" className="primaryButton bold">
          Contact Us
        </Link>
      </nav>
    </header>
  );
}

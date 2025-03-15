import styles from "../styles/Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h2>We help you drive & grow your ecommerce running in NetSuite</h2>
      <button className={styles.cta}>Get Started</button>
      <div className={styles.services}>
        <div className={styles.service}>
          <h3>SuiteCommerce Development and Consulting</h3>
          <button className={styles.viewMore}>View More</button>
        </div>
        <div className={styles.service}>
          <h3>eCommerce SEO & Growth Marketing</h3>
          <button className={styles.viewMore}>View More</button>
        </div>
      </div>
    </section>
  );
}
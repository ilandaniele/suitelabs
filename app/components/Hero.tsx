import styles from "../styles/Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h2>We help you <b>drive & grow</b> your ecommerce running in <b>NetSuite</b></h2>
        <button className="primaryButton">Get Started</button>
      </div>
      <div className={styles.services}>
        <div className={styles.service}>
          <h3>SuiteCommerce Development and Consulting</h3>
          <button className="primaryButton primaryButtonInverted">View More</button>
        </div>
        <div className={styles.service}>
          <h3>eCommerce SEO & Growth Marketing</h3>
          <button className="primaryButton primaryButtonInverted">View More</button>
        </div>
      </div>
    </section>
  );
}
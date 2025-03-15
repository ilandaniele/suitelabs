import Header from "./components/Header";
import Hero from "./components/Hero";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Hero />
        <section className={styles.about}>
          <h2>Marketing SuiteLabs is your strategic partner for unlocking the full potential of your business.</h2>
          <p>Backed by over nine years of expertise in the field, our team of seasoned professionals is dedicated to driving measurable results and delivering unparalleled value to our clients.</p>
          <p>Why are we different? We chose not to be sales driven to have the freedom of saying what needs to be said, and do what’s right for our clients.</p>
          <p>Discover the SuiteLabs difference today and embark on a journey towards digital excellence. Welcome to a world of endless possibilities.</p>
        </section>
        <section className={styles.trustedBy}>
          <h2>THEY TRUST US</h2>
          <div className={styles.logos}>
            <span>PRIMARY ARMS</span>
            <span>RECURS ANDREW</span>
            <span>POSSESSIONS</span>
            <span>PRIMARY ARMS</span>
          </div>
        </section>
      </main>
    </div>
  );
}
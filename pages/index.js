import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>StreetCrisis</title>
        <meta name="description" content="A Street Couture Experience" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <a href=".">StreetCrisis</a>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.titleHolder}>
              <h1>Get ready for A Street Couture Experience.</h1>
              <p>
                World coming soon. Please check back to know more. Shoot us an
                email if you're curious.
              </p>
            </div>
            <a href="mailto:streetcrisis01@gmail.com">
              <div className={styles.cta}>Send us an email</div>
            </a>
          </div>
          <div className={styles.footer}>
            <span>
              made by{" "}
              <a
                className="underlined"
                href="https://thamsanqaj-fea43.web.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Thamsanqa J
              </a>{" "}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

import Link from "next/link";
import { NotFoundLottie } from "@/src/components/not-found-lottie";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <span className={styles.badge}>Erro 404</span>
        <div className={styles.illustration} aria-hidden="true">
          <NotFoundLottie />
        </div>
        <h1 className={styles.title}>Ops, essa rota se perdeu no caminho.</h1>
        <p className={styles.description}>
          A pagina que voce tentou acessar nao existe, foi movida ou digitamos um
          endereco torto no percurso. Vamos te levar de volta para a parte boa do
          portfolio.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.button}>
            Voltar para a home
          </Link>
        </div>
      </section>
    </main>
  );
}

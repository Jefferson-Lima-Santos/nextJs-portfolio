import styles from "./page.module.css";
import Author from "../src/components/author";

export default function Home() {
  return (
    <div className={styles.page}>
      <Author />
    </div>
  );
}

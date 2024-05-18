"use client";
import { LED } from "./components/LED";
import { useUpdateLanguage } from "./hooks/useUpdateLanguage";
import styles from "./page.module.css";

export default function Home() {
  useUpdateLanguage();

  return (
    <main className={styles.main}>
      <LED />
    </main>
  );
}

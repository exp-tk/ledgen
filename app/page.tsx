"use client";
import { Form } from "./components/Form";
import { LED } from "./components/LED";
import { useUpdateLanguage } from "./hooks/useUpdateLanguage";
import styles from "./page.module.css";

export default function Home() {
  useUpdateLanguage();

  return (
    <main className={styles.main}>
      <LED />
      <Form />
    </main>
  );
}

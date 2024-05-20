"use client";
import { useRef } from "react";
import { Control } from "./components/Control";
import { Form } from "./components/Form";
import { LED } from "./components/LED";
import { useUpdateLanguage } from "./hooks/useUpdateLanguage";
import styles from "./page.module.css";

export default function Home() {
  const ledRef = useRef<HTMLDivElement | null>(null);
  const handleRequestFullscreen = () => ledRef.current?.requestFullscreen();

  useUpdateLanguage();

  return (
    <main className={styles.main}>
      <LED ref={ledRef} />
      <Control onRequestFullscreen={handleRequestFullscreen} />
      <Form />
    </main>
  );
}

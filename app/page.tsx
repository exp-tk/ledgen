"use client";
import { Form } from "./components/Form";
import { Control } from "./components/Control";
import { LED } from "./components/LED";
import { useUpdateLanguage } from "./hooks/useUpdateLanguage";
import styles from "./page.module.css";
import { useRef } from "react";

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

"use client";
import { useRef, useEffect } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { Control } from "./components/Control";
import { LED } from "./components/LED";
import { EditorPanel } from "./components/EditorPanel";
import { useUpdateLanguage } from "./hooks/useUpdateLanguage";
import { blockAtom, assignIds } from "./state/block";
import { templateKeyAtom } from "./state/template";
import { TEMPLATES } from "./state/template";
import styles from "./page.module.css";

export default function Home() {
  const ledRef = useRef<HTMLDivElement | null>(null);
  const handleRequestFullscreen = () => ledRef.current?.requestFullscreen();

  // Initialize blocks from default template
  const setBlocks = useSetAtom(blockAtom);
  const templateKey = useAtomValue(templateKeyAtom);
  useEffect(() => {
    if (templateKey !== "custom") {
      setBlocks(assignIds(TEMPLATES[templateKey].blocks));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useUpdateLanguage();

  return (
    <main className={styles.main}>
      <LED ref={ledRef} />
      <Control onRequestFullscreen={handleRequestFullscreen} />
      <EditorPanel />
    </main>
  );
}

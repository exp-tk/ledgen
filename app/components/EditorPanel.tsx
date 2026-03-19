"use client";
import { useAtom, useAtomValue } from "jotai";
import { useCallback, useRef, useState } from "react";
import { formAtom, FormAtom } from "../state/form";
import { blockAtom, assignIds, INITIAL_BLOCK_MAP, SPECIAL_BLOCK_MAP } from "../state/block";
import { TEMPLATES, templateKeyAtom, TemplateKey } from "../state/template";
import { Block } from "../constants/block";
import { nanoid } from "nanoid";
import style from "./EditorPanel.module.css";

type FieldDef = {
  key: keyof FormAtom;
  label: string;
  type?: "select";
  options?: { value: string; label: string }[];
};

const SECTIONS: { title: string; fields: FieldDef[] }[] = [
  {
    title: "走行状態",
    fields: [
      {
        key: "state",
        label: "状態",
        type: "select",
        options: [
          { value: "next", label: "次は" },
          { value: "approaching", label: "まもなく" },
          { value: "arrived", label: "ただいま" },
        ],
      },
    ],
  },
  {
    title: "列車種別",
    fields: [
      { key: "trainTypeName", label: "種別名" },
      { key: "trainTypeNameRoman", label: "種別名(英語)" },
    ],
  },
  {
    title: "路線",
    fields: [
      { key: "lineName", label: "路線名" },
      { key: "lineNameRoman", label: "路線名(ローマ字)" },
    ],
  },
  {
    title: "現在の駅",
    fields: [
      { key: "stationName", label: "駅名" },
      { key: "stationNameKana", label: "駅名(カタカナ)" },
      { key: "stationNameRoman", label: "駅名(ローマ字)" },
      { key: "stationNumber", label: "駅番号" },
    ],
  },
  {
    title: "終着駅",
    fields: [
      { key: "finalDestinationName", label: "駅名" },
      { key: "finalDestinationNameRoman", label: "駅名(ローマ字)" },
      { key: "finalDestinationNumber", label: "駅番号" },
    ],
  },
];

export const EditorPanel = () => {
  const [form, setForm] = useAtom(formAtom);
  const [templateKey, setTemplateKey] = useAtom(templateKeyAtom);
  const [blocks, setBlocks] = useAtom(blockAtom);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const updateField = useCallback(
    (key: keyof FormAtom, value: string) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    [setForm]
  );

  const handleTemplateChange = useCallback(
    (key: TemplateKey) => {
      setTemplateKey(key);
      if (key !== "custom") {
        setBlocks(assignIds(TEMPLATES[key].blocks));
      }
    },
    [setTemplateKey, setBlocks]
  );

  return (
    <div className={style.panel}>
      {/* Template selector */}
      <div className={style.templateSection}>
        <h2 className={style.sectionTitle}>テンプレート</h2>
        <div className={style.templateGrid}>
          {(
            Object.entries(TEMPLATES) as [
              Exclude<TemplateKey, "custom">,
              (typeof TEMPLATES)[Exclude<TemplateKey, "custom">],
            ][]
          ).map(([key, tmpl]) => (
            <button
              key={key}
              className={[
                style.templateCard,
                templateKey === key ? style.templateCardActive : "",
              ].join(" ")}
              onClick={() => handleTemplateChange(key)}
              type="button"
            >
              <span className={style.templateLabel}>{tmpl.label}</span>
              <span className={style.templateDesc}>{tmpl.description}</span>
            </button>
          ))}
          <button
            className={[
              style.templateCard,
              style.templateCardCustom,
              templateKey === "custom" ? style.templateCardActive : "",
            ].join(" ")}
            onClick={() => {
              handleTemplateChange("custom");
              setAdvancedOpen(true);
            }}
            type="button"
          >
            <span className={style.templateLabel}>カスタム</span>
            <span className={style.templateDesc}>自由にブロックを編集</span>
          </button>
        </div>
      </div>

      {/* Form fields */}
      {SECTIONS.map((section) => (
        <div key={section.title}>
          <h2 className={style.sectionTitle}>{section.title}</h2>
          {section.fields.map((field) => (
            <div key={field.key} className={style.fieldRow}>
              <label className={style.fieldLabel}>{field.label}</label>
              {field.type === "select" ? (
                <select
                  className={style.fieldInput}
                  value={form[field.key]}
                  onChange={(e) => updateField(field.key, e.target.value)}
                >
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className={style.fieldInput}
                  value={form[field.key]}
                  onChange={(e) => updateField(field.key, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Advanced block editor */}
      {templateKey === "custom" && (
        <AdvancedEditor
          open={advancedOpen}
          onToggle={() => setAdvancedOpen((v) => !v)}
          blocks={blocks}
          setBlocks={setBlocks}
          form={form}
        />
      )}
    </div>
  );
};

// Advanced block editor (for custom template)
const AdvancedEditor = ({
  open,
  onToggle,
  blocks,
  setBlocks,
  form,
}: {
  open: boolean;
  onToggle: () => void;
  blocks: Block[];
  setBlocks: (fn: (prev: Block[]) => Block[]) => void;
  form: FormAtom;
}) => {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const editRef = useRef<HTMLInputElement | null>(null);
  const dragNode = useRef<HTMLDivElement | null>(null);

  const visibleBlocks = blocks.filter(
    (blk) => blk.type !== "space" && blk.type !== "narrow"
  );

  const addBlock = (template: Block) => {
    setBlocks((prev) => [...prev, { ...template, id: nanoid() }]);
  };

  const removeBlock = (blockId: string) =>
    setBlocks((prev) => prev.filter((blk) => blk.id !== blockId));

  const startEditing = (blk: Block) => {
    if (blk.type !== "customText") return;
    setEditingId(blk.id ?? null);
    setEditValue(blk.value ?? "");
    requestAnimationFrame(() => editRef.current?.focus());
  };

  const commitEdit = () => {
    if (!editingId) return;
    setBlocks((prev) =>
      prev.map((blk) =>
        blk.id === editingId
          ? { ...blk, value: editValue, label: editValue }
          : blk
      )
    );
    setEditingId(null);
  };

  const resolveLabel = (blk: Block): string => {
    if (blk.type === "customText" || blk.type === "separator") return blk.label;
    if (blk.formKey) {
      const val = form[blk.formKey];
      return val ? `${blk.label}: ${val}` : blk.label;
    }
    return blk.label;
  };

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, index: number) => {
      setDragIndex(index);
      dragNode.current = e.currentTarget;
      e.dataTransfer.effectAllowed = "move";
      requestAnimationFrame(() => {
        if (dragNode.current) dragNode.current.style.opacity = "0.4";
      });
    },
    []
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>, index: number) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setDragOverIndex(index);
    },
    []
  );

  const handleDragEnd = useCallback(() => {
    if (dragNode.current) dragNode.current.style.opacity = "1";
    if (
      dragIndex !== null &&
      dragOverIndex !== null &&
      dragIndex !== dragOverIndex
    ) {
      const visibleIds = visibleBlocks.map((b) => b.id);
      const fromId = visibleIds[dragIndex];
      const toId = visibleIds[dragOverIndex];
      setBlocks((prev) => {
        const newBlocks = [...prev];
        const fromIdx = newBlocks.findIndex((b) => b.id === fromId);
        const toIdx = newBlocks.findIndex((b) => b.id === toId);
        if (fromIdx === -1 || toIdx === -1) return prev;
        const [moved] = newBlocks.splice(fromIdx, 1);
        newBlocks.splice(toIdx, 0, moved);
        return newBlocks;
      });
    }
    setDragIndex(null);
    setDragOverIndex(null);
    dragNode.current = null;
  }, [dragIndex, dragOverIndex, visibleBlocks, setBlocks]);

  const chipClass = (blk: Block, i: number) =>
    [
      style.chip,
      blk.type === "customText"
        ? style.chipCustom
        : blk.type === "separator"
          ? style.chipSeparator
          : style.chipField,
      dragOverIndex === i && dragIndex !== i ? style.chipDragOver : "",
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <div>
      <button className={style.advancedToggle} onClick={onToggle} type="button">
        ブロック編集 {open ? "▲" : "▼"}
      </button>
      {open && (
        <div className={style.advancedContent}>
          <p className={style.hint}>
            ドラッグで並び替え・ダブルクリックでテキスト編集
          </p>
          <div className={style.blocks}>
            {visibleBlocks.map((blk, i) => (
              <div
                key={blk.id}
                className={chipClass(blk, i)}
                draggable={editingId !== blk.id}
                onDragStart={(e) => handleDragStart(e, i)}
                onDragOver={(e) => handleDragOver(e, i)}
                onDragEnd={handleDragEnd}
                onDoubleClick={() => startEditing(blk)}
              >
                {editingId === blk.id ? (
                  <input
                    ref={editRef}
                    className={style.chipEdit}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={commitEdit}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitEdit();
                      if (e.key === "Escape") setEditingId(null);
                    }}
                  />
                ) : (
                  <span className={style.chipLabel}>{resolveLabel(blk)}</span>
                )}
                <button
                  className={style.chipRemove}
                  onClick={() => removeBlock(blk.id ?? "")}
                  type="button"
                >
                  ×
                </button>
              </div>
            ))}
            {visibleBlocks.length === 0 && (
              <p className={style.emptyHint}>ブロックを追加してください</p>
            )}
          </div>
          <div className={style.palette}>
            {Object.values(INITIAL_BLOCK_MAP).map((blk) => (
              <button
                key={blk.type}
                className={[
                  style.paletteItem,
                  blk.type === "customText"
                    ? style.paletteCustom
                    : style.paletteField,
                ].join(" ")}
                type="button"
                onClick={() => addBlock(blk)}
              >
                {blk.type === "customText" ? blk.label : `[ ${blk.label} ]`}
              </button>
            ))}
            <button
              className={[style.paletteItem, style.paletteSeparator].join(" ")}
              type="button"
              onClick={() => addBlock(SPECIAL_BLOCK_MAP.separator)}
            >
              スペース(大)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import { useAtom, useAtomValue } from "jotai";
import style from "./Composer.module.css";
import { INITIAL_BLOCK_MAP, blockAtom } from "../state/block";
import { BlockType } from "../constants/block";
import { SubmitHandler, useForm } from "react-hook-form";
import { nanoid } from "nanoid";

type NewBlock = {
  type: BlockType;
};

export const Composer = () => {
  const [blocks, setBlocks] = useAtom(blockAtom);

  const { register, handleSubmit } = useForm<NewBlock>();
  const onSubmit: SubmitHandler<NewBlock> = (blk) => {
    const defaultBlock = INITIAL_BLOCK_MAP[blk.type] ?? {};
    setBlocks((prev) => [
      ...prev,
      {
        ...defaultBlock,
        id: nanoid(),
      },
    ]);
  };

  const removeBlock = (blockId: string) =>
    setBlocks((prev) => prev.filter((blk) => blk.id !== blockId));

  return (
    <div className={style.container}>
      <h2>表示順序</h2>
      <div className={style.blocks}>
        {blocks
          .filter((blk) => blk.type !== "space" && blk.type !== "narrow")
          .map((blk) =>
            blk.type !== "customText" ? (
              <button key={blk.id} onClick={() => removeBlock(blk.id ?? "")}>
                [ {blk.label} ]
              </button>
            ) : (
              <button key={blk.id} onClick={() => removeBlock(blk.id ?? "")}>
                {blk.label}
              </button>
            )
          )}
      </div>
      <form className={style.addBlock} onSubmit={handleSubmit(onSubmit)}>
        <label>種類: </label>
        <select {...register("type")}>
          {Object.values(INITIAL_BLOCK_MAP).map((blk) => (
            <option key={blk.id} value={blk.type}>
              {blk.type === "customText" ? blk.label : `[ ${blk.label} ]`}
            </option>
          ))}
        </select>

        <input type="submit" />
      </form>
    </div>
  );
};

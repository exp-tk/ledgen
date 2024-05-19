import { useAtom } from "jotai";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormAtom, formAtom } from "../state/form";
import style from "./Form.module.css";

export const Form = () => {
  const [formVal, setFormVal] = useAtom(formAtom);

  const { register, handleSubmit } = useForm<FormAtom>();
  const onSubmit: SubmitHandler<FormAtom> = (data) => {
    setFormVal(data);
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={style.heading}>列車種別</h2>
      <div>
        <label>種別名:&nbsp;</label>
        <input
          defaultValue={formVal.trainTypeName}
          {...register("trainTypeName")}
        />
      </div>
      <div>
        <label>種別名(英語):&nbsp;</label>
        <input
          defaultValue={formVal.trainTypeNameRoman}
          {...register("trainTypeNameRoman")}
        />
      </div>

      <h2 className={style.heading}>路線</h2>
      <div>
        <label>路線名:&nbsp;</label>
        <input defaultValue={formVal.lineName} {...register("lineName")} />
      </div>
      <div>
        <label>路線名(ローマ字):&nbsp;</label>
        <input
          defaultValue={formVal.lineNameRoman}
          {...register("lineNameRoman")}
        />
      </div>

      <h2 className={style.heading}>現在の駅</h2>
      <div>
        <label>駅名:&nbsp;</label>
        <input
          defaultValue={formVal.stationName}
          {...register("stationName")}
        />
      </div>
      <div>
        <label>駅名(カタカナ):&nbsp;</label>
        <input
          defaultValue={formVal.stationNameKana}
          {...register("stationNameKana")}
        />
      </div>
      <div>
        <label>駅名(ローマ字):&nbsp;</label>
        <input
          defaultValue={formVal.stationNameRoman}
          {...register("stationNameRoman")}
        />
      </div>
      <div>
        <label>駅番号:&nbsp;</label>
        <input
          defaultValue={formVal.stationNumber}
          {...register("stationNumber")}
        />
      </div>

      <h2 className={style.heading}>終着駅</h2>
      <div>
        <label>駅名:&nbsp;</label>
        <input
          defaultValue={formVal.finalDestinationName}
          {...register("finalDestinationName")}
        />
      </div>
      <div>
        <label>駅名(ローマ字):&nbsp;</label>
        <input
          defaultValue={formVal.finalDestinationNameRoman}
          {...register("finalDestinationNameRoman")}
        />
      </div>
      <div>
        <label>駅番号:&nbsp;</label>
        <input
          defaultValue={formVal.finalDestinationNumber}
          {...register("finalDestinationNumber")}
        />
      </div>
      <input className={style.submit} type="submit" />
    </form>
  );
};

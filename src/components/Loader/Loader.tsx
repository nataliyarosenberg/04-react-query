import style from "./Loader.module.css";
import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className={style.backdrop}>
      <ClipLoader
        color="fff"
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

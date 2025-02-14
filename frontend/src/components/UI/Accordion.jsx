import classes from "./Accordion.module.css";
import { IoIosArrowDown } from "react-icons/io";

export default function Accordion({
  tag,
  id,
  children,
  fontSize = null,
  margin = null,
  topHr = true,
}) {
  return (
    <div>
      {topHr && <hr />}
      <input id={id} type="checkbox" className={classes["accordion-toggle"]} />
      <label
        htmlFor={id}
        className={`${classes["accordion-header"]} ${margin}`}
      >
        <div className="flex flex-row justify-between items-center">
          <span className={`font-500 ${fontSize}`}>{tag}</span>
          <IoIosArrowDown size="1.2rem" className={classes.icon} />
        </div>
      </label>

      <div className={`${classes["accordion-content"]} gap-1 relative`}>
        {children}
        <div className={`${fontSize ? "py-3" : "py-2"}`}></div>
      </div>
      {!topHr && <hr />}
    </div>
  );
}

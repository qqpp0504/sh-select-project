/* eslint-disable react/prop-types */
import "./Accordion.css";
import showIcon from "@/assets/show-icon.png";

export default function Accordion({
  tag,
  id,
  children,
  fontSize = null,
  margin = null,
}) {
  return (
    <div>
      {!fontSize && <hr />}
      <input id={id} type="checkbox" className="accordion-toggle" />
      <label htmlFor={id} className={`accordion-header ${margin}`}>
        <div className="flex flex-row justify-between items-center">
          <span className={`font-500 ${fontSize}`}>{tag}</span>
          <img src={showIcon} alt="Show more icon" className="w-4 h-4" />
        </div>
      </label>

      <div className="accordion-content gap-1 relative">
        {children}
        <div className={`${fontSize ? "py-3" : "py-2"}`}></div>
      </div>
      {fontSize && <hr />}
    </div>
  );
}

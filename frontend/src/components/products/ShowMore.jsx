import classes from "./ShowMore.module.css";

export default function ShowMore({ id, content, more }) {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        className={`${classes["show-more-checkbox"]} hidden`}
      />
      <div className={`${classes["filter-content"]} flex flex-col`}>
        {content}

        <div className={`${classes["more-content"]} flex flex-col`}>{more}</div>

        <label htmlFor={id} className={classes["show-more-label"]} />
      </div>
    </>
  );
}

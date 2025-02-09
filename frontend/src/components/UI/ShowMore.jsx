import classes from "./ShowMore.module.css";

export default function ShowMore({ content, more }) {
  return (
    <>
      <input
        type="checkbox"
        id="show-more"
        className={`${classes["show-more-checkbox"]} hidden`}
      />
      <div className={`${classes["filter-content"]} flex flex-col`}>
        {content}

        <div className={`${classes["more-content"]} flex flex-col`}>{more}</div>

        <label htmlFor="show-more" className={classes["show-more-label"]} />
      </div>
    </>
  );
}

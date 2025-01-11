/* eslint-disable react/prop-types */
import "./ShowMore.css";

export default function ShowMore({ content, more }) {
  return (
    <>
      <input
        type="checkbox"
        id="show-more"
        className="show-more-checkbox hidden"
      />
      <div className="filter-content flex flex-col">
        {content}

        <div className="more-content flex flex-col">{more}</div>

        <label htmlFor="show-more" className="show-more-label" />
      </div>
    </>
  );
}

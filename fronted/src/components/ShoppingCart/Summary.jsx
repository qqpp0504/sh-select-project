/* eslint-disable react/prop-types */
export default function Summary({ tag, price }) {
  return (
    <div className="flex justify-between my-4">
      <span>{tag}</span>
      <span>{price}</span>
    </div>
  );
}

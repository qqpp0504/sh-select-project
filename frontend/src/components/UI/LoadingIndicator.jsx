/* eslint-disable react/prop-types */
export default function LoadingIndicator({
  color = "black",
  margin = "my-20",
  size = "w-10 h-10",
}) {
  let borderStyle;

  if (color === "black") {
    borderStyle = `border-black ${size}`;
  } else if (color === "white") {
    borderStyle = "border-white w-6 h-6";
  }

  return (
    <div className={`flex justify-center ${margin}`}>
      <div
        className={`border-2 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin ${borderStyle}`}
      ></div>
    </div>
  );
}

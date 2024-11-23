// eslint-disable-next-line react/prop-types
export default function Button({ children, bgColor = "black" }) {
  let classes = "my-6 px-4 py-[0.375rem] inline-block rounded-3xl";

  if (bgColor == "white") {
    classes += " bg-white text-black";
  } else if (bgColor == "black") {
    classes += " bg-black text-white";
  }

  return <p className={classes}>{children}</p>;
}

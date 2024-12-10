// eslint-disable-next-line react/prop-types
export default function Button({ children, bgColor = "black" }) {
  let classes = "px-4 py-[0.375rem] inline-block rounded-3xl";

  if (bgColor == "white") {
    classes += " bg-white text-black hover:bg-white-hoverColor";
  } else if (bgColor == "black") {
    classes += " bg-black text-white hover:bg-black-hoverColor";
  }

  return <span className={classes}>{children}</span>;
}

/* eslint-disable react/prop-types */
export default function Button({
  children,
  bgColor = "black",
  paddingStyle = "px-4 py-[0.375rem]",
}) {
  let classes = `inline-block rounded-3xl ${paddingStyle}`;

  if (bgColor === "white") {
    classes += " bg-white text-black hover:bg-white-hoverColor";
  } else if (bgColor === "black") {
    classes += " bg-black text-white hover:bg-black-hoverColor";
  } else if (bgColor === "checkoutWhite") {
    classes +=
      " bg-white text-black border-[1px] border-gray-300 hover:bg-gray-100";
  }

  return <span className={classes}>{children}</span>;
}

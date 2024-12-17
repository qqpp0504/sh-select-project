/* eslint-disable react/prop-types */
export default function FeatureButton({
  children,
  type = "button",
  bgColor = "black",
  className = "",
  ...props
}) {
  let classes = ` rounded-full w-full py-[1.2rem] ${className}`;

  if (bgColor === "black") {
    classes += " bg-black text-white border-[1.5px] hover:bg-black-hoverColor";
  } else if (bgColor === "white") {
    classes += " text-black border-[1.5px] border-gray-300 hover:border-black";
  } else if (bgColor === "gray") {
    classes += " text-gray bg-gray-100";
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}

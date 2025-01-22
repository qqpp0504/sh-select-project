import { Link } from "react-router-dom";

export default function Button({
  children,
  bgColor = "black",
  paddingStyle = "px-4 py-[0.375rem]",
  link = null,
  className,
  ...props
}) {
  let classes = `inline-block rounded-3xl ${paddingStyle} ${className}`;

  if (bgColor === "white") {
    classes += " bg-white text-black hover:bg-white-hoverColor";
  } else if (bgColor === "black") {
    classes += " bg-black text-white hover:bg-black-hoverColor";
  } else if (bgColor === "checkoutWhite") {
    classes +=
      " bg-white text-black border-[1px] border-gray-300 hover:bg-gray-100";
  } else if (bgColor === "gray") {
    classes += " bg-gray-100 hover:bg-gray-200";
  } else if (bgColor === "favoriteWhite") {
    classes +=
      " bg-white rounded-[1.2rem] text-black border-[1px] border-gray-300 hover:border-gray-400 transition-all duration-150";
  }

  if (link) {
    return (
      <Link to={link} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

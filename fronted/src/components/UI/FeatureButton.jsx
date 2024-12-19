/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function FeatureButton({
  children,
  type = "button",
  bgColor = "black",
  className = "",
  paddingStyle = "py-[1.2rem]",
  link = null,
  ...props
}) {
  let classes = ` rounded-full w-full ${paddingStyle} ${className}`;

  if (bgColor === "black") {
    classes +=
      " bg-black text-white border-[1.5px] text-center hover:bg-black-hoverColor";
  } else if (bgColor === "white") {
    classes +=
      " text-black border-[1.5px] border-gray-300 text-center hover:border-black";
  } else if (bgColor === "gray") {
    classes += " text-gray bg-gray-100 text-center";
  } else if (bgColor === "checkoutWhite") {
    classes +=
      " text-black border-[1.5px] text-left px-6 py-6 rounded-xl flex items-center gap-4";
  }

  let content = (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );

  if (bgColor === "gray") {
    content = (
      <button type={type} className={classes} disabled>
        {children}
      </button>
    );
  }

  if (link && bgColor !== "gray") {
    content = (
      <Link to={link} type={type} className={classes}>
        {children}
      </Link>
    );
  }

  return content;
}

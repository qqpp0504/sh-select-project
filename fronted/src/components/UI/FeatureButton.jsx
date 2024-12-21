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
  let classes = ` rounded-full ${paddingStyle} ${className}`;

  if (bgColor === "black") {
    classes +=
      " bg-black text-white border-[1.5px] text-center hover:bg-black-hoverColor w-full";
  } else if (bgColor === "white") {
    classes +=
      " text-black border-[1.5px] border-gray-300 text-center hover:border-black w-full";
  } else if (bgColor === "gray") {
    classes += " text-gray bg-gray-100 text-center w-full";
  } else if (bgColor === "checkoutWhite") {
    classes +=
      " text-black border-[1.5px] text-left px-6 py-6 rounded-xl flex items-center gap-4";
  } else if (bgColor === "accountBlack") {
    classes += "bg-black text-white px-6";
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
      <Link to={link} className={classes}>
        {children}
      </Link>
    );
  }

  return content;
}

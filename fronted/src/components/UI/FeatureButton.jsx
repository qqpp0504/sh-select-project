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
  let classes = ` rounded-full w-full text-center ${paddingStyle} ${className}`;

  if (bgColor === "black") {
    classes += " bg-black text-white border-[1.5px] hover:bg-black-hoverColor";
  } else if (bgColor === "white") {
    classes += " text-black border-[1.5px] border-gray-300 hover:border-black";
  } else if (bgColor === "gray") {
    classes += " text-gray bg-gray-100";
  }

  let content = (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );

  if (link) {
    content = (
      <Link to={link} type={type} className={classes}>
        {children}
      </Link>
    );
  }

  return content;
}

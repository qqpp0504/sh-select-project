import { Link } from "react-router-dom";

export default function Button({
  children,
  variant = "black",
  size = "md",
  link = null,
  className = "",
  ...props
}) {
  const baseStyles = "inline-block rounded-3xl transition-all duration-150";

  const variantStyles = {
    black: "bg-black text-white hover:bg-black-hoverColor",
    white: "bg-white text-black hover:bg-white-hoverColor",
    checkoutWhite:
      "bg-white text-black border border-gray-300 hover:bg-gray-100",
    gray: "bg-gray-100 hover:bg-gray-200",
    favoriteWhite:
      "bg-white text-black border border-gray-300 rounded-[1.2rem] hover:border-gray-400",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-[0.375rem] text-base",
    lg: "px-6 py-2",
  };

  const classes = `${baseStyles} ${variantStyles[variant] || ""} ${
    sizeStyles[size] || ""
  } ${className}`;

  if (link) {
    return (
      <Link to={link} className={classes} {...props}>
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

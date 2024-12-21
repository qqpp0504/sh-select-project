/* eslint-disable react/prop-types */
export default function Input({ children = null, className, ...props }) {
  let defaultTextClassName = "absolute text-xs text-gray left-4 bottom-[-19px]";
  let inputClass = "border-gray-300 rounded-[0.3rem]";

  if (className === "greenPoint") {
    defaultTextClassName =
      "absolute bg-green-600 rounded-full w-2 h-2 right-4 top-1/2 -translate-y-1/2";
  }

  if (className === "accountInput") {
    inputClass = "border-gray-500 rounded-lg";
  }

  return (
    <div className="relative">
      <input
        className={`w-full px-4 py-[0.9rem] border-[1px] outline-none hover:border-black ${inputClass} ${className}`}
        {...props}
      />
      {children && <p className={defaultTextClassName}>{children}</p>}
    </div>
  );
}

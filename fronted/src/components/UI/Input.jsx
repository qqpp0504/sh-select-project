/* eslint-disable react/prop-types */
export default function Input({
  children = null,
  placeholderText,
  error,
  errorText,
  errorTextStyle,
  value,
  className,
  ...props
}) {
  let defaultTextClassName = "absolute text-xs text-gray left-4 bottom-[-19px]";
  let inputClass = "border-gray-300 rounded-[0.3rem]";
  let defaultErrorTextClass = "absolute left-4 bottom-[-21px]";

  if (className === "greenPoint") {
    defaultTextClassName =
      "absolute bg-green-600 rounded-full w-2 h-2 right-4 top-1/2 -translate-y-1/2";
  }

  let defaultErrorText = "必填";
  if (errorText) {
    defaultErrorText = errorText;
  }

  if (errorTextStyle === "password") {
    defaultErrorTextClass = "pl-4 pt-[0.3rem]";
  }

  return (
    <div className="relative">
      <input
        value={value}
        className={`w-full px-4 py-[0.9rem] border-[1px] outline-none peer hover:border-black ${inputClass} ${className} ${
          error
            ? "border-red-600 rounded-lg hover:border-red-600"
            : "border-gray-500 rounded-lg"
        }`}
        placeholder=" "
        {...props}
      />
      <label
        value={value}
        className={`${error ? "text-red-600" : "text-gray"} ${
          value ? "top-[-10px] px-1" : undefined
        } absolute left-4 transition-all duration-200 text-red-60 bg-white pointer-events-none peer-placeholder-shown:top-4 peer-focus:top-[-10px] peer-focus:px-1`}
      >
        {placeholderText}
      </label>
      {error && !value && (
        <p
          className={`text-red-600 text-xs font-light ${defaultErrorTextClass}`}
        >
          {defaultErrorText}
        </p>
      )}
      {children && <p className={defaultTextClassName}>{children}</p>}
    </div>
  );
}

/* eslint-disable react/prop-types */
export default function SelectBlock({
  onSelect = null,
  id,
  value,
  name,
  defaultChecked = false,
  roundedStyle = "rounded-[0.25rem]",
  className = "",
  children,
  ...props
}) {
  return (
    <div onClick={onSelect} className="cursor-pointer">
      <input
        type="radio"
        id={id}
        value={value}
        name={name}
        className="hidden peer"
        defaultChecked={defaultChecked}
        {...props}
      />
      <label
        htmlFor={id}
        className={`cursor-pointer block p-3 border-[1px] border-gray-200 hover:border-black peer-checked:border-black ${roundedStyle} ${className}`}
      >
        {children}
      </label>
    </div>
  );
}

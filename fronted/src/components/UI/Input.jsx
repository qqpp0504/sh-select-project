import Icon from "./Icon.jsx";

export default function Input() {
  return (
    <div className="relative w-[33%]">
      <div className="absolute bottom-[0.375rem] left-2">
        <Icon type="search" />
      </div>
      <input
        type="text"
        placeholder="搜尋"
        className="bg-gray-100 rounded-3xl placeholder-gray-500 px-10 py-2 w-[100%] h-9"
      />
    </div>
  );
}

import searchIcon from "../../assets/search-icon.png";

export default function SearchInput() {
  return (
    <div className="relative w-[33%] group">
      <div className="absolute rounded-3xl p-[0.5rem] bg-gray-100 hover:bg-white-hoverColor">
        <img src={searchIcon} alt="Search icon" className="w-5" />
      </div>
      <input
        type="text"
        placeholder="搜尋"
        className="bg-gray-100 rounded-3xl placeholder-gray-500 px-10 py-2 w-[100%] h-9 outline-none group-hover:bg-gray-200"
      />
    </div>
  );
}

import classes from "./Select.module.css";
import showIcon from "@/assets/show-icon.png";

const CITIES = [
  "臺北市",
  "新北市",
  "基隆市",
  "桃園市",
  "新竹市",
  "新竹縣",
  "臺中市",
  "苗栗縣",
  "彰化縣",
  "南投縣",
  "雲林縣",
  "臺南市",
  "高雄市",
  "嘉義市",
  "嘉義縣",
  "屏東縣",
  "宜蘭縣",
  "花蓮縣",
  "臺東縣",
  "澎湖縣",
  "金門縣",
  "連江縣",
];

export default function Select({ userSelect }) {
  return (
    <div className="relative">
      <select
        value={userSelect.value}
        id="city"
        name="city"
        onChange={userSelect.handleInputChange}
        onBlur={userSelect.handleInputBlur}
        className={`${
          classes.select
        } w-full px-4 py-[0.9rem] rounded-lg outline-none border-[1px] ${
          userSelect.value ? "text-black" : "text-gray"
        } ${
          userSelect.hasError
            ? "border-red-600 hover:border-red-600"
            : "border-gray-500 hover:border-black"
        }`}
      >
        <option value="" disabled>
          縣市
        </option>
        {CITIES.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <div className="absolute top-1/2 -translate-y-1/2 right-3 w-5">
        <img src={showIcon} alt="Show icon" />
      </div>
      <div
        className={`absolute top-[-7px] text-xs left-4 px-1 text-gray bg-white ${
          userSelect.value ? "block" : "hidden"
        }`}
      >
        縣市
      </div>
    </div>
  );
}

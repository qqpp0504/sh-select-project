import { Link } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";

export default function DetailDropdownNav({
  selectedOption,
  setSelectedOption,
  onClose,
}) {
  return (
    <div
      className={`absolute w-full p-5 transition-all duration-300 ${
        selectedOption ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center mb-10">
        <button
          onClick={() => setSelectedOption(null)}
          className="flex items-center gap-3"
        >
          <GoChevronLeft />
          <div>全部</div>
        </button>
        <button
          onClick={onClose}
          className="hover:bg-gray-200 p-1 rounded-full"
        >
          <IoCloseOutline size="1.7rem" />
        </button>
      </div>

      <div className="px-3 pb-20">
        {selectedOption && (
          <>
            <Link to={selectedOption.link} onClick={onClose}>
              <h2 className="text-2xl font-500 mb-5">{selectedOption.label}</h2>
            </Link>

            <ul>
              {Object.entries(selectedOption.items).map(([key, value]) => (
                <li key={key} className="flex flex-col gap-3">
                  <div className="font-500 text-lg mt-3">{key}</div>
                  {value.map(({ item, link }) => (
                    <Link
                      key={item}
                      to={link}
                      onClick={onClose}
                      className="text-gray hover:text-black"
                    >
                      {item}
                    </Link>
                  ))}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

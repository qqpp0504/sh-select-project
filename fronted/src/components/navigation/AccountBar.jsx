import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountBar() {
  const { isShowingNotification } = useSelector((state) => state.cart);

  function handlePreventDefault(event) {
    if (isShowingNotification) {
      event.preventDefault();
    }
  }

  return (
    <div className="flex justify-between text-xs bg-gray-100 px-12 py-2">
      <h2 className="uppercase">SH Select</h2>
      <nav>
        <ul className="flex flex-row">
          <li className="border-solid border-r-1 border-black px-3 hover:text-gray">
            <Link to="/" onClick={handlePreventDefault}>
              協助
            </Link>
          </li>
          <li className="border-solid border-r-1 border-black px-3 hover:text-gray">
            <Link to="/membership" onClick={handlePreventDefault}>
              加入
            </Link>
          </li>
          <li className="pl-3 hover:text-gray-500">
            <Link to="/accounts" onClick={handlePreventDefault}>
              登入
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

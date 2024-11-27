import { Link } from "react-router-dom";

export default function AccountBar() {
  return (
    <div className="flex justify-between text-xs bg-gray-100 px-12 py-2">
      <h2 className="uppercase">SH Select</h2>
      <nav>
        <ul className="flex flex-row">
          <li className="border-solid border-r-1 border-black px-3 hover:text-gray">
            <Link to="/">協助</Link>
          </li>
          <li className="border-solid border-r-1 border-black px-3 hover:text-gray">
            <Link to="/">加入</Link>
          </li>
          <li className="pl-3 hover:text-gray-500">
            <Link to="/">登入</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function SexClassNavigation({ sex }) {
  const listClasses = "hover:text-gray transition-all duration-200 ease-in-out";

  return (
    <div className="padding-large my-8 flex flex-row items-center">
      <div className="flex-1 flex justify-start">
        <h2 className="text-2xl font-500">{sex == "men" ? "男款" : "女款"}</h2>
      </div>

      <div className="flex-1 flex justify-center">
        <ul className="flex flex-row gap-8">
          <Link to={sex == "men" ? "/men" : "/female"}>
            <li className={listClasses}>服裝</li>
          </Link>
          <Link to={sex == "men" ? "/men" : "/female"}>
            <li className={listClasses}>鞋款</li>
          </Link>
          <Link to={sex == "men" ? "/men" : "/female"}>
            <li className={listClasses}>其他配件</li>
          </Link>
        </ul>
      </div>

      <div className="flex-1 flex justify-end"></div>
    </div>
  );
}

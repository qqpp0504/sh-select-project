import { Link } from "react-router-dom";

import ScrollContainer from "../UI/ScrollContainer.jsx";

export default function newProducts({ products }) {
  return (
    <ScrollContainer title="新上架">
      {products.map((product) => (
        <li
          key={product.title}
          className="w-[25rem] h-[32rem] relative flex-shrink-0"
        >
          <Link to="/">
            <div className="bg-gray-100 flex justify-center items-center h-[85%] rounded-xl">
              <img
                src={`http://localhost:3000/${product.image}`}
                alt={product.alt}
                className="w-[90%] h-[80%] object-cover object-bottom"
              />
            </div>

            <div className="mt-10">
              <h2 className="text-black text-xl font-500">{product.title}</h2>
            </div>
          </Link>
        </li>
      ))}
    </ScrollContainer>
  );
}

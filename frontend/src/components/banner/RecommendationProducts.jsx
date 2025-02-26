import { Link } from "react-router-dom";

import ScrollContainer from "./ScrollContainer.jsx";
import { currencyFormatter } from "@/util/formatting.js";

const API_URL = import.meta.env.VITE_API_URL;

export default function RecommendationProducts({ products }) {
  return (
    <ScrollContainer title="推薦單品">
      {products.map((product) => (
        <Link key={product.name} to={`/products/${product.slug}`}>
          <li className="w-[27rem] h-[34rem] flex-shrink-0">
            <div className="bg-gray-100 flex justify-center items-center h-[83%]">
              <img
                src={`${API_URL}/${product.image}`}
                alt={product.alt}
                className="w-[90%] h-[80%] object-cover"
              />
            </div>

            <div className="mt-3">
              <h2 className="text-gray text-base font-400">
                {product.brand} -{" "}
              </h2>
              <h2 className="text-black text-lg font-400 my-1">
                {product.name}
              </h2>
              <span>NT{currencyFormatter.format(product.price)}</span>
            </div>
          </li>
        </Link>
      ))}
    </ScrollContainer>
  );
}

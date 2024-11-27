/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import ScrollContainer from "../UI/ScrollContainer.jsx";

export default function NewSelectedProducts({
  products,
  sectionTitle = "新品和精選",
}) {
  return (
    <ScrollContainer title={sectionTitle}>
      {products.map((product) => (
        <Link key={product.title} to="/men">
          <li className="w-[27rem] h-[34rem] relative flex-shrink-0">
            <img
              src={`http://localhost:3000/${product.image}`}
              alt={product.alt}
              className="w-full h-full object-cover object-bottom"
            />

            <h2 className="my-9 text-xl font-400">{product.title}</h2>
          </li>
        </Link>
      ))}
    </ScrollContainer>
  );
}

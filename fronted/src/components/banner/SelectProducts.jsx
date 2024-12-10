/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import Button from "../UI/Button.jsx";
import ScrollContainer from "../UI/ScrollContainer.jsx";

export default function SelectedProducts({ products, sectionTitle }) {
  return (
    <ScrollContainer title={sectionTitle}>
      {products.map((product) => (
        <li
          key={product.title}
          className="w-[27rem] h-[34rem] relative flex-shrink-0"
        >
          <img
            src={`http://localhost:3000/${product.image}`}
            alt={product.alt}
            className="w-full h-full object-cover object-bottom"
          />

          <div className="absolute bottom-12 left-12">
            <h2 className="text-white text-xl font-400 mb-6">
              {product.title}
            </h2>
            <Link to="/">
              <Button bgColor="white">立即選購</Button>
            </Link>
          </div>
        </li>
      ))}
    </ScrollContainer>
  );
}

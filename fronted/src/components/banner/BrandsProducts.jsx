/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import Button from "../UI/Button.jsx";
import ScrollContainer from "../UI/ScrollContainer.jsx";

export default function SelectedProducts({ products }) {
  return (
    <ScrollContainer title="依品牌選購">
      {products.map((product) => (
        <li
          key={product.title}
          className="w-[27rem] h-[20rem] relative flex-shrink-0"
        >
          <img
            src={`http://localhost:3000/${product.image}`}
            alt={product.alt}
            className="w-full h-full object-cover"
          />
          <Link to="/">
            <div className="absolute bottom-1 left-12">
              <Button bgColor="white">{product.title}</Button>
            </div>
          </Link>
        </li>
      ))}
    </ScrollContainer>
  );
}

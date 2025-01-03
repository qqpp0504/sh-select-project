/* eslint-disable react/prop-types */
import Button from "../UI/Button.jsx";
import ScrollContainer from "../UI/ScrollContainer.jsx";

export default function BrandsProducts({ products }) {
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

          <div className="absolute bottom-5 left-12">
            <Button link={product.link} bgColor="white">
              {product.title}
            </Button>
          </div>
        </li>
      ))}
    </ScrollContainer>
  );
}

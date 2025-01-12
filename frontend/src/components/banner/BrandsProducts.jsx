import Button from "../UI/Button.jsx";
import ScrollContainer from "../UI/ScrollContainer.jsx";
import { BRANDS } from "../../data.js";

export default function BrandsProducts() {
  return (
    <ScrollContainer title="依品牌選購">
      {BRANDS.map((brand) => (
        <li
          key={brand.title}
          className="w-[27rem] h-[20rem] relative flex-shrink-0"
        >
          <img
            src={brand.image}
            alt={brand.alt}
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-5 left-12">
            <Button link={brand.link} bgColor="white">
              {brand.title}
            </Button>
          </div>
        </li>
      ))}
    </ScrollContainer>
  );
}

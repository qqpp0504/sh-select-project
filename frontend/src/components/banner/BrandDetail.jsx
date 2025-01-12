/* eslint-disable react/prop-types */
import "./BrandDetail.css";
import Button from "../UI/Button.jsx";

export default function BrandDetail({ brand }) {
  return (
    <li className="brand w-full">
      <div className="flex gap-8">
        <div className="w-[30%] h-[20rem] rounded-2xl overflow-hidden">
          <img
            src={brand.image}
            alt={brand.alt}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-[40rem] flex flex-col gap-3">
          <h2 className="text-3xl font-500">{brand.title}</h2>
          <p className="leading-7">{brand.description}</p>
          <Button className="w-fit mt-10" link={brand.link}>
            前往選購
          </Button>
        </div>
      </div>
    </li>
  );
}

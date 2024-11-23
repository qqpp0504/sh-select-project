/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Button from "../UI/Button.jsx";
import Icon from "../UI/Icon.jsx";

export default function Products({ products }) {
  return (
    <section className="my-16">
      <div className="padding-large flex items-center justify-between">
        <h2 className="text-2xl font-500">精選</h2>
        <div>
          <button className="bg-gray-200 p-[0.875rem] rounded-[50%] mr-[0.625rem] opacity-40">
            <Icon type="left-arrow" />
          </button>
          <button className="bg-gray-200 p-[0.875rem] rounded-[50%]">
            <Icon type="right-arrow" />
          </button>
        </div>
      </div>

      <article className="mx-2 my-3">
        <ul className="flex flex-row gap-3 overflow-x-auto scrollbar-thin pb-8 px-10">
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
              <div className="absolute bottom-7 left-12">
                <h2 className="text-white text-xl font-400">{product.title}</h2>
                <Link to="/">
                  <Button bgColor="white">立即選購</Button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

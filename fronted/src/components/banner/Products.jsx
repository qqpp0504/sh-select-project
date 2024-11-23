import Icon from "../UI/Icon.jsx";

export default function Products({ productImage, productTitle }) {
  return (
    <section className="padding-large my-16">
      <div className="flex items-center justify-between">
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
      <article>
        <img src={productImage} />
        <h3>{productTitle}</h3>
      </article>
    </section>
  );
}

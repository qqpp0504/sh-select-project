import { currencyFormatter } from "@/util/formatting.js";

export default function ProductHeader({ product }) {
  return (
    <div>
      <h1 className="text-lg lg:text-xl font-500">
        {product.brand} - {product.name}
      </h1>
      <h2 className="text-gray">{product.categoryCh}</h2>
      <div className="my-2 flex gap-2 font-500">
        <span>NT{currencyFormatter.format(product.originalPrice)}</span>
        {product.originalPrice !== product.discountPrice && (
          <>
            <s className="text-gray">
              NT{currencyFormatter.format(product.discountPrice)}
            </s>
            <span className="text-green-700">
              {product.discountPercentage}% 折扣
            </span>
          </>
        )}
      </div>
    </div>
  );
}

import Button from "../UI/Button.jsx";
import ScrollContainer from "./ScrollContainer.jsx";

export default function SelectedProducts({ products, sectionTitle }) {
  return (
    <ScrollContainer title={sectionTitle}>
      {products.map((product) => (
        <li
          key={product.title}
          className="w-full max-w-[27rem] min-w-[20rem] aspect-[4/5] relative flex-shrink-0"
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

            <Button link={`/products/${product.slug}`} variant="white">
              立即選購
            </Button>
          </div>
        </li>
      ))}
    </ScrollContainer>
  );
}

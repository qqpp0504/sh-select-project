import SideBar from "../components/products/SideBar.jsx";
import ProductFilter from "../components/products/ProductFilter.jsx";
import ProductCategoryData from "../components/products/ProductCategoryData.jsx";

export default function ProductsPage() {
  return (
    <>
      <SideBar>
        <ProductFilter />
        <ProductCategoryData />
      </SideBar>
    </>
  );
}

import SideBar from "../components/UI/SideBar.jsx";
import ProductsList from "../components/products/ProductsList.jsx";

export default function ProductsPage() {
  return (
    <>
      <SideBar title="所有產品">
        <ProductsList />
      </SideBar>
    </>
  );
}

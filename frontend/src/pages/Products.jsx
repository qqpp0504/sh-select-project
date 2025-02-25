import SideBar from "@/components/products/SideBar.jsx";
import ProductCategoryData from "@/components/products/ProductCategoryData.jsx";
import SEO from "@/components/SEO.jsx";

export default function ProductsPage() {
  return (
    <>
      <SEO description="立即查看 SH SELECT 商品的詳細介紹，並享受獨家優惠，讓您輕鬆擁有時尚與品質兼具的服飾！" />
      <SideBar>
        <ProductCategoryData />
      </SideBar>
    </>
  );
}

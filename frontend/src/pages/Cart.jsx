import CartOverview from "@/components/shoppingCart/CartOverview.jsx";
import SEO from "@/components/SEO.jsx";

export default function CartPage() {
  return (
    <>
      <SEO
        title="購物車。SH SELECT"
        description="查看您的購物車，隨時檢視選購的商品，並輕鬆結帳，讓購物變得更方便！"
      />
      <CartOverview />
    </>
  );
}

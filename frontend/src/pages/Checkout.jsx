import CheckoutNav from "@/components/checkout/CheckoutNav.jsx";
import CheckoutOverview from "@/components/checkout/CheckoutOverview.jsx";
import ShippingModal from "@/components/checkout/ShippingModal.jsx";
import SEO from "@/components/SEO.jsx";

export default function CheckoutPage() {
  return (
    <>
      <SEO
        title="結帳。SH SELECT"
        description="安全快速的結帳頁面，輕鬆完成您的購物，確保您擁有最佳的購物體驗！"
      />
      <header>
        <ShippingModal />
        <CheckoutNav />
      </header>
      <main>
        <CheckoutOverview />
      </main>
    </>
  );
}

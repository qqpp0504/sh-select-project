import CheckoutNav from "@/components/checkout/CheckoutNav.jsx";
import CheckoutOverview from "@/components/checkout/CheckoutOverview.jsx";
import ShippingModal from "@/components/checkout/ShippingModal.jsx";

export default function CheckoutPage() {
  return (
    <>
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

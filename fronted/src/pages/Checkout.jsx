import CheckoutNav from "../components/checkout/checkoutNav.jsx";
import CheckoutOverview from "../components/checkout/CheckoutOverview.jsx";

export default function CheckoutPage() {
  return (
    <>
      <header>
        <CheckoutNav />
      </header>
      <main>
        <CheckoutOverview />
      </main>
    </>
  );
}

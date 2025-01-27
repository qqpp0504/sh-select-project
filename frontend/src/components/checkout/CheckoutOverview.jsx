import ShippingInformation from "./ShippingInformation.jsx";
import OrderSummary from "./OrderSummary.jsx";
import SuccessSendOrdersModal from "./SuccessSendOrdersModal.jsx";

export default function CheckoutOverview() {
  return (
    <section className="mt-7">
      <div className="flex justify-center">
        <div className="flex justify-center flex-wrap max-w-[70rem] w-full gap-32">
          <SuccessSendOrdersModal />
          <ShippingInformation />
          <OrderSummary />
        </div>
      </div>
    </section>
  );
}

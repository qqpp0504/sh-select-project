import ShippingInformation from "./ShippingInformation.jsx";
import OrderSummary from "./OrderSummary.jsx";
import SuccessSendOrdersModal from "./SuccessSendOrdersModal.jsx";
import OrderAccordion from "./OrderAccordion.jsx";
import OrderProgress from "./OrderProgress.jsx";

export default function CheckoutOverview() {
  return (
    <section className="lg:mt-7">
      <div className="flex justify-center">
        <SuccessSendOrdersModal />
        <div className="padding-small w-full max-w-[38rem] mx-auto flex flex-col items-center lg:flex-row lg:justify-center lg:items-start lg:max-w-[70rem] lg:gap-32">
          <OrderAccordion />

          <div className="w-full py-8 lg:hidden">
            <OrderProgress />
          </div>

          <ShippingInformation />
          <div className="hidden lg:block">
            <OrderSummary />
          </div>
        </div>
      </div>
    </section>
  );
}

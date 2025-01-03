import { useParams } from "react-router-dom";

import ReturnsPolicy from "../components/Help/questionAnswer/ReturnsPolicy.jsx";
import HowToReturn from "../components/Help/questionAnswer/HowToReturn.jsx";
import RefundInfo from "../components/Help/questionAnswer/RefundInfo.jsx";
import ShippingDelivery from "../components/Help/questionAnswer/ShippingDelivery.jsx";
import FreeShipping from "../components/Help/questionAnswer/FreeShipping.jsx";
import InternationalShipping from "../components/Help/questionAnswer/InternationalShipping.jsx";
import OrderTracking from "../components/Help/questionAnswer/OrderTracking.jsx";
import ChangeCancelOrder from "../components/Help/questionAnswer/ChangeCancelOrder.jsx";

export default function HelpQuestionPage() {
  const { questionId } = useParams();

  let content;
  switch (questionId) {
    case "refund-policy":
      content = <ReturnsPolicy />;
      break;
    case "how-to-return":
      content = <HowToReturn />;
      break;
    case "refund-info":
      content = <RefundInfo />;
      break;
    case "shipping-delivery":
      content = <ShippingDelivery />;
      break;
    case "free-shipping":
      content = <FreeShipping />;
      break;
    case "international-shipping":
      content = <InternationalShipping />;
      break;
    case "order-tracking":
      content = <OrderTracking />;
      break;
    case "change-cancel-order":
      content = <ChangeCancelOrder />;
      break;
  }

  return <section className="max-w-[40rem] w-full">{content}</section>;
}

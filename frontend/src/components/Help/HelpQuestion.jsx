import { useParams } from "react-router-dom";

import ReturnsPolicy from "./questionAnswer/ReturnsPolicy.jsx";
import HowToReturn from "./questionAnswer/HowToReturn.jsx";
import RefundInfo from "./questionAnswer/RefundInfo.jsx";
import ShippingDelivery from "./questionAnswer/ShippingDelivery.jsx";
import FreeShipping from "./questionAnswer/FreeShipping.jsx";
import InternationalShipping from "./questionAnswer/InternationalShipping.jsx";
import OrderTracking from "./questionAnswer/OrderTracking.jsx";
import ChangeCancelOrder from "./questionAnswer/ChangeCancelOrder.jsx";
import SEO from "../SEO.jsx";
import FAQDATA from "@/faqData.js";

export default function HelpQuestion() {
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

  const allQuestions = FAQDATA.flatMap((category) => category.questions);
  const currentQuestion = allQuestions.find(
    (question) => question.id === questionId
  );

  return (
    <>
      <SEO
        title={currentQuestion.question}
        description={currentQuestion.question}
      />
      <section className="px-3 max-w-[40rem] w-full">{content}</section>
    </>
  );
}

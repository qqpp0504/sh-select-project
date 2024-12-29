import { useParams } from "react-router-dom";

import ReturnsPolicy from "./ReturnsPolicy.jsx";
import HowToReturn from "./questionAnswer/HowToReturn.jsx";
import RefundInfo from "./questionAnswer/RefundInfo.jsx";

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
  }

  return <section className="max-w-[40rem] w-full">{content}</section>;
}

import { Link } from "react-router-dom";

import bannerImage from "../assets/banner-image.jpg";
import Button from "../components/UI/Button.jsx";

export default function Home() {
  return (
    <div className="padding-large py-4">
      <div className="h-[60vh] flex justify-center">
        <img
          src={bannerImage}
          alt="Banner image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="my-8 flex flex-col justify-center items-center">
        <h3 className="text-[3rem] font-900">精挑細選，只為你獻上理想之選</h3>
        <p>
          我們篩選全球優質單品，結合實用與風格，讓每件商品都成為生活中的必備精品。
        </p>
        <Link to="/">
          <Button>探索我們的推薦單品</Button>
        </Link>
      </div>
    </div>
  );
}

import homeBannerImage from "../assets/home-banner-image.jpg";
import Banner from "../components/banner/Banner.jsx";

export default function Home() {
  return (
    <Banner
      bannerImage={homeBannerImage}
      title="精挑細選，只為你獻上理想之選"
      description="我們篩選全球優質單品，結合實用與風格，讓每件商品都成為生活中的必備精品。"
      buttonText="探索我們的推薦單品"
      link="/"
    />
  );
}

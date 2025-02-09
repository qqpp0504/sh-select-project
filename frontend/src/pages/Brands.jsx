import Banner from "@/components/banner/Banner.jsx";
import brandsBannerImg from "@/assets/brands-banner.jpg";
import { BRANDS } from "@/data.js";
import BrandDetail from "@/components/banner/BrandDetail.jsx";

const BRANDSBANNER = {
  image: brandsBannerImg,
  alt: "各種品牌圖片",
  title: "精選世界知名品牌，豐富你的生活體驗",
  description: "我們匯聚來自各地的優質商品，讓你的生活更添色彩與便利。",
  buttonText: "查看品牌商品",
  link: "/products",
  type: "frontend",
};

export default function BrandsPage() {
  return (
    <section>
      <Banner {...BRANDSBANNER} />

      <div className="padding-small lg:padding-large">
        <ul className="flex flex-col gap-10 overflow-hidden">
          {BRANDS.map((brand, index) => (
            <BrandDetail key={brand.title} index={index} brand={brand} />
          ))}
        </ul>
      </div>
    </section>
  );
}

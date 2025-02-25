import Banner from "@/components/banner/Banner.jsx";
import brandsBannerImg from "@/assets/brands-banner.jpg";
import brandsBannerSmImg from "@/assets/brands-banner-sm.jpg";
import { BRANDS } from "@/data.js";
import BrandDetail from "@/components/banner/BrandDetail.jsx";
import SEO from "@/components/SEO.jsx";

const BRANDSBANNER = {
  image: brandsBannerImg,
  imageSm: brandsBannerSmImg,
  alt: "各種品牌圖片",
  title: "精選世界知名品牌，豐富你的生活體驗",
  description: "我們匯聚來自各地的優質商品，讓你的生活更添色彩與便利。",
  buttonText: "查看品牌商品",
  link: "/products",
  type: "frontend",
};

export default function BrandsPage() {
  return (
    <>
      <SEO
        title="SH SELECT 精選品牌"
        description="探索 SH SELECT 精選的多樣商品，從時尚服飾到獨特配件，滿足您的每一個需求，讓您展現個人風格。"
      />
      <Banner {...BRANDSBANNER} />

      <section className="padding-small lg:padding-large">
        <ul className="flex flex-col gap-10 overflow-hidden">
          {BRANDS.map((brand, index) => (
            <BrandDetail key={brand.title} index={index} brand={brand} />
          ))}
        </ul>
      </section>
    </>
  );
}

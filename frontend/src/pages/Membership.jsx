import MembershipBlock from "@/components/banner/MembershipBlock.jsx";
import membershipImage from "@/assets/membership-banner.jpg";
import SEO from "@/components/SEO.jsx";
import BrandInfo from "@/components/membership/BrandInfo.jsx";

export default function MembershipPage() {
  return (
    <>
      <SEO
        title="會員福利。SH SELECT"
        description="了解 SH SELECT 會員專屬福利，包括獨家折扣、免費運送、提前獲取最新商品資訊等，立即加入我們，享受更多優惠！"
      />
      <section className="mt-10">
        <BrandInfo />
        <MembershipBlock
          image={membershipImage}
          alt="Membership image"
          paddingStyle="mb-8"
          className="mt-8"
        />
      </section>
    </>
  );
}

import QuickHelp from "@/components/help/QuickHelp.jsx";
import SEO from "@/components/SEO.jsx";

export default function HelpPage() {
  return (
    <>
      <SEO
        title="協助。SH SELECT"
        description="需要幫助嗎？瀏覽我們的常見問題、訂單查詢、退換貨政策，讓您的購物體驗更順暢！"
      />
      <QuickHelp />
    </>
  );
}

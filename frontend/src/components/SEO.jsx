import { Helmet } from "react-helmet";

export default function SEO({
  title = "SH SELECT",
  description = "歡迎來到 SH SELECT，我們提供高品質的商品與最佳購物體驗，立即探索最新商品！",
}) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}

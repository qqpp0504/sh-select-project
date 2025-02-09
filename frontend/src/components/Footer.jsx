import { Link } from "react-router-dom";

import facebookLogo from "@/assets/facebook-logo.png";
import instagramLogo from "@/assets/instagram-logo.png";
import lineLogo from "@/assets/line-logo.png";
import pinLogo from "@/assets/pin-icon.png";
import ResponsiveFooter from "./ResponsiveFooter.jsx";

const FOOTERDATA = {
  資源: [
    { text: "加入會員", link: "/accounts" },
    { text: "傳送意見回饋", link: "/" },
  ],
  協助: [
    { text: "取得協助", link: "/help" },
    { text: "出貨與寄送", link: "/help/shipping-delivery" },
    { text: "退貨", link: "/help/refund-policy" },
  ],
  品牌: [
    {
      text: "關於 SH SELECT",
      link: "/",
    },
    {
      text: "最新消息",
      link: "/",
    },
  ],
};

const COMMUNITYLOGO = [
  {
    logo: facebookLogo,
    alt: "Facebook Logo",
    href: "https://www.facebook.com/",
  },
  {
    logo: instagramLogo,
    alt: "Instagram Logo",
    href: "https://www.instagram.com/",
  },
  {
    logo: lineLogo,
    alt: "Line Logo",
    href: "https://line.me/tw/",
  },
  {
    logo: pinLogo,
    alt: "Map pin Logo",
    href: "https://www.google.com/maps/",
  },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <>
      <div className="padding-small lg:padding-large mt-32">
        <hr />
        <div className="py-14 hidden lg:flex lg:flex-row lg:justify-center text-[0.9rem]">
          {Object.entries(FOOTERDATA).map(([sectionTitle, links]) => (
            <div key={sectionTitle} className="mx-28">
              <h3>{sectionTitle}</h3>

              <div className="text-gray my-8">
                <ul>
                  {links.map(({ text, link }) => (
                    <li key={text} className="py-1">
                      <Link to={link}>{text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ResponsiveFooter footerData={FOOTERDATA} />

      <div className="bg-gray-100 pt-8 flex flex-col items-center">
        <ul className="flex flex-row items-center gap-3 mb-1">
          {COMMUNITYLOGO.map((logoItem) => (
            <li key={logoItem.logo}>
              <a href={logoItem.href} target="_blank" rel="noopener noreferrer">
                <img
                  src={logoItem.logo}
                  alt={logoItem.alt}
                  className="w-8 min-w-8 md:w-10 md:min-w-10"
                />
              </a>
            </li>
          ))}
        </ul>
        <span className="py-2 text-gray uppercase text-sm">
          {`${currentYear}`} &copy; SH Select
          此網站僅作為作品集展示用途，故請勿下單
        </span>
      </div>
    </>
  );
}

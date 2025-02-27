import { Link } from "react-router-dom";
import { ImFacebook2 } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";
import { FaLine } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";

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
    logo: ImFacebook2,
    alt: "Facebook Logo",
    href: "https://www.facebook.com/",
  },
  {
    logo: FaInstagram,
    alt: "Instagram Logo",
    href: "https://www.instagram.com/",
  },
  {
    logo: FaLine,
    alt: "Line Logo",
    href: "https://line.me/tw/",
  },
  {
    logo: FiMapPin,
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

      <div className="bg-gray-100 pt-8 flex flex-col items-center pb-24 lg:pb-0">
        <ul className="flex flex-row items-center gap-3 md:gap-4 mb-1">
          {COMMUNITYLOGO.map(({ logo: Icon, href }) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <Icon className="w-8 h-8 md:w-10 md:h-10" />
              </a>
            </li>
          ))}
        </ul>
        <span className="px-4 py-2 text-gray uppercase text-sm">
          {`${currentYear}`} &copy; SH Select
          此網站僅作為作品集展示用途，故請勿下單
        </span>
      </div>
    </>
  );
}

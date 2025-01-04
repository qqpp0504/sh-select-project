import { Link } from "react-router-dom";

import { FOOTERDATA } from "../data.js";
import facebookLogo from "../assets/facebook-logo.png";
import instagramLogo from "../assets/instagram-logo.png";
import lineLogo from "../assets/line-logo.png";
import pinLogo from "../assets/pin-icon.png";

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
      <div className="padding-large mt-32">
        <hr />
        <div className="py-14 flex flex-row justify-center text-[0.9rem]">
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
      <div className="bg-gray-100 pt-8 flex flex-col items-center">
        <ul className="flex flex-row items-center w-[14%] gap-3 mb-1">
          {COMMUNITYLOGO.map((logoItem) => (
            <li key={logoItem.logo}>
              <a href={logoItem.href} target="_blank" rel="noopener noreferrer">
                <img src={logoItem.logo} alt={logoItem.alt} />
              </a>
            </li>
          ))}
        </ul>
        <span className="py-2 text-gray uppercase text-sm">
          {`${currentYear}`} &copy; SH Select
        </span>
      </div>
    </>
  );
}

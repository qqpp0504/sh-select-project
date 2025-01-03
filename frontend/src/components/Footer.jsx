import { Link } from "react-router-dom";

import { FOOTERDATA } from "../data.js";
import facebookLogo from "../assets/facebook-logo.png";
import instagramLogo from "../assets/instagram-logo.png";
import lineLogo from "../assets/line-logo.png";
import mapLogo from "../assets/map-logo.png";

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
        <ul className="flex flex-row items-center w-[15%]">
          <li>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebookLogo} alt="Facebook Logo" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagramLogo} alt="Instagram Logo" />
            </a>
          </li>
          <li>
            <a
              href="https://line.me/tw/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={lineLogo} alt="Line Logo" />
            </a>
          </li>
          <li>
            <a
              href="https://www.google.com/maps/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={mapLogo} alt="Google Map Logo" className="w-64" />
            </a>
          </li>
        </ul>
        <span className="py-2 text-gray uppercase text-sm">
          2024 &copy; SH Select
        </span>
      </div>
    </>
  );
}

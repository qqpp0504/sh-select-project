import { Link } from "react-router-dom";

import Accordion from "./UI/Accordion.jsx";

export default function ResponsiveFooter({ footerData }) {
  return (
    <div className="padding-small pt-8 pb-14 flex flex-col justify-center text-[0.9rem] lg:hidden">
      {Object.entries(footerData).map(([sectionTitle, links]) => (
        <Accordion
          key={sectionTitle}
          tag={sectionTitle}
          id={`footer-${sectionTitle}`}
          margin="my-2"
          topHr={false}
        >
          <div className="text-gray mb-2">
            <ul>
              {links.map(({ text, link }) => (
                <li key={text} className="py-1">
                  <Link to={link}>{text}</Link>
                </li>
              ))}
            </ul>
          </div>
        </Accordion>
      ))}
    </div>
  );
}

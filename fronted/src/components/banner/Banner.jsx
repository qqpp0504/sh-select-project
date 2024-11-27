/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import Button from "../UI/Button.jsx";

export default function Banner({
  sectionTitle = null,
  image,
  alt,
  title,
  description,
  buttonText,
  link,
}) {
  return (
    <section className="padding-large">
      {sectionTitle && (
        <h2 className="text-2xl font-500 mb-[1.625rem]">{sectionTitle}</h2>
      )}
      <div className="h-[85vh] flex justify-center">
        <img
          src={`http://localhost:3000/${image}`}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="my-8 flex flex-col justify-center items-center">
        <h3 className="text-[3rem] font-900">{title}</h3>
        <p>{description}</p>
        <Link to={link}>
          <Button>{buttonText}</Button>
        </Link>
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";

import Button from "../UI/Button.jsx";

export default function Banner({
  sectionTitle = null,
  image,
  imageSm,
  alt,
  title,
  description,
  buttonText,
  link,
  type = "backend",
}) {
  const [currentImage, setCurrentImage] = useState(image);

  useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth < 780) {
        if (imageSm) {
          setCurrentImage(imageSm);
        } else {
          setCurrentImage(image);
        }
      } else {
        setCurrentImage(image);
      }
    };

    updateImage(); // 初始化時執行一次
    window.addEventListener("resize", updateImage); // 監聽螢幕變化
    return () => window.removeEventListener("resize", updateImage); // 清除監聽
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImage]);

  return (
    <section className="padding-small lg:padding-large">
      {sectionTitle && (
        <h2 className="text-2xl font-500 mb-[1.625rem]">{sectionTitle}</h2>
      )}
      <div className="h-[65vh] flex justify-center">
        <img
          src={
            type === "backend"
              ? `http://localhost:3000/${currentImage}`
              : currentImage
          }
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="my-8 flex flex-col justify-center items-start md:items-center lg:items-center gap-3">
        <h3 className="text-4xl lg:text-6xl font-900">{title}</h3>
        <p>{description}</p>

        <Button link={link} className="my-6">
          {buttonText}
        </Button>
      </div>
    </section>
  );
}

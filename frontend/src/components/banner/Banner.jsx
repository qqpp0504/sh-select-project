import Button from "../UI/Button.jsx";

export default function Banner({
  sectionTitle = null,
  image,
  alt,
  title,
  description,
  buttonText,
  link,
  type = "backend",
}) {
  return (
    <section className="padding-small lg:padding-large">
      {sectionTitle && (
        <h2 className="text-2xl font-500 mb-[1.625rem]">{sectionTitle}</h2>
      )}
      <div className="h-[65vh] flex justify-center">
        <img
          src={type === "backend" ? `http://localhost:3000/${image}` : image}
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

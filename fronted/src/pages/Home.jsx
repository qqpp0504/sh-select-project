import bannerImage from "../assets/banner-image.jpg";

export default function Home() {
  return (
    <div className="padding-large py-4 h-[60vh] flex justify-center">
      <img
        src={bannerImage}
        alt="Banner image"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

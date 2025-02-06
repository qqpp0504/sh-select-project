import heartIcon from "@/assets/heart-icon.png";
import shoppingBagIcon from "@/assets/shoppingBag-icon.png";
import leftArrowIcon from "@/assets/left-arrow-icon.png";
import rightArrowIcon from "@/assets/right-arrow-icon.png";
import hamburgerIcon from "@/assets/hamburger-icon.png";

export default function Icon({ type }) {
  function renderIcon() {
    switch (type) {
      case "heart":
        return <img src={heartIcon} alt="Heart icon" className="w-6 min-w-6" />;
      case "shopping-cart":
        return (
          <img
            src={shoppingBagIcon}
            alt="Shopping icon"
            className="w-6 min-w-6"
          />
        );
      case "left-arrow":
        return (
          <img src={leftArrowIcon} alt="Left arrow icon" className="w-5" />
        );
      case "right-arrow":
        return (
          <img src={rightArrowIcon} alt="Right arrow icon" className="w-5" />
        );
      case "hamburger":
        return (
          <img
            src={hamburgerIcon}
            alt="Navigation icon"
            className="w-5 min-w-5"
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="rounded-3xl p-[0.375rem] hover:bg-gray-200">
      {renderIcon()}
    </div>
  );
}

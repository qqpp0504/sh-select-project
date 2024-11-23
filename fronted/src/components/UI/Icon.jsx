import searchIcon from "../../assets/search-icon.png";
import heartIcon from "../../assets/heart-icon.png";
import shoppingCartIcon from "../../assets/shoppingCart-icon.png";
import leftArrowIcon from "../../assets/left-arrow-icon.png";
import rightArrowIcon from "../../assets/right-arrow-icon.png";

// eslint-disable-next-line react/prop-types
export default function Icon({ type }) {
  function renderIcon() {
    switch (type) {
      case "search":
        return <img src={searchIcon} alt="Search icon" className="w-6" />;
      case "heart":
        return <img src={heartIcon} alt="Heart icon" className="w-6" />;
      case "shopping-cart":
        return (
          <img src={shoppingCartIcon} alt="Shopping icon" className="w-6" />
        );
      case "left-arrow":
        return (
          <img src={leftArrowIcon} alt="Left arrow icon" className="w-5" />
        );
      case "right-arrow":
        return (
          <img src={rightArrowIcon} alt="Right arrow icon" className="w-5" />
        );
      default:
        return null;
    }
  }

  return <div>{renderIcon()}</div>;
}

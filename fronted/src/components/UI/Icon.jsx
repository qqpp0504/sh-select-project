import searchIcon from "../../assets/search-icon.png";
import heartIcon from "../../assets/heart-icon.png";
import shoppingCartIcon from "../../assets/shoppingCart-icon.png";

// eslint-disable-next-line react/prop-types
export default function Icon({ type }) {
  function renderIcon() {
    switch (type) {
      case "search":
        return <img src={searchIcon} alt="Search Icon" className="w-6" />;
      case "heart":
        return <img src={heartIcon} alt="Heart Icon" className="w-6" />;
      case "shopping-cart":
        return <img src={shoppingCartIcon} alt="Heart Icon" className="w-6" />;
      default:
        return null;
    }
  }

  return <div>{renderIcon()}</div>;
}

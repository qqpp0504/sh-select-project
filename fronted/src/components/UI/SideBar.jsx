/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { PRODUCTSNAV } from "../../data.js";
import filterIcon from "../../assets/filter-icon.png";
import showIcon from "../../assets/show-icon.png";
import Accordion from "../../components/UI/Accordion.jsx";
import ShowMore from "../../components/UI/ShowMore.jsx";
import { filterActions } from "../../store/filter-slice.js";

export default function SideBar({ children }) {
  const filters = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams();
  const [isShowing, setIsShowing] = useState(true); // 可以改成不要用狀態管理

  const genderText =
    category === "men" ? "男子" : category === "women" ? "女子" : "所有產品";

  function handleToggleFilter(filterType, value) {
    dispatch(filterActions.toggleFilter({ filterType, value }));
  }

  // 自動同步 URL，根據所選擇的篩選條件狀態來更改 URL
  useEffect(() => {
    const { gender, onSale, brands } = filters;
    let path = "/products";

    if (gender.length > 0) {
      if (gender.includes("men") && gender.includes("women")) {
        path += "/unisex";
      } else {
        path += "/" + gender.join("-");
      }
    }

    console.log(gender);

    if (onSale.length > 0) {
      path += "/" + onSale;
    }

    if (brands.length > 0) {
      const sortedBrands = [...brands].sort();
      path += "/" + sortedBrands.join("-");
    }

    navigate(path);
  }, [filters, navigate]);

  function handleShowing() {
    setIsShowing((showing) => !showing);
  }

  return (
    <div className="padding-large">
      <div className="flex flex-row items-center justify-between my-6">
        <h1 className="text-2xl font-500">{genderText}</h1>
        <nav>
          <ul className="flex flex-row gap-8">
            <li>
              <button
                onClick={handleShowing}
                className="flex flex-row items-center gap-[0.625rem]"
              >
                {isShowing ? "隱藏篩選條件" : "顯示篩選條件"}
                <img src={filterIcon} alt="Filter icon" className="w-5" />
              </button>
            </li>
            <li>
              <button className="flex flex-row items-center gap-[0.625rem]">
                排序依據
                <img src={showIcon} alt="Show more icon" className="w-5" />
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex">
        <aside
          className={`h-[80vh] overflow-y-scroll scrollbar-thin transition-all duration-300 ease hidden lg:block ${
            isShowing
              ? "w-[16rem] translate-x-0"
              : "w-0 -translate-x-[calc(16rem+3rem)]"
          }`}
        >
          <div className="pr-5">
            <nav className="pb-10">
              <ul>
                {PRODUCTSNAV.map((tag) => (
                  <li key={tag} className="py-1">
                    <Link to="/products">
                      <span className="font-500">{tag}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Accordion tag="性別" id="sex">
              <div>
                <button
                  onClick={() => handleToggleFilter("gender", "men")}
                  className={
                    filters.gender.includes("men") ||
                    filters.gender.includes("unisex")
                      ? "checked"
                      : "unchecked"
                  }
                >
                  男子
                </button>
                <button
                  onClick={() => handleToggleFilter("gender", "women")}
                  className={
                    filters.gender.includes("women") ||
                    filters.gender.includes("unisex")
                      ? "checked"
                      : "unchecked"
                  }
                >
                  女子
                </button>
              </div>
            </Accordion>

            <Accordion tag="促銷與折扣" id="discount">
              <div>
                <button
                  onClick={() => handleToggleFilter("onSale", "sale")}
                  className={
                    filters.onSale.includes("sale") ? "checked" : "unchecked"
                  }
                >
                  超值優惠商品
                </button>
              </div>
            </Accordion>

            <Accordion tag="品牌" id="brands">
              <ShowMore
                content={
                  <div>
                    <button
                      onClick={() => handleToggleFilter("brands", "asics")}
                      className={
                        filters.brands.includes("asics")
                          ? "checked"
                          : "unchecked"
                      }
                    >
                      Asics
                    </button>
                    <button
                      onClick={() => handleToggleFilter("brands", "adidas")}
                      className={
                        filters.brands.includes("adidas")
                          ? "checked"
                          : "unchecked"
                      }
                    >
                      Adidas
                    </button>
                    <button
                      onClick={() => handleToggleFilter("brands", "converse")}
                      className={
                        filters.brands.includes("converse")
                          ? "checked"
                          : "unchecked"
                      }
                    >
                      Converse
                    </button>
                    <button
                      onClick={() => handleToggleFilter("brands", "mizuno")}
                      className={
                        filters.brands.includes("mizuno")
                          ? "checked"
                          : "unchecked"
                      }
                    >
                      Mizuno
                    </button>
                  </div>
                }
                more={
                  <div>
                    <button
                      onClick={() => handleToggleFilter("brands", "nautica")}
                      className={
                        filters.brands.includes("nautica")
                          ? "checked"
                          : "unchecked"
                      }
                    >
                      Nautica
                    </button>
                    <button
                      onClick={() => handleToggleFilter("brands", "nike")}
                      className={
                        filters.brands.includes("nike")
                          ? "checked"
                          : "unchecked"
                      }
                    >
                      Nike
                    </button>
                    <button
                      onClick={() => handleToggleFilter("brands", "ordinary")}
                      className={
                        filters.brands.includes("ordinary")
                          ? "checked"
                          : "unchecked"
                      }
                    >
                      Ordinary
                    </button>
                    <button
                      onClick={() =>
                        handleToggleFilter("brands", "the-north-face")
                      }
                      className={
                        filters.brands.includes("the-north-face")
                          ? "checked"
                          : "unchecked"
                      }
                    >
                      The North Face
                    </button>
                  </div>
                }
              />
            </Accordion>
          </div>
        </aside>
        <section className={`w-full ${isShowing ? "lg:pl-12" : undefined}`}>
          {children}
        </section>
      </div>
    </div>
  );
}

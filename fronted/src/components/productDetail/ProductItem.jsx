/* eslint-disable react/prop-types */
import { currencyFormatter } from "../../util/formatting.js";
import heartIcon from "../../assets/heart-icon.png";
import rulerIcon from "../../assets/ruler-icon.png";
import Accordion from "../UI/Accordion.jsx";
import DeliveryInformation from "../UI/DeliveryInformation.jsx";

export default function ProductItem({ product }) {
  return (
    <section>
      <div className="padding-large my-12">
        <div className="flex flex-row justify-center px-28">
          <div className="flex flex-row w-[40rem] h-[43rem]">
            <div>
              <div className="w-26 h-full flex flex-col items-end mr-4">
                {product.images.map((image) => (
                  <div
                    key={image}
                    className="w-[5rem] h-[5rem] mb-2 rounded-md overflow-hidden"
                  >
                    <input className="hidden" />
                    <label>
                      <img
                        src={`http://localhost:3000/${image}`}
                        alt={product.alt}
                        className="w-full h-full object-cover bg-gray-100"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center items-center bg-gray-100 rounded-lg mr-8">
              <img
                src={`http://localhost:3000/${product.image}`}
                alt={product.alt}
              />
            </div>
          </div>
          <div className="w-[24rem]">
            <div>
              <h1 className="text-xl font-500">
                {product.brand} - {product.name}
              </h1>
              <h2 className="text-gray">{product.categoryCh}</h2>
              <div className="my-3 flex gap-2 font-500">
                <span>NT{currencyFormatter.format(product.originalPrice)}</span>
                {product.originalPrice !== product.discountPrice && (
                  <>
                    <s className="text-gray">
                      NT{currencyFormatter.format(product.discountPrice)}
                    </s>
                    <span className="text-green-700">
                      {product.discountPercentage}% 折扣
                    </span>
                  </>
                )}
              </div>

              <div>
                <div className="mt-16 mb-3 font-500 flex justify-between items-center">
                  <span>選取尺寸</span>
                  <span className="text-sm flex items-center gap-1">
                    <img src={rulerIcon} alt="Ruler Icon" className="w-6" />
                    尺寸指南
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-[0.45rem] mb-8">
                  {product.size.map((option) => (
                    <button
                      key={option}
                      className="p-3 border-[1px] border-gray-200 rounded-[0.25rem] hover:border-black"
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <button className="bg-black rounded-full text-white w-full py-[1.2rem] hover:bg-black-hoverColor">
                    加入購物車
                  </button>
                  <button className="rounded-full text-black w-full py-[1.2rem] border-[1.5px] border-gray-300 flex justify-center gap-1 hover:border-black">
                    最愛
                    <img src={heartIcon} alt="Heart Icon" className="w-6" />
                  </button>
                </div>
              </div>

              <div className="mt-14">
                <p>{product.summary}</p>
                <button className="mt-8 inline-block font-500 border-b-[1.5px] border-black">
                  檢視產品詳細資料
                </button>
              </div>

              <div>
                <Accordion
                  tag="尺寸與版型"
                  id="size"
                  fontSize="text-xl"
                  margin="my-3"
                >
                  {product.sizeDetail ? (
                    <ul
                      role="list"
                      className="marker:text-lg pl-8 list-disc space-y-[0.15rem]"
                    >
                      {product.sizeDetail.map((list) => (
                        <li key={list}>{list}</li>
                      ))}
                      <li className="font-500">尺寸指南</li>
                    </ul>
                  ) : (
                    <ul>
                      <li className="font-500">尺寸指南</li>
                    </ul>
                  )}
                </Accordion>

                <Accordion
                  tag="免費寄送及退貨"
                  id="deliveryInformation"
                  fontSize="text-xl"
                  margin="my-3"
                >
                  <DeliveryInformation />
                </Accordion>

                <Accordion
                  tag="評價"
                  id="feedback"
                  fontSize="text-xl"
                  margin="my-3"
                >
                  這裡還很空
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

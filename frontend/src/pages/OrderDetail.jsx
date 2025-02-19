import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { fetchUserOrderDetail } from "@/util/http.js";
import { currencyFormatter } from "@/util/formatting.js";
import LoadingIndicator from "@/components/UI/LoadingIndicator.jsx";
import OrderProducts from "@/components/member/OrderProducts.jsx";

export default function OrderDetail() {
  const { token, user } = useSelector((state) => state.account.userData);
  const { orderId } = useParams();

  const {
    data: order,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["userOrderDetail", { userEmail: user.email, orderId }],
    queryFn: ({ signal, queryKey }) =>
      fetchUserOrderDetail({ signal, ...queryKey[1] }),
    staleTime: 0,
    retry: 1,
    retryDelay: 1000,
    timeout: 5000,
    enabled: !!token,
  });

  let orderContent;

  if (order) {
    orderContent = (
      <>
        <div className="text-gray">
          <p>{`訂單成立日期：${order.date} ${order.time}`}</p>
          <p>{`訂單編號：${order.orderId}`}</p>
        </div>

        <div className="lg:flex flex-col gap-5 mt-10 hidden">
          <table>
            <thead>
              <tr className="border-b-[1px] border-gray-200 text-left">
                <th className="pb-5 w-[40rem]">商品資料</th>
                <th className="pb-5 w-[12rem]">數量</th>
                <th className="pb-5 w-[12rem]">小計</th>
              </tr>
            </thead>

            <tbody>
              {order.products.map((product) => (
                <tr
                  key={product.idNumber}
                  className="border-b-[1px] border-gray-100 pb-5"
                >
                  <td className="flex gap-5 w-[40rem] py-5">
                    <Link
                      to={`/products/${product.slug}`}
                      className="w-[13rem] h-[13rem] bg-gray-100 flex justify-center items-center"
                    >
                      <img
                        src={`http://localhost:3000/${product.color.image}`}
                        alt={product.alt}
                        className="w-[90%] h-[90%]"
                      />
                    </Link>

                    <div className="flex flex-col gap-1">
                      <Link to={`/products/${product.slug}`}>
                        <span className="font-500">{`${product.brand} - ${product.productName}`}</span>
                      </Link>
                      <div className="font-500">
                        <span>
                          NT
                          {currencyFormatter.format(product.discountPrice)}
                        </span>
                        {product.discountPrice !== product.originalPrice && (
                          <s className="text-gray ml-3">
                            NT
                            {currencyFormatter.format(product.originalPrice)}
                          </s>
                        )}
                      </div>
                      <span className="text-gray">{product.category}</span>
                      <span className="text-gray">{product.color.name}</span>
                      <span className="text-gray">
                        尺寸<span className="ml-2">{product.size}</span>
                      </span>
                    </div>
                  </td>

                  <td className="w-[12rem] py-5">{product.quantity}</td>

                  <td className="w-[12rem] py-5">
                    <span>
                      NT{currencyFormatter.format(product.itemTotalPrice)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <OrderProducts order={order} />

        <div className="flex flex-col items-end lg:pr-[11rem] mt-5">
          <div className="w-[13rem] md:w-[19rem] flex flex-col gap-1 sm:gap-3">
            <div className="flex justify-between">
              <div>小計：</div>
              <div>NT{currencyFormatter.format(order.totalAmount)}</div>
            </div>

            <div className="flex justify-between">
              <div>運費：</div>
              <div>NT{currencyFormatter.format(order.shippingFee)}</div>
            </div>

            <div className="flex justify-between font-500">
              <div>合計：</div>
              <div>NT{currencyFormatter.format(order.totalPrice)}</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isLoading) {
    orderContent = <LoadingIndicator />;
  }

  if (isError) {
    orderContent = <p>{error.message}</p>;
  }

  return <section>{orderContent}</section>;
}

import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchUserOrderDetail } from "@/util/http.js";
import { currencyFormatter } from "@/util/formatting.js";
import LoadingIndicator from "@/components/UI/LoadingIndicator.jsx";

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

        <div className="flex flex-col gap-5 mt-10">
          <table>
            <thead>
              <tr className="border-b-[1px] border-gray-200 text-left">
                <th className="pb-5 w-[35rem]">商品資料</th>
                <th className="pb-5 w-[15rem]">數量</th>
                <th className="pb-5 w-[15rem]">小計</th>
              </tr>
            </thead>

            <tbody>
              {order.products.map((product) => (
                <tr
                  key={product.idNumber}
                  className="border-b-[1px] border-gray-100 pb-5"
                >
                  <td className="flex gap-5 w-[35rem] py-5">
                    <div className="w-[13rem] h-[13rem] bg-gray-100 flex justify-center items-center">
                      <img
                        src={`http://localhost:3000/${product.color.image}`}
                        alt={product.alt}
                        className="w-[90%] h-[90%]"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="font-500">{`${product.brand} - ${product.productName}`}</span>
                      <div className="font-500">
                        <span>
                          NT
                          {currencyFormatter.format(product.discountPrice)}
                        </span>
                        {product.discountPrice !== product.originalPrice && (
                          <s className="text-gray mr-3">
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

                  <td className="w-[15rem]">
                    <span>{product.quantity}</span>
                  </td>

                  <td className="w-[15rem]">
                    <span>
                      {currencyFormatter.format(product.itemTotalPrice)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

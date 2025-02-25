import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { fetchUserOrders } from "@/util/http.js";
import { currencyFormatter } from "@/util/formatting.js";
import Button from "@/components/UI/Button.jsx";
import SEO from "@/components/SEO.jsx";

export default function MemberPage() {
  const { token, user } = useSelector((state) => state.account.userData);

  const {
    data: orders,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["userOrders", { userEmail: user.email }],
    queryFn: ({ signal, queryKey }) =>
      fetchUserOrders({ signal, ...queryKey[1] }),
    staleTime: 0,
    retry: 1,
    retryDelay: 1000,
    timeout: 5000,
    enabled: !!token,
  });

  const ORDERHEADER = ["訂單編號", "訂單日期", "合計", "訂單狀態", "查看訂單"];

  return (
    <>
      <SEO
        title="會員訂單資訊。SH SELECT"
        description="查看您的 SH SELECT 訂單資訊，包括訂單狀態、配送進度與購買明細，讓您隨時掌握最新資訊。"
      />
      <section>
        <div>
          {orders && orders.length === 0 && (
            <p className="text-gray">你尚無任何訂單</p>
          )}
          {orders && orders.length > 0 && (
            <>
              <table className="w-full hidden lg:block">
                <thead>
                  <tr className="border-b-[1px] border-gray-200 text-left">
                    {ORDERHEADER.map((item, index) => (
                      <th
                        key={item}
                        className={`pb-5 ${
                          index === 0 ? "w-[28rem]" : "w-[15rem]"
                        }`}
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.orderId}
                      className="border-b-[1px] border-gray-200 text-left"
                    >
                      <td className="py-7">{order.orderId}</td>
                      <td className="py-7">{order.date}</td>
                      <td className="py-7">
                        NT{currencyFormatter.format(order.totalPrice)}
                      </td>
                      <td className="py-7">出貨中</td>
                      <td className="py-7">
                        <Button
                          link={order.orderId}
                          size="lg"
                          className="rounded-md"
                        >
                          查閱
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex flex-col justify-center pb-6 lg:hidden overflow-x-auto">
                {orders.map((order) => (
                  <table key={order.orderId}>
                    <tbody>
                      <tr className="border-b">
                        <th className="text-gray py-2 sm:py-3 sm:px-4 text-left border-r font-400 min-w-20 sm:w-32">
                          訂單編號
                        </th>
                        <td className="py-2 px-3 sm:py-3 sm:px-4 text-gray-700 min-w-[15rem]">
                          {order.orderId}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <th className="py-2 text-gray sm:py-3 sm:px-4 text-left border-r font-400">
                          訂單日期
                        </th>
                        <td className="py-2 px-3 sm:py-3 sm:px-4 text-gray-700">
                          {order.date}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <th className="py-2 text-gray sm:py-3 sm:px-4 text-left border-r font-400">
                          合計
                        </th>
                        <td className="py-2 px-3 sm:py-3 sm:px-4 text-gray-700">
                          NT{currencyFormatter.format(order.totalPrice)}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <th className="py-2 text-gray sm:py-3 sm:px-4 text-left border-r font-400">
                          訂單狀態
                        </th>
                        <td className="py-2 px-3 sm:py-3 sm:px-4 text-gray-700">
                          出貨中
                        </td>
                      </tr>
                      <tr className="border-b-2 border-gray-300">
                        <th className="py-2 text-gray sm:py-3 sm:px-4 text-left border-r font-400">
                          查看訂單
                        </th>
                        <td className="py-2 px-3 sm:py-3 sm:px-4 text-gray-700 flex justify-end sm:justify-start">
                          <Button
                            link={order.orderId}
                            size="lg"
                            className="rounded-md"
                          >
                            查閱
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ))}
              </div>
            </>
          )}
        </div>

        {isLoading && <p>isLoading</p>}
        {isError && <p>{error.message}</p>}
      </section>
    </>
  );
}

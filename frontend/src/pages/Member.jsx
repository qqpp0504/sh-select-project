import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchUserOrders } from "@/util/http.js";
import { currencyFormatter } from "@/util/formatting.js";

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

  return (
    <section>
      <div>
        {orders && orders.length === 0 && (
          <p className="text-gray">你尚無任何訂單</p>
        )}
        {orders && orders.length > 0 && (
          <>
            <table className="w-full">
              <thead>
                <tr className="border-b-[1px] border-gray-200 text-left">
                  <th className="pb-5 w-[28rem]">訂單編號</th>
                  <th className="pb-5 w-[15rem]">訂單日期</th>
                  <th className="pb-5 w-[15rem]">合計</th>
                  <th className="pb-5 w-[15rem]">訂單狀態</th>
                  <th className="pb-5 w-[15rem]">查看訂單</th>
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
                      {currencyFormatter.format(order.totalPrice)}
                    </td>
                    <td className="py-7">出貨中</td>
                    <td className="py-7">
                      <Link to={order.orderId}>查閱</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {isLoading && <p>isLoading</p>}
      {isError && <p>{error.message}</p>}
    </section>
  );
}

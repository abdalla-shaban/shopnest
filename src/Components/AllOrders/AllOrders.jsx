import axios from "axios";
import { useUserContext } from "../../Context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "../../Context/CartContext";
import AllOrdersSkeleton from "../AllOrdersSkeleton/AllOrdersSkeleton";

const getOrders = async (id) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/orders/user/${id}`
  );
  return data;
};

export default function AllOrders() {
  const { user } = useUserContext();
  const { refetch } = useCart();
  const { data: ordersData, isLoading } = useQuery({
    queryKey: ["ordersItems"],
    queryFn: () => {
      refetch();
      return getOrders(user?.decoded.id);
    },
  });

  return (
    <div className="my-10">
      <h2 className="mb-5 text-3xl font-bold font-secondary">All Orders</h2>
      {isLoading ? (
        <AllOrdersSkeleton />
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  shipping Address
                </th>
                <th scope="col" className="px-6 py-3">
                  total Order Price
                </th>
                <th scope="col" className="px-6 py-3">
                  payment Method Type
                </th>
              </tr>
            </thead>
            <tbody>
              {ordersData?.map((order) => (
                <tr
                  key={order._id}
                  className="text-center bg-white border-b border-gray-200 hover:bg-gray-50 "
                >
                  <td className="p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {order.cartItems.map((item) => (
                        <img
                          key={item._id}
                          src={item.product.imageCover}
                          className="object-contain max-w-full max-h-full size-12"
                          alt="Apple Watch"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    {order.cartItems.map((item) => (
                      <p key={item._id}>{item.product.title.split(" ", 2)},</p>
                    ))}
                  </td>
                  <td className="px-6 py-4 text-primary">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">City</span>
                        <p>{order.shippingAddress.city}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Details</span>
                        <p>{order.shippingAddress.details}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="block font-medium">Phone</span>
                        <p>{order.shippingAddress.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    {order.totalOrderPrice} EGP
                  </td>
                  <td className="px-6 py-4 font-semibold uppercase">
                    <p
                      className={
                        order.paymentMethodType == "cash"
                          ? "px-4 py-1.5 rounded-lg bg-blue-800/10 border  border-blue-800"
                          : "px-4 py-1.5 rounded-lg bg-green-800/10 border  border-green-800"
                      }
                    >
                      {order.paymentMethodType}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

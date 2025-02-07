import { FaPlus, FaMinus, FaEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { useCart } from "../../Context/CartContext";

export default function CartTable({ setIsCash, setIsCheckedOut }) {
  const {
    data: cartItems,
    updateItemQuantityMutation,
    removeItemFromCartMutation,
    clearUserCartMutation,
  } = useCart();
  return (
    <>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start "
                    >
                      Imgae
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start "
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start "
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase "
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase "
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                  {cartItems?.data.products?.map((product) => (
                    <tr key={product.product.id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ">
                        <img
                          src={product.product.imageCover}
                          alt={product.product.title}
                          className="min-w-32 max-w-32"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap ">
                        {product.product.title.split(" ", 5).join(" ")}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ">
                        {product.price * product.count} EGP
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            disabled={product.count == 1}
                            type="button"
                            onClick={() =>
                              updateItemQuantityMutation.mutate({
                                productId: product.product.id,
                                count: product.count - 1,
                              })
                            }
                            className="flex items-center justify-center text-sm font-medium text-white border border-transparent rounded-lg size-6 bg-primary hover:bg-primary/90 focus:outline-none focus:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            <FaMinus size={10} />
                          </button>
                          <span className="flex items-center justify-center bg-gray-300 rounded-lg size-10">
                            {product.count}
                          </span>
                          <button
                            onClick={() =>
                              updateItemQuantityMutation.mutate({
                                productId: product.product.id,
                                count: product.count + 1,
                              })
                            }
                            type="button"
                            className="flex items-center justify-center text-sm font-medium text-white border border-transparent rounded-lg size-6 bg-primary hover:bg-primary/90 focus:outline-none focus:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            <FaPlus size={10} />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="flex items-center justify-center gap-3">
                          <Link
                            to={`/product-details/${product.product.id}`}
                            className="flex items-center justify-center text-white transition-all duration-500 bg-blue-500 border border-blue-500 rounded-lg size-8 hover:text-blue-500 hover:bg-transparent"
                          >
                            <FaEye size={16} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => {
                              toast(
                                (t) => (
                                  <div className="text-sm">
                                    <h4 className="font-semibold">
                                      Do you Want to Remove This Product ?
                                    </h4>
                                    <div className="flex items-center justify-center gap-3 mt-3">
                                      <button
                                        className="px-4 py-1.5 rounded-lg bg-red-800/10 border text-red-500 border-red-500"
                                        onClick={() => {
                                          removeItemFromCartMutation.mutate(
                                            product.product.id
                                          );
                                          toast.dismiss(t.id);
                                        }}
                                      >
                                        yes
                                      </button>
                                      <button
                                        className="px-4 py-1.5 rounded-lg bg-blue-800/10 border  border-blue-800"
                                        onClick={() => toast.dismiss(t.id)}
                                      >
                                        No
                                      </button>
                                    </div>
                                  </div>
                                ),
                                {
                                  duration: Infinity,
                                  position: "top-center",
                                }
                              );
                            }}
                            className="flex items-center justify-center text-white transition-all duration-500 bg-red-600 border border-red-600 rounded-lg size-8 hover:text-red-600 hover:bg-transparent"
                          >
                            <MdDelete size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="self-end mt-5">
        <div className="flex flex-wrap items-center gap-2 mb-2 text-xl font-medium">
          <span>Total Cart Price :</span>
          <span>{cartItems.data.totalCartPrice} EGP</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              toast(
                (t) => (
                  <div className="text-sm">
                    <h4 className="font-semibold">Order Type ?</h4>
                    <div className="flex items-center justify-center gap-3 mt-3">
                      <button
                        className="px-4 py-1.5 rounded-lg bg-blue-800/10 border  border-blue-800"
                        onClick={() => {
                          toast.dismiss(t.id);
                          setIsCheckedOut(true);
                          setIsCash(true);
                        }}
                      >
                        Cash
                      </button>
                      <button
                        className="px-4 py-1.5 rounded-lg bg-green-800/10 border  border-green-800"
                        onClick={() => {
                          toast.dismiss(t.id);
                          setIsCheckedOut(true);
                          setIsCash(false);
                        }}
                      >
                        Card
                      </button>
                      <button
                        className="px-4 py-1.5 rounded-lg bg-gray-800/10 border  border-gray-800"
                        onClick={() => {
                          toast.dismiss(t.id);
                        }}
                      >
                        Cancle
                      </button>
                    </div>
                  </div>
                ),
                {
                  duration: Infinity,
                  position: "top-center",
                }
              );
            }}
            className="px-6 py-2 text-white transition-all duration-300 border rounded-lg bg-primary border-pribg-primary hover:bg-transparent hover:text-primary"
          >
            CheckOut
          </button>
          <button
            onClick={() => {
              toast(
                (t) => (
                  <div className="text-sm">
                    <h4 className="font-semibold">
                      Do you want to clear your cart ?
                    </h4>
                    <div className="flex items-center justify-center gap-3 mt-3">
                      <button
                        className="px-4 py-1.5 rounded-lg bg-red-800/10 border text-red-500 border-red-500"
                        onClick={() => {
                          clearUserCartMutation.mutate();
                          toast.dismiss(t.id);
                        }}
                      >
                        yes
                      </button>
                      <button
                        className="px-4 py-1.5 rounded-lg bg-blue-800/10 border  border-blue-800"
                        onClick={() => toast.dismiss(t.id)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ),
                {
                  duration: Infinity,
                  position: "top-center",
                }
              );
            }}
            className="px-6 py-2 text-white transition-all duration-300 bg-red-500 border border-red-500 rounded-lg hover:bg-transparent hover:text-red-500"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </>
  );
}

import {
  FaArrowRight,
  FaCartShopping,
  FaHeart,
  FaSpinner,
  FaStar,
} from "react-icons/fa6";
import { useWishListContext } from "../../Context/WishlistContext";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import { Link } from "react-router";
import { useCart } from "../../Context/CartContext";
import emptyWishlist from "../../assets/empty.svg";

export default function WishList() {
  const {
    wishListItems,
    isLoading,
    addItemToWishListMutation,
    removeItemFromWishListMutation,
  } = useWishListContext();
  const { addItemToCartMutation } = useCart();

  const isInWishList = (id) => {
    const fountItem = wishListItems?.data.find((item) => item.id === id);
    if (fountItem) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <>
          {wishListItems?.data.length ? (
            <>
              <h2 className="mt-16 mb-10 text-3xl font-bold uppercase font-secondary">
                Wishlist Products
              </h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {wishListItems?.data?.map((product) => (
                  <div
                    key={product.id}
                    className="relative flex flex-col overflow-hidden group"
                  >
                    <button
                      onClick={() => {
                        isInWishList(product.id)
                          ? removeItemFromWishListMutation.mutate(product.id)
                          : addItemToWishListMutation.mutate(product.id);
                      }}
                      className={`absolute flex items-center justify-center transition-all duration-500 rounded-full size-8 bg-primary/10 top-3 group-hover:right-3 hover:scale-110 -right-32 ${
                        isInWishList(product.id) ? "text-red-500" : ""
                      }`}
                    >
                      <FaHeart size={18} />
                    </button>
                    <Link
                      className="flex flex-col flex-1"
                      to={`/product-details/${product.id}`}
                    >
                      <img src={product.imageCover} alt={product.title} />
                      <h3 className="my-2 font-semibold font-secondary">
                        {product.title.split(" ", 2).join(" ")}
                      </h3>
                      <p className="flex-1">
                        {product.description.split(" ", 2).join(" ")}
                      </p>
                      <div className="flex items-center justify-between my-4">
                        <span className="font-medium">{product.price} EGP</span>
                        <div className="flex items-center">
                          <FaStar className="text-yellow-500" />
                          <span>{product.ratingsAverage}</span>
                        </div>
                      </div>
                    </Link>
                    <button
                      disabled={addItemToCartMutation.isPending}
                      onClick={() => {
                        addItemToCartMutation.mutate(product.id);
                      }}
                      className="flex items-center justify-center gap-3 py-2 text-white transition-all duration-500 border rounded group-hover:translate-y-0 translate-y-3/1 bg-primary border-primary hover:text-primary hover:bg-transparent"
                    >
                      {addItemToCartMutation.isPending ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <>
                          Add to Cart
                          <FaCartShopping />
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="min-h-[calc(100vh-52px)] flex flex-col gap-10 items-center justify-center">
              <img
                className="size-80"
                src={emptyWishlist}
                alt="Empty wishlist"
              />
              <div className="flex flex-col gap-3">
                <h2 className="font-bold text-center uppercase font-secondary">
                  Wishlist is Empty
                </h2>
                <Link
                  className="flex items-center gap-3 font-semibold text-center underline"
                  to={"/products"}
                >
                  Explore Products
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

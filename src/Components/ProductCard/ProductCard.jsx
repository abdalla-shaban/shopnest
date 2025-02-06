import { FaCartShopping, FaHeart, FaSpinner, FaStar } from "react-icons/fa6";
import { Link } from "react-router";
import { useCart } from "../../Context/CartContext";
import { useWishListContext } from "../../Context/WishlistContext";

export default function ProductCard({ product }) {
  const { addItemToCartMutation } = useCart();
  const {
    addItemToWishListMutation,
    removeItemFromWishListMutation,
    wishListItems,
  } = useWishListContext();
  const isInWishList = (id) => {
    const foundItem = wishListItems?.data.find((item) => item.id === id);
    if (foundItem) {
      return true;
    } else {
      return false;
    }
  };
  return (
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
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img src={product.imageCover} alt={product.title} />
        <h3 className="my-2 font-semibold font-secondary">
          {product.title.split(" ", 2).join(" ")}
        </h3>
        <p className="flex-1">{product.description.split(" ", 2).join(" ")}</p>
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
  );
}

import { FaCartShopping, FaSpinner, FaStar } from "react-icons/fa6";
import useProducts from "../../Hooks/useProducts";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import { Link } from "react-router";
import { useCart } from "../../Context/CartContext";

export default function Products() {
  const { data, isLoading } = useProducts();
  const { addItemToCartMutation } = useCart();

  return (
    <div className="mt-16">
      <h2 className="mb-10 text-3xl font-bold uppercase font-secondary">
        Recent Products
      </h2>

      {isLoading ? (
        <CardSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {data?.data?.map((product) => (
            <div
              key={product.id}
              className="relative flex flex-col overflow-hidden group"
            >
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
      )}
    </div>
  );
}

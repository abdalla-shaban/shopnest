import { FaCartShopping, FaHeart, FaSpinner, FaStar } from "react-icons/fa6";
import Slider from "react-slick";
import { useCart } from "../../Context/CartContext";
import axios from "axios";
import { useParams } from "react-router";
import ProductDetailsSkeleton from "../ProductDetailsSkeleton/ProductDetailsSkeleton";
import { useEffect, useState } from "react";
import { useWishListContext } from "../../Context/WishlistContext";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
};

export default function ProductDetails() {
  const { productId } = useParams();
  const { addItemToCartMutation } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});
  const {
    wishListItems,
    addItemToWishListMutation,
    removeItemFromWishListMutation,
  } = useWishListContext();

  const isInWishList = (id) => {
    const foundItem = wishListItems?.data.find((item) => item.id === id);
    if (foundItem) {
      return true;
    } else {
      return false;
    }
  };
  const getProductDetails = async (productId) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/products/${productId}`
      );
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails(productId);
  }, []);

  return (
    <div className="my-10">
      {isLoading ? (
        <ProductDetailsSkeleton />
      ) : (
        <div className="flex flex-wrap items-center gap-20 md:gap-5">
          <div className="w-full max-w-full md:max-w-1/3 md:min-w-1/3 slider-container">
            <Slider {...settings}>
              {product.images.map((path) => (
                <div className="text-center" key={path}>
                  <img
                    src={path}
                    alt={product.title}
                    className="object-contain mx-auto max-w-2xs cursor-grab"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="max-w-full md:flex-1">
            <div className="flex flex-col gap-4">
              <h4 className="text-3xl font-secondary">{product.title}</h4>
              <p className="text-lg">{product.description}</p>
              <div className="flex items-center">
                <FaStar className="text-yellow-500" size={20} />
                <span>{product.ratingsAverage}</span>
              </div>
              <div>
                <span className="font-medium">{product.price} EGP</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  disabled={addItemToCartMutation.isPending}
                  onClick={() => {
                    addItemToCartMutation.mutate(product.id);
                  }}
                  className="flex items-center justify-center flex-1 gap-3 py-2 text-white transition-all duration-500 border rounded bg-primary border-primary hover:text-primary hover:bg-transparent"
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
                <button
                  onClick={() => {
                    isInWishList(product.id)
                      ? removeItemFromWishListMutation.mutate(product.id)
                      : addItemToWishListMutation.mutate(product.id);
                  }}
                  className={`flex items-center justify-center transition-all duration-500 rounded-full size-12 bg-primary/10  hover:scale-110  ${
                    isInWishList(product.id) ? "text-red-500" : ""
                  }`}
                >
                  <FaHeart size={26} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

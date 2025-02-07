import { Link } from "react-router";
import { useState } from "react";
import CartTable from "../CartTable/CartTable";
import CartSkeleton from "../CartSkeleton/CartSkeleton";
import CheckOut from "../CheckOut/CheckOut";
import { useCart } from "../../Context/CartContext";
import { FaArrowRight } from "react-icons/fa6";
import emptyCart from "../../assets/empty.svg";

export default function Cart() {
  const { data: cartItems, isLoading } = useCart();
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isCash, setIsCash] = useState(false);

  return (
    <div className="flex flex-col">
      {isCheckedOut ? (
        <CheckOut setIsCheckedOut={setIsCheckedOut} isCash={isCash} />
      ) : cartItems?.data.products?.length ? (
        <CartTable setIsCash={setIsCash} setIsCheckedOut={setIsCheckedOut} />
      ) : isLoading ? (
        <CartSkeleton />
      ) : (
        <div className="min-h-[calc(100vh-52px)] flex flex-col gap-10 items-center justify-center">
          <img className="size-80" src={emptyCart} alt="Empty Cart" />
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-center uppercase font-secondary">
              Cart is Empty
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
    </div>
  );
}

import { Link } from "react-router";
import { useEffect, useState } from "react";
import CartTable from "../CartTable/CartTable";
import { useDispatch } from "react-redux";
import { getLoggedUserCart } from "../../Store/Slices/cartSlice";
import CartSkeleton from "../CartSkeleton/CartSkeleton";
import CheckOut from "../CheckOut/CheckOut";
import { useCart } from "../../Context/CartContext";

export default function Cart() {
  const { data: cartItems, isLoading } = useCart();
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isCash, setIsCash] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedUserCart());
  }, []);
  return (
    <div className="flex flex-col">
      {isCheckedOut ? (
        <CheckOut setIsCheckedOut={setIsCheckedOut} isCash={isCash} />
      ) : cartItems?.data.products?.length ? (
        <CartTable setIsCash={setIsCash} setIsCheckedOut={setIsCheckedOut} />
      ) : isLoading ? (
        <CartSkeleton />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 mt-5">
          <h2 className="text-xl font-semibold">Cart is Empty</h2>
          <Link to={"/products"} className="underline">
            Explore Products ?
          </Link>
        </div>
      )}
    </div>
  );
}

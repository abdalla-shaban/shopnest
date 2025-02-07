import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext, useEffect } from "react";

import { useCartItems } from "../Hooks/useCart";

const headers = {
  token: localStorage.getItem("userToken"),
};

const CartContext = createContext();

const getLoggedUserCart = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart`, {
    headers,
  });
  return data;
};

const addItemToCart = async (productId) => {
  await axios.post(
    `${import.meta.env.VITE_BASE_URL}/cart`,
    { productId },
    {
      headers,
    }
  );
};

const removeItemFromCart = async (productId) => {
  await axios.delete(`${import.meta.env.VITE_BASE_URL}/cart/${productId}`, {
    headers,
  });
};

const updateItemQuantity = async ({ productId, count }) => {
  await axios.put(
    `${import.meta.env.VITE_BASE_URL}/cart/${productId}`,
    { count },
    {
      headers,
    }
  );
};

const clearUserCart = async () => {
  await axios.delete(`${import.meta.env.VITE_BASE_URL}/cart/`, {
    headers,
  });
};

export default function CartContextProvider({ children }) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["cartItems"],
    queryFn: getLoggedUserCart,
  });

  const addItemToCartMutation = useCartItems(
    addItemToCart,
    "Added Successfully!",
    "cartItems"
  );
  const removeItemFromCartMutation = useCartItems(
    removeItemFromCart,
    "Removed Successfully!",
    "cartItems"
  );
  const updateItemQuantityMutation = useCartItems(
    updateItemQuantity,
    "Quantity Updated Successfully!",
    "cartItems"
  );
  const clearUserCartMutation = useCartItems(
    clearUserCart,
    "Cleared Cart Successfully!",
    "cartItems"
  );

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        data,
        isLoading,
        isError,
        refetch,
        addItemToCartMutation,
        removeItemFromCartMutation,
        updateItemQuantityMutation,
        clearUserCartMutation,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const cartContext = useContext(CartContext);
  return cartContext;
};

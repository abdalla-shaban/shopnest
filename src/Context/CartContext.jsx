import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext, useEffect } from "react";
import { useCartItems } from "../Hooks/useCart";
import { useUserContext } from "./UserContext";

const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const { userToken } = useUserContext();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["cartItems"],
    queryFn: async function () {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/cart`,
        {
          headers: {
            token: userToken,
          },
        }
      );
      return data;
    },
    refetchOnWindowFocus: false,
  });

  const addItemToCartMutation = useCartItems(
    async (productId) => {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/cart`,
        { productId },
        {
          headers: {
            token: userToken,
          },
        }
      );
    },
    "Added Successfully!",
    "cartItems"
  );
  const removeItemFromCartMutation = useCartItems(
    async (productId) => {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/cart/${productId}`, {
        headers: { token: userToken },
      });
    },
    "Removed Successfully!",
    "cartItems"
  );
  const updateItemQuantityMutation = useCartItems(
    async ({ productId, count }) => {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/cart/${productId}`,
        { count },
        {
          headers: { token: userToken },
        }
      );
    },
    "Quantity Updated Successfully!",
    "cartItems"
  );
  const clearUserCartMutation = useCartItems(
    async () => {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/cart/`, {
        headers: {
          token: userToken,
        },
      });
    },
    "Cleared Cart Successfully!",
    "cartItems"
  );

  useEffect(() => {
    refetch();
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

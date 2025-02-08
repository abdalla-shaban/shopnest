import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext, useEffect } from "react";
import { useUserContext } from "./UserContext";
import toast from "react-hot-toast";

const WishListContext = createContext();

export default function WishlistContextProvider({ children }) {
  const { userToken } = useUserContext();
  const queryClient = useQueryClient();
  const {
    data: wishListItems,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishlistItems", userToken],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/wishlist`,
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

  const addItemToWishListMutation = useMutation({
    mutationFn: async (productId) => {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/wishlist`,
        { productId },
        {
          headers: {
            token: userToken,
          },
        }
      );
    },
    onMutate: () => {
      toast.loading("In Progress!", { id: "wishlistMutationLoading" });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["wishlistItems"] });
      toast.success("Added Successfully!", { id: "wishlistMutationLoading" });
    },
    onError: (err) => {
      toast.error(`${err}`, { id: "wishlistMutationLoading" });
    },
  });

  const removeItemFromWishListMutation = useMutation({
    mutationFn: async (productId) => {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/wishlist/${productId}`,
        {
          headers: {
            token: userToken,
          },
        }
      );
    },
    onMutate: () => {
      toast.loading("In Progress!", { id: "wishlistItemsMutation" });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["wishlistItems"] });
      toast.success("Removed Successfully!", { id: "wishlistItemsMutation" });
    },
    onError: (err) => {
      toast.error(`${err}`, { id: "wishlistItemsMutation" });
    },
  });

  useEffect(() => {
    refetch();
  }, []);
  return (
    <WishListContext.Provider
      value={{
        wishListItems,
        isLoading,
        addItemToWishListMutation,
        removeItemFromWishListMutation,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}

export const useWishListContext = () => {
  const wishListContext = useContext(WishListContext);
  return wishListContext;
};

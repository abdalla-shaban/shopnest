import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext, useEffect } from "react";
import toast from "react-hot-toast";

const WishListContext = createContext();
const headers = {
  token: localStorage.getItem("userToken"),
};

const getLoggedUserWishList = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/wishlist`,
    {
      headers,
    }
  );
  return data;
};

const addItemToWishList = async (productId) => {
  await axios.post(
    `${import.meta.env.VITE_BASE_URL}/wishlist`,
    { productId },
    { headers }
  );
};

const removeItemFromWishList = async (productId) => {
  await axios.delete(`${import.meta.env.VITE_BASE_URL}/wishlist/${productId}`, {
    headers,
  });
};

export default function WishlistContextProvider({ children }) {
  const queryClient = useQueryClient();
  const { data: wishListItems, isLoading } = useQuery({
    queryKey: ["wishlistItems"],
    queryFn: getLoggedUserWishList,
  });

  const addItemToWishListMutation = useMutation({
    mutationFn: addItemToWishList,
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
    mutationFn: removeItemFromWishList,
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
    getLoggedUserWishList();
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

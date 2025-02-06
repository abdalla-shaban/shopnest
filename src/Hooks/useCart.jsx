import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCartItems = (mutationFn, successToastMessage, ...queryKey) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn,
    onMutate: () => {
      toast.loading("in progress!", { id: "mutationToast" });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [...queryKey] });
      toast.success(successToastMessage, { id: "mutationToast" });
    },
    onError: (error) => {
      toast.error(`${error}`, { id: "mutationToast" });
    },
  });
  return mutation;
};

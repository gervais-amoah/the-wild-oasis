import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useUpdateCabin(param) {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin updated successfully");
      param?.reset?.();
      param?.closeModal?.();
    },
    onError: (err) => {
      toast.error(err);
      console.error("Error while creating a new cabin:\n", err);
    },
  });

  return { isUpdating, updateCabin };
}

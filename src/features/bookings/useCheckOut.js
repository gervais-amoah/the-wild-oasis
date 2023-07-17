import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export function useCheckOut() {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ active: true });
      toast.success(`Booking #${data.id} checked out successfully`);
    },
    onError: () =>
      toast.error("Enable to check out the booking. Please try again later"),
  });

  return { checkOut, isCheckingOut };
}

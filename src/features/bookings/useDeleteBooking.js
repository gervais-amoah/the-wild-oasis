import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: deleteBooking,
    isLoading: isDeleting,
    error,
  } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success(`Booking  deleted with success`);
      navigate("/bookings");
    },
    onError: (err) => toast.success(err),
  });

  return { deleteBooking, isDeleting };
}

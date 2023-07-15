import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getBookings } from "../../services/apiBookings";

export default function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryFn: getBookings,
    queryKey: ["bookings"],
    onError: (err) => toast.error(err),
  });

  return { isLoading, bookings, error };
}

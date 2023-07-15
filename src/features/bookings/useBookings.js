import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export default function useBookings() {
  const [searchParams] = useSearchParams();

  const filterStatus = searchParams.get("status");
  const filter =
    !filterStatus || filterStatus === "all"
      ? null
      : { field: "status", value: filterStatus };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryFn: () => getBookings({ filter }),
    queryKey: ["bookings", filter?.value],
    onError: (err) => toast.error(err),
  });

  return { isLoading, bookings, error };
}

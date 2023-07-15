import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

export default function useBookings() {
  const [searchParams] = useSearchParams();

  // Fiter
  const filterStatus = searchParams.get("status");
  const filter =
    !filterStatus || filterStatus === "all"
      ? null
      : { field: "status", value: filterStatus };

  // Sort
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortBy.split("-");
  const ascending = direction === "asc";
  const sort = { field, ascending };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryFn: () => getBookings({ filter, sort }),
    queryKey: ["bookings", { filter: filter?.value }, sort],
    onError: (err) => toast.error(err),
  });

  return { isLoading, bookings, error };
}

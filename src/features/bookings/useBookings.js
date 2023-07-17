import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

export default function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //  Fiter
  const filterStatus = searchParams.get("status");
  const filter =
    !filterStatus || filterStatus === "all"
      ? null
      : { field: "status", value: filterStatus };

  //  Sort
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortBy.split("-");
  const ascending = direction === "asc";
  const sort = { field, ascending };

  //  Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //  Query
  const {
    isLoading,
    data: { count, data: bookings } = {},
    error,
  } = useQuery({
    queryFn: () => getBookings({ filter, sort, page }),
    queryKey: ["bookings", { filter: filter?.value }, sort, page],
    onError: (err) => toast.error(err),
  });

  //  Pre-fetching
  const limit = Math.ceil(count / PAGE_SIZE);

  if (page < limit) {
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sort, page: page === page + 1 }),
      queryKey: ["bookings", { filter: filter?.value }, sort, page + 1],
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sort, page: page === page - 1 }),
      queryKey: ["bookings", { filter: filter?.value }, sort, page - 1],
    });
  }

  return { isLoading, bookings, count, error };
}

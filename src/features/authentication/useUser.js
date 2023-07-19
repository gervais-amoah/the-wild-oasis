import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { VISITOR } from "../../../visitor";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });

  return {
    user,
    isAuthenticated: user?.role === "authenticated",
    isLoading,
    isVisitor: user?.email === VISITOR,
  };
}

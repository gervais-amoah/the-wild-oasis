import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupApi({ fullName, email, password }),
    onSuccess: (user) => {
      toast.success(
        "New user account created successfully. New user must check his/her email for confirmation link."
      );
    },
    onError: () => toast.error("Error while trying to create the new user"),
  });

  return { signup, isLoading };
}

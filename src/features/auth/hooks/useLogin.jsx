import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "@/hooks/auth/useAuth";
import { usePostMutation } from "@/hooks-v2/api/usePostMutation";

export default function useLogin() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const { mutate, isPending, isError } = usePostMutation({
    endpoint: "/api/v1/auth/login",
  });

  const handleLogin = (credentials) => {
    mutate(credentials, {
      onSuccess: (data) => {
        if (data?.success === false) {
          toast.error(data?.message);
          return;
        }

        // redirect super admin
        if (
          data?.message === "login Successfull" &&
          data?.data?.role === "superadmin"
        ) {
          const authInfo = { token: data?.token, data: data?.data };
          setUser(authInfo);
          toast.success("Login Successfull");
          navigate("/super-admin/packages");
        } else if (
          data?.message === "login Successfull" &&
          data?.data?.role === "user"
        ) {
          const authInfo = { token: data?.token, data: data?.data };
          setUser(authInfo);
          toast.success("Login Successfull");
          navigate("/");
        }
      },

      onError: (error) => {
        console.log(error);
      },
    });
  };

  return { handleLogin, isPending, isError };
}

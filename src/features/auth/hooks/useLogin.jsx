import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "@/hooks/auth/useAuth";
import usePostMutation from "@/hooks-v2/api/usePostMutation";

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

        // detect role and redirect accordingly
        if (data?.message === "Login successful") {
          const roles = data?.data?.data?.roles || [];
          const isSuperAdmin = roles.find(
            (role) => role.role_name === "Super Admin",
          );

          const authInfo = {
            token: data?.data?.token,
            data: data?.data?.data,
          };

          setUser(authInfo);
          toast.success("Login Successfull");

          if (isSuperAdmin) {
            navigate("/super-admin/packages");
          } else {
            navigate("/");
          }
        }
      },

      onError: (error) => {
        console.log(error);
      },
    });
  };

  return { handleLogin, isPending, isError };
}

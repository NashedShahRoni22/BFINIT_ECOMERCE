import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { AuthContext } from "../../../Providers/AuthProvider";
import usePostMutation from "../../../hooks/usePostMutation";
import toast from "react-hot-toast";
import Spinner from "../../../components/admin/loaders/Spinner";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [showPass, setShowPass] = useState(false);

  const { mutate, isPending } = usePostMutation({ endpoint: "/clients/login" });

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const loginInfo = {
      email: form.email.value,
      password: form.password.value,
    };

    mutate(loginInfo, {
      onSuccess: (data) => {
        if (data.message === "login Successfull") {
          toast.success("Login success!");
          const authInfo = { token: data.token, data: data.data };
          setUser(authInfo);
          localStorage.setItem("authInfo", JSON.stringify(authInfo));
          navigate(from, { replace: true });
        }
      },
    });
  };

  return (
    <section className="font-inter flex min-h-screen flex-col justify-center bg-gradient-to-r from-[#4b6cb7] to-[#182848]">
      <form
        onSubmit={handleLogin}
        className="mx-auto w-full rounded-md bg-white px-12 py-6 md:max-w-xl"
      >
        <h1 className="font-poppins text-center text-3xl font-semibold">
          Log in
        </h1>
        <p className="mt-2 text-center text-sm font-medium text-neutral-500">
          Continue to BFINIT Ecommerce
        </p>
        <div className="mt-4">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="mt-1 w-full rounded border px-4 py-1.5 outline-none"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <div className="relative mt-1">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              required
              className="w-full rounded border py-1.5 pr-10 pl-4 outline-none"
            />
            {showPass ? (
              <MdOutlineVisibility
                onClick={() => setShowPass((prev) => !prev)}
                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-2xl"
              />
            ) : (
              <MdOutlineVisibilityOff
                onClick={() => setShowPass((prev) => !prev)}
                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-2xl"
              />
            )}
          </div>
        </div>

        <button
          className={`mt-6 flex min-h-10 w-full items-center justify-center rounded bg-indigo-500 py-2 text-white transition-all duration-200 ease-linear ${!isPending && "cursor-pointer hover:bg-indigo-600"}`}
          type="submit"
          disabled={isPending}
        >
          {isPending ? <Spinner /> : "Login"}
        </button>

        <div className="mt-6 space-x-2 text-center">
          <Link to="/" className="text-xs text-neutral-500 hover:underline">
            Help
          </Link>
          <Link to="/" className="text-xs text-neutral-500 hover:underline">
            Privacy Policy
          </Link>
          <Link to="/" className="text-xs text-neutral-500 hover:underline">
            Terms & Conditions
          </Link>
        </div>
      </form>
    </section>
  );
}

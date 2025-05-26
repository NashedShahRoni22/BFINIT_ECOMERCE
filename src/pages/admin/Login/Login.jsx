import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { AuthContext } from "../../../Providers/AuthProvider";
import usePostMutation from "../../../hooks/mutations/usePostMutation";
import toast from "react-hot-toast";
import Spinner from "../../../components/admin/loaders/Spinner";
import bfinitLogo from "../../../assets/logo/bfinit.png";

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
    <section className="font-inter flex min-h-screen flex-col justify-center bg-gray-50 py-10 md:py-0">
      <div className="mx-auto w-full max-w-md px-4">
        {/* Brand Identity Section */}
        <div className="mb-8 flex flex-col items-center">
          <img src={bfinitLogo} alt="Brand Logo" className="h-8" />
          <p className="mt-2 text-sm text-gray-600">Multivendor Dashboard</p>
        </div>

        {/* Login Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-500">
              Sign in to your vendor account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  placeholder="Enter your password"
                  className="block w-full rounded-lg border border-gray-200 px-4 py-2.5 pr-10 text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((prev) => !prev)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer bg-white text-gray-400 hover:text-gray-500"
                >
                  {showPass ? (
                    <MdOutlineVisibility className="h-5 w-5" />
                  ) : (
                    <MdOutlineVisibilityOff className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className={`flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors ${!isPending ? "cursor-pointer hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" : "cursor-not-allowed opacity-70"}`}
            >
              {isPending ? <Spinner /> : "Sign in"}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>
              By continuing, you agree to our{" "}
              <Link
                to="/terms"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            No account?{" "}
            <Link
              to="https://bfinit.com/bfinit-ecomerce-platform"
              target="_blanck"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Buy a Pack to start
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

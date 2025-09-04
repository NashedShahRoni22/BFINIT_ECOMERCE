import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff, LoaderCircle } from "lucide-react";
import useGetStorePreference from "../../../hooks/stores/useGetStorePreference";
import usePostMutation from "../../../hooks/mutations/usePostMutation";
import useCustomer from "../../../hooks/auth/useCustomer";

const EcommerceLogin = () => {
  const { storeId } = useParams();
  const { handleSetCustomer } = useCustomer();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // store info get api
  const { data } = useGetStorePreference(storeId);

  // custom post mutation hook for login
  const { mutate, isPending } = usePostMutation({
    endpoint: "/customer/auth/login",
    storeId,
  });

  // form submit handler
  const handleSubmit = async () => {
    if (!email || !password) {
      return toast.error("Email & Password is required!");
    }

    const payload = { email, password };

    mutate(payload, {
      onSuccess: (data) => {
        toast.success(data?.message || "You have successfully logged in!");
        handleSetCustomer(data);
        navigate(`/preview/${storeId}`);
      },
      onError: (error) => {
        console.error("Login error:", error);
        toast.error(error?.message || "Unable to login. Please try again.");
      },
    });
  };

  return (
    <section className="flex min-h-screen flex-col justify-center bg-gray-50 py-10">
      <div className="mx-auto w-full max-w-md px-4">
        {/* Brand Identity Section */}
        <div className="mb-8 flex flex-col items-center">
          <div className="bg-primary mb-2 flex h-12 w-12 items-center justify-center rounded-lg">
            <img
              src={`https://ecomback.bfinit.com${data?.storeLogo}`}
              alt={`logo of ${data?.storeName}`}
              className="size-10 object-contain"
            />
          </div>
          <h1 className="text-primary text-xl font-semibold">
            {data?.storeName}
          </h1>
        </div>

        {/* Login Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-500">
              Sign in to your account
            </p>
          </div>

          <form className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:border-accent focus:ring-accent block w-full rounded-lg border border-gray-200 py-2.5 pr-4 pl-10 text-sm outline-none focus:ring-1"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-accent text-xs font-medium hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:border-accent focus:ring-accent block w-full rounded-lg border border-gray-200 py-2.5 pr-12 pl-10 text-sm outline-none focus:ring-1"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isPending}
              className={`bg-accent flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors ${isPending ? "cursor-not-allowed opacity-75" : "cursor-pointer hover:opacity-90"}`}
            >
              Sign in
              {isPending && <LoaderCircle size={15} className="animate-spin" />}
            </button>
          </form>

          {/* Terms and Privacy */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>
              By continuing, you agree to our{" "}
              <Link
                to={`/preview/${storeId}/terms-conditions`}
                type="button"
                className="text-accent font-medium hover:underline"
              >
                Terms & Conditions
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            No account?{" "}
            <Link
              to={`/preview/${storeId}/signup`}
              type="button"
              className="text-accent font-medium hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default EcommerceLogin;

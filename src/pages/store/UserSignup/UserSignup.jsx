import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LoaderCircle, User } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import useCustomer from "../../../hooks/auth/useCustomer";
import useGetStorePreference from "../../../hooks/stores/useGetStorePreference";
import usePostMutation from "../../../hooks/mutations/usePostMutation";
import toast from "react-hot-toast";

const EcommerceSignup = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const { handleSetCustomer } = useCustomer();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // store info get api
  const { data } = useGetStorePreference(storeId);

  // custom post mutation hook for login
  const { mutate, isPending } = usePostMutation({
    endpoint: "/customer/auth/onboard",
    storeId,
  });

  // form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("Name, Email & Password is required!");
    }

    const payload = { name, email, password };

    mutate(payload, {
      onSuccess: (data) => {
        toast.success(
          data?.message || "Your account has been created successfully!",
        );
        handleSetCustomer(data);
        navigate(`/preview/${storeId}`);
      },
      onError: (error) => {
        console.error("Login error:", error);
        toast.error(
          error?.message || "Unable to create account. Please try again.",
        );
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

        {/* Signup Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
            <p className="mt-1 text-sm text-gray-500">Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Full name
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
                />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="focus:border-accent focus:ring-accent block w-full rounded-lg border border-gray-200 py-2.5 pr-4 pl-10 text-sm outline-none focus:ring-1"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

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
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Password
              </label>
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
                  placeholder="Create a password"
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

            {/* Signup Button */}
            <button
              type="submit"
              disabled={isPending}
              className={`bg-accent flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors ${isPending ? "cursor-not-allowed opacity-75" : "cursor-pointer hover:opacity-90"}`}
            >
              Create account
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

        {/* Login Link */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Already have an account?{" "}
            <Link
              to={`/preview/${storeId}/login`}
              className="text-accent font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default EcommerceSignup;

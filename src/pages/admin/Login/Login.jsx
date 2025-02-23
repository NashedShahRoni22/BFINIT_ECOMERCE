import { useState } from "react";
import { Link } from "react-router";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

export default function Login() {
  const [showPass, setShowPass] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
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
          type="submit"
          className="mt-6 w-full cursor-pointer rounded bg-indigo-500 py-2 text-white transition-all duration-200 ease-linear hover:bg-indigo-600"
        >
          Login
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

import useCustomer from "../../../hooks/auth/useCustomer";

export default function CustomerProfile() {
  const { customer } = useCustomer();

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-gray-200 px-4 py-6">
        <h2 className="text-lg font-semibold">Personal Information</h2>

        <form className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* name */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Full Name</p>
            <p className="text-sm">{customer?.data?.name}</p>
          </div>

          {/* email */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm">{customer?.data?.email}</p>
          </div>

          {/* submit btn */}
          {/* <div className="col-span-2 flex justify-end">
            <button className="bg-accent text-on-primary cursor-pointer rounded px-3 py-2 text-xs font-medium">
              Save Changes
            </button>
          </div> */}
        </form>
      </div>

      <div className="rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold">Change Password</h2>

        <form className="mt-4 grid grid-cols-1 gap-y-6">
          {/* current password */}
          <div className="col-span-full flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium">
              Current Password
            </label>
            <input
              id="password"
              type="password"
              className="focus:border-accent w-full rounded-lg border border-gray-300 px-4 py-2 outline-none"
            />
          </div>

          {/* new password */}
          <div className="col-span-full flex flex-col gap-2">
            <label htmlFor="newPassword" className="text-sm font-medium">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              className="focus:border-accent w-full rounded-lg border border-gray-300 px-4 py-2 outline-none"
            />
            <span className="mt-1 text-xs text-gray-500">
              Password must be at least 8 characters
            </span>
          </div>

          <div className="col-span-full flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="focus:border-accent w-full rounded-lg border border-gray-300 px-4 py-2 outline-none"
            />
          </div>

          {/* submit btn */}
          <div className="col-span-2 flex justify-end">
            <button className="bg-accent text-on-primary cursor-pointer rounded px-3 py-2 text-xs font-medium">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

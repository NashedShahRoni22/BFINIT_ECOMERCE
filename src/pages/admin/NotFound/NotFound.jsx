import { Link } from "react-router";
import { FiAlertTriangle, FiHome, FiMail } from "react-icons/fi";
import bfinitLogo from "../../../assets/logo/bfinit.png";

const NotFoundPage = ({ isAdmin = false }) => {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 px-5 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex items-center justify-center">
            <img src={bfinitLogo} alt="bfinit logo" className="h-9" />
          </div>
        </div>

        <div className="mt-8 bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <FiAlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
              404 - Page Not Found
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isAdmin
                ? "The requested admin page could not be found."
                : "Oops! The page you're looking for doesn't exist or has been moved."}
            </p>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  What would you like to do?
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <Link
                to={isAdmin ? "/admin/dashboard" : "/"}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
              >
                <FiHome className="mr-2" />
                Go to {isAdmin ? "Dashboard" : "Homepage"}
              </Link>

              {!isAdmin && (
                <>
                  <Link
                    to="/contact"
                    className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                  >
                    <FiMail className="mr-2" />
                    Contact Support
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            {isAdmin
              ? "Having trouble? Contact your system administrator."
              : "Need help? Our support team is available 24/7."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

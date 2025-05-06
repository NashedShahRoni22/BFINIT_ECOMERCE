import { Link, useParams } from "react-router";
import { BsEnvelopeCheck } from "react-icons/bs";
import { CiCircleCheck } from "react-icons/ci";

export function OrderSuccess() {
  const { storeId } = useParams();

  return (
    <div className="border-accent/25 mx-auto my-10 max-w-2xl rounded-lg border bg-white p-6 md:my-20">
      <div className="flex flex-col items-center text-center">
        <CiCircleCheck className="text-accent mb-4 h-16 w-16" />

        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Order Placed Successfully!
        </h2>

        <p className="mb-6 text-gray-500">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        <div className="flex w-full items-center justify-center rounded-lg bg-gray-100 px-4 py-3">
          <BsEnvelopeCheck className="mr-2 h-5 w-5 text-gray-500" />
          <span className="text-gray-700">
            A confirmation has been sent to your email
          </span>
        </div>

        <Link
          to={`/preview/${storeId}`}
          className="border-accent hover:bg-accent/85 text-on-primary bg-accent hover:text-on-primary mt-8 cursor-pointer rounded-md border px-6 py-2 font-medium transition-all duration-200 ease-in-out"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

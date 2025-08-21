import { CiCircleQuestion } from "react-icons/ci";

export default function EmptyContent({ title, description }) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="max-w-md text-center">
        <div className="mb-6 text-center">
          <CiCircleQuestion className="mx-auto size-20 text-gray-400" />
        </div>

        <h2 className="mb-3 text-2xl font-bold text-gray-900">{title}</h2>

        <p className="mb-6 text-gray-600">{description}</p>
      </div>
    </div>
  );
}

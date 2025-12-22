import { Spinner } from "@/components/ui/spinner";

export default function BtnSubmit({ isPending, label }) {
  return (
    <button
      type="submit"
      className="bg-dashboard-primary/90 hover:bg-dashboard-primary flex min-h-10 w-full cursor-pointer items-center justify-center rounded px-4 py-2 text-white transition-all duration-200 ease-in-out"
    >
      {isPending ? <Spinner /> : label}
    </button>
  );
}

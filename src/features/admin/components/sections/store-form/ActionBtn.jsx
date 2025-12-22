import { Spinner } from "@/components/ui/spinner";

export default function ActionBtn({
  type = "button",
  disabled,
  onClick,
  loading = false,
  children,
}) {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
      className={`flex min-h-9 items-center justify-center gap-1 rounded px-5 py-2 whitespace-nowrap text-white transition-all duration-200 ease-linear ${
        loading || disabled
          ? "bg-dashboard-primary/50 cursor-default"
          : "bg-dashboard-primary cursor-pointer active:scale-[0.98]"
      }`}
    >
      {children}
      {loading && <Spinner className="size-5 animate-spin" />}
    </button>
  );
}

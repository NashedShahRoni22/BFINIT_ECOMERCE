import { LiaSpinnerSolid } from "react-icons/lia";

export default function ActionBtn({
  type = "button",
  onClick,
  loading = false,
  width = "min-w-[164px]",
  children,
}) {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className={`bg-dashboard-primary hover:bg-dashboard-primary/90 relative flex min-h-9 items-center justify-center rounded px-5 py-2 text-white transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70 ${width} ${loading ? "cursor-default" : "cursor-pointer"}`}
    >
      <span
        className={`transition-opacity ${loading ? "opacity-0" : "opacity-100"}`}
      >
        {children}
      </span>

      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <LiaSpinnerSolid className="size-5 animate-spin" />
        </span>
      )}
    </button>
  );
}

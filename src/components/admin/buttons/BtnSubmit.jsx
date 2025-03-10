export default function BtnSubmit({ label }) {
  return (
    <button
      type="submit"
      className="bg-dashboard-primary/90 hover:bg-dashboard-primary w-full cursor-pointer rounded px-4 py-2 text-white transition-all duration-200 ease-in-out"
    >
      {label}
    </button>
  );
}

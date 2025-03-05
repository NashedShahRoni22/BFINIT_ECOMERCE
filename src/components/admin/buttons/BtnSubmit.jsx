export default function BtnSubmit({ label }) {
  return (
    <button
      type="submit"
      className="bg-primary/90 hover:bg-primary cursor-pointer rounded px-4 py-1 text-white transition duration-200 ease-in-out"
    >
      {label}
    </button>
  );
}

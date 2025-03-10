import useCart from "../../../hooks/useCart";

export default function ProductCard({ p }) {
  const { handleAddToCart } = useCart();

  return (
    <div className="flex flex-col items-center gap-2.5 rounded p-4 shadow">
      <img src={p.image} alt="" className="h-[250px]" />
      <h5>{p.title}</h5>
      {/* <p>{p.ratings}</p> */}
      <p className="font-semibold">{p.price}</p>
      <button
        onClick={() => handleAddToCart(p)}
        className="w-full cursor-pointer rounded border px-2 py-1"
      >
        Buy Now
      </button>
    </div>
  );
}

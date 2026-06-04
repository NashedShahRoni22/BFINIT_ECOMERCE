import { useEffect, useState } from "react";
import { X } from "lucide-react";

const ProductDetails = ({ product, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setSelectedSize(null);
  }, [product]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 400);
  };

  if (!product) {
    return null;
  }

  const formattedPrice =
    typeof product.price === "number"
      ? product.price.toFixed(2)
      : parseFloat(product.price || 0).toFixed(2);

  return (
    // <>
    //   {/* Backdrop */}
    //   <div
    //     onClick={handleClose}
    //     style={{
    //       position: "fixed",
    //       inset: 0,
    //       zIndex: 998,
    //       backgroundColor: "rgba(0,0,0,0.5)",
    //       opacity: visible ? 1 : 0,
    //       transition: "opacity 400ms ease-in-out",
    //     }}
    //   />

    //   {/* Drawer  */}
    //   <div
    //     style={{
    //       position: "fixed",
    //       top: 0,
    //       right: 0,
    //       zIndex: 999,
    //       height: "100%",
    //       width: "100%",
    //       maxWidth: "448px",
    //       overflowY: "auto",
    //       backgroundColor: "#ffffff",
    //       boxShadow: "-8px 0 32px rgba(0,0,0,0.15)",
    //       transform: visible ? "translateX(0)" : "translateX(100%)",
    //       transition: "transform 400ms ease-in-out",
    //     }}
    //   >
    //     <div
    //       style={{
    //         position: "sticky",
    //         top: 0,
    //         zIndex: 10,
    //         display: "flex",
    //         alignItems: "center",
    //         justifyContent: "space-between",
    //         borderBottom: "1px solid #f0f0f0",
    //         backgroundColor: "#ffffff",
    //         padding: "16px 24px",
    //       }}
    //     >
    //       <span
    //         style={{
    //           fontSize: "11px",
    //           fontWeight: 600,
    //           letterSpacing: "0.12em",
    //           textTransform: "uppercase",
    //           color: "#888",
    //         }}
    //       >
    //         Quick View
    //       </span>
    //       <button
    //         onClick={handleClose}
    //         style={{
    //           display: "flex",
    //           alignItems: "center",
    //           justifyContent: "center",
    //           width: "32px",
    //           height: "32px",
    //           borderRadius: "50%",
    //           border: "none",
    //           background: "transparent",
    //           cursor: "pointer",
    //         }}
    //       >
    //         <X size={18} />
    //       </button>
    //     </div>

    //     {/* Body */}
    //     <div
    //       style={{
    //         padding: "24px",
    //         display: "flex",
    //         flexDirection: "column",
    //         gap: "24px",
    //       }}
    //     >
    //       <div
    //         style={{
    //           display: "grid",
    //           gridTemplateColumns: "1fr 1fr",
    //           gap: "8px",
    //         }}
    //       >
    //         {product.image ? (
    //           <>
    //             <img
    //               src={product.image}
    //               alt={product.title || "Product"}
    //               style={{
    //                 width: "100%",
    //                 aspectRatio: "3/4",
    //                 objectFit: "cover",
    //               }}
    //               onError={(e) => {
    //                 e.target.style.background = "#eee";
    //               }}
    //             />
    //             <img
    //               src={product.image}
    //               alt={product.title || "Product"}
    //               style={{
    //                 width: "100%",
    //                 aspectRatio: "3/4",
    //                 objectFit: "cover",
    //               }}
    //               onError={(e) => {
    //                 e.target.style.background = "#eee";
    //               }}
    //             />
    //           </>
    //         ) : (
    //           <div
    //             style={{
    //               gridColumn: "span 2",
    //               height: "200px",
    //               background: "#f0f0f0",
    //               display: "flex",
    //               alignItems: "center",
    //               justifyContent: "center",
    //               color: "#aaa",
    //             }}
    //           >
    //             No image
    //           </div>
    //         )}
    //       </div>

    //       <div>
    //         <h2
    //           style={{
    //             fontSize: "18px",
    //             fontWeight: 700,
    //             textTransform: "uppercase",
    //             letterSpacing: "0.05em",
    //             margin: 0,
    //           }}
    //         >
    //           {product.title || "Untitled Product"}
    //         </h2>
    //         <p style={{ fontSize: "16px", margin: "4px 0 0" }}>
    //           €{formattedPrice}
    //         </p>
    //         {product.availability && (
    //           <p style={{ fontSize: "12px", color: "#888", margin: "4px 0 0" }}>
    //             {product.availability}
    //           </p>
    //         )}
    //       </div>

    //       <div>
    //         <p
    //           style={{
    //             fontSize: "13px",
    //             fontWeight: 600,
    //             marginBottom: "10px",
    //           }}
    //         >
    //           SIZE
    //         </p>
    //         <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
    //           {["XS", "S", "M", "L", "XL"].map((size) => (
    //             <button
    //               key={size}
    //               onClick={() => setSelectedSize(size)}
    //               style={{
    //                 border: `1px solid ${selectedSize === size ? "#000" : "#d0d0d0"}`,
    //                 backgroundColor:
    //                   selectedSize === size ? "#000" : "transparent",
    //                 color: selectedSize === size ? "#fff" : "#000",
    //                 padding: "8px 16px",
    //                 fontSize: "13px",
    //                 cursor: "pointer",
    //                 transition: "all 200ms",
    //               }}
    //             >
    //               {size}
    //             </button>
    //           ))}
    //         </div>
    //       </div>

    //       <div
    //         style={{
    //           display: "flex",
    //           flexDirection: "column",
    //           gap: "12px",
    //           paddingTop: "8px",
    //         }}
    //       >
    //         <button
    //           style={{
    //             width: "100%",
    //             padding: "14px",
    //             backgroundColor: "#000",
    //             color: "#fff",
    //             border: "none",
    //             fontSize: "13px",
    //             fontWeight: 600,
    //             letterSpacing: "0.1em",
    //             textTransform: "uppercase",
    //             cursor: "pointer",
    //           }}
    //         >
    //           Add to Cart
    //         </button>
    //         <button
    //           style={{
    //             width: "100%",
    //             padding: "14px",
    //             backgroundColor: "transparent",
    //             color: "#000",
    //             border: "1px solid #000",
    //             fontSize: "13px",
    //             fontWeight: 600,
    //             letterSpacing: "0.1em",
    //             textTransform: "uppercase",
    //             cursor: "pointer",
    //           }}
    //         >
    //           Buy It Now
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-998 bg-black/50 transition-opacity duration-400 ease-in-out ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-999 h-full w-full max-w-md transform overflow-y-auto bg-white shadow-[-8px_0_32px_rgba(0,0,0,0.15)] transition-transform duration-400 ease-in-out ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#f0f0f0] bg-white px-6 py-4">
          <span className="text-[11px] font-semibold tracking-[0.12em] text-[#888] uppercase">
            Quick View
          </span>

          <button
            onClick={handleClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-6 p-6">
          <div className="grid grid-cols-2 gap-2">
            {product.image ? (
              <>
                <img
                  src={product.image}
                  alt={product.title || "Product"}
                  className="aspect-3/4 w-full object-cover"
                  onError={(e) => {
                    e.target.style.background = "#eee";
                  }}
                />
                <img
                  src={product.image}
                  alt={product.title || "Product"}
                  className="aspect-3/4 w-full object-cover"
                  onError={(e) => {
                    e.target.style.background = "#eee";
                  }}
                />
              </>
            ) : (
              <div className="col-span-2 flex h-[200px] items-center justify-center bg-[#f0f0f0] text-[#aaa]">
                No image
              </div>
            )}
          </div>

          <div>
            <h2 className="m-0 text-[18px] font-bold tracking-[0.05em] uppercase">
              {product.title || "Untitled Product"}
            </h2>

            <p className="mt-1 mb-0 text-[16px]">€{formattedPrice}</p>

            {product.availability && (
              <p className="mt-1 mb-0 text-[12px] text-[#888]">
                {product.availability}
              </p>
            )}
          </div>

          <div>
            <p className="mb-2.5 text-[13px] font-semibold">SIZE</p>

            <div className="flex flex-wrap gap-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`cursor-pointer border px-4 py-2 text-[13px] transition-all duration-200 ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-[#d0d0d0] bg-transparent text-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button className="w-full cursor-pointer border-none bg-black py-3.5 text-[13px] font-semibold tracking-widest text-white uppercase">
              Add to Cart
            </button>

            <button className="w-full cursor-pointer border border-black bg-transparent py-3.5 text-[13px] font-semibold tracking-widest text-black uppercase">
              Buy It Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

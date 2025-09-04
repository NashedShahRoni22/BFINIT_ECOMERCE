import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ecommerceTips } from "../../../data/adminData/ecomerceTips";

export default function QuickTips() {
  const [show, setShow] = useState({
    id: null,
    state: false,
  });

  // toggle function
  const toggleTip = (index) => {
    setShow((prev) => ({
      id: prev.id === index ? null : index,
      state: prev.id === index ? false : true,
    }));
  };

  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
      {ecommerceTips.map((tip, index) => (
        <div
          key={index}
          className="min-w-full border-b border-gray-200 px-4 last:border-0 hover:bg-gray-50"
        >
          <button
            onClick={() => toggleTip(index)}
            className="flex w-full cursor-pointer items-center justify-between py-4"
          >
            <h3 className="text-sm font-medium">{tip.question}</h3>
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ease-linear ${show.id === index && show.state && "rotate-180"}`}
            />
          </button>

          <div
            className={`grid overflow-hidden opacity-100 transition-all duration-200 ease-linear ${show.id === index && show.state ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"}`}
          >
            <p className="overflow-hidden text-sm">{tip.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

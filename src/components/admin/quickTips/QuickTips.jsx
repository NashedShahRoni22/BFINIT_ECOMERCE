import { useState } from "react";
import { FaMinus, FaPlusSquare } from "react-icons/fa";
import { ecommerceTips } from "../../../data/adminData/ecomerceTips";

export default function QuickTips() {
  const [show, setShow] = useState({
    id: null,
    state: false,
  });
  return (
    <div className="grid gap-4">
      {ecommerceTips.map((tip, index) => (
        <div
          key={index}
          className="border-dashboard-primary min-w-full border-b !p-4"
        >
          <div className="flex items-center justify-between">
            <h5 className="!my-2.5 w-5/6 font-semibold">{tip.question}</h5>
            <div>
              {show.id === index && show.state ? (
                <FaMinus
                  onClick={() => {
                    setShow({
                      id: null,
                      state: false,
                    });
                  }}
                  className="text-dashboard-primary cursor-pointer text-2xl"
                />
              ) : (
                <FaPlusSquare
                  onClick={() => {
                    setShow({
                      id: index,
                      state: true,
                    });
                  }}
                  className="text-dashboard-primary cursor-pointer text-2xl"
                />
              )}
            </div>
          </div>
          {show.id === index && show.state && (
            <p className="text-gray-600">{tip.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}

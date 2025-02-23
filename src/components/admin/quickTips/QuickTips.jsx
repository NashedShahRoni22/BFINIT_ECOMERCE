import React, { useState } from "react";
import { FaMinus, FaPlusSquare } from "react-icons/fa";
import { ecommerceTips } from "../../../data/adminData/ecomerceTips";

export default function QuickTips() {
  const [show, setShow] = useState({
    id: null,
    state: false,
  });
  return <div className="grid gap-4">
  {ecommerceTips.map((tip, index) => (
    <div
      key={index}
      className="!p-4 min-w-full border-b border-primary"
    >
      <div className="flex justify-between items-center">
        <h5 className="font-semibold !my-2.5 w-5/6">{tip.question}</h5>
        <div>
          {show.id === index && show.state ? (
            <FaMinus onClick={()=>{
              setShow({
                  id:null,
                  state:false,
              })
            }} className="text-2xl cursor-pointer text-primary" />
          ) : (
            <FaPlusSquare onClick={()=>{
              setShow({
                  id:index,
                  state:true,
              })
            }} className="text-2xl cursor-pointer text-primary" />
          )}
        </div>
      </div>
      {show.id === index && show.state && (
        <p className="text-gray-600">{tip.answer}</p>
      )}
    </div>
  ))}
</div>;
}

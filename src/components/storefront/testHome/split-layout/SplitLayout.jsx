import React from "react";

const SplitLayout = () => {
  const model1 =
    "https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div>
      <img src={model1} alt="" className="h-full w-full" />
      <div>
        <h2 className="text-primary text-6xl font-black">
          some text are coming soon...
        </h2>
      </div>
    </div>
  );
};

export default SplitLayout;

import React from "react";

const Summarycard = ({ icon, text, number, color }) => {
  return (
    <div className=" rounded-md flex bg-white">
      <div
        className={`text-3xl flex justify-center items-center ${color} text-white px-4 rounded-md`}
      >
        {icon}
      </div>
      <div className="pl-4 py-1">
        <p className="text-lg font-light">{text}</p>
        <p className="text-xl font-bold">{number}</p>
      </div>
    </div>
  );
};

export default Summarycard;

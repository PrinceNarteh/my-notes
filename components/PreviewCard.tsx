import React from "react";
import { BsBell } from "react-icons/bs";

const PreviewCard = () => {
  return (
    <div className="relative px-1 py-2 ml-5 space-y-1 rounded-sm hover:bg-gray-700 cursor-pointer hover:border hover:border-gray-600">
      <span className="block absolute -left-5 top-4 w-2.5 h-2.5 bg-orange-500 rounded-full items-center"></span>
      <h3 className="font-semibold text-sm">Shopping List</h3>
      <p className="text-sm text-gray-600 font-semibold truncate">
        16/12/2022 Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Consectetur et error neque, debitis voluptates aut fugit veniam deleniti
        natus sapiente reiciendis totam dolore facere quis expedita blanditiis
        culpa! Accusantium, modi!
      </p>
      <div className="flex text-[8px] items-center space-x-0.5 font-semibold bg-blue-500/20 w-fit px-2 py-0.5 rounded-full">
        <BsBell className="font-bold" />
        <span>15 FEB</span>
        <span>15:00</span>
      </div>
    </div>
  );
};

export default PreviewCard;

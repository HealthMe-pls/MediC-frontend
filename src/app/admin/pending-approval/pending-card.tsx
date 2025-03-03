import React, { useState } from "react";
import PendingModal from "./pending-modal";

type PendingCardProps = {
  id: string;
  name: string;
};

export default function PendingCard({ id, name }: PendingCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div
      key={id}
      className="w-4/5 min-h-[135px] border py-6 px-8 rounded-[10px] border-[1px] border-[#CECECE] bg-white flex flex-col justify-between"
    >
      <h2 className="text-lg font-normal mb-2">{`"${name}" is waiting for its information to be approved.`}</h2>
      <div className="flex justify-end space-x-2 mt-auto">
        <button
          className="bg-[#DBDBDB] w-[145px] h-[35px] rounded-[20px]"
          onClick={handleModalToggle}
        >
          Check Details
        </button>
        <button className="bg-white border-[#E77577] text-[#E77577] border-[1px] w-[145px] h-[35px] rounded-[20px]">
          Decline
        </button>
        <button className="bg-[#D5EBD6] w-[145px] h-[35px] rounded-[20px]">
          Approve
        </button>
      </div>
      {isModalOpen && (
        <PendingModal onClose={handleModalToggle} shop_id={Number(id)} />
      )}
    </div>
  );
}

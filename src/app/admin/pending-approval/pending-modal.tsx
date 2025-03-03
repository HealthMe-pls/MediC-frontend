import { fetchShopById, ShopDetail } from "@/utility/shopDetail";
import { useEffect, useState } from "react";

export interface PendingModalProps {
  shop_id: number;
  onClose: () => void;
}

export default function PendingModal({ onClose, shop_id }: PendingModalProps) {
  const [shop, setShop] = useState<ShopDetail>();
  useEffect(() => {
    fetchShopById(shop_id).then((data) => setShop(data));
  }, [shop_id]);
  return (
    console.log("Pending Modal", onClose),
    (
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
        onClick={onClose}
      >
        <div
          className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-w-2xl relative left-[100px] max-h-[650px] overflow-y-auto scrollbar-hide"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-normal">
              Information pending approval
            </h2>
          </div>
          {shop && (
            <div>
              <p>Shop Name: {shop.name}</p>
              <p>Shop Category: {shop.category}</p>
              <p>Description: {shop.description}</p>
              <p>Social Media:</p>
              <ul>
                {shop.social_media.map((media, index) => (
                  <li key={index}>{media.toString()}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  );
}

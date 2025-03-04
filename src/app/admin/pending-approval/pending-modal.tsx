import { fetchShopById, ShopDetail, ShopOpenDates } from "@/utility/shopDetail";
import { TempShop } from "./pendingApproval";
import { useEffect, useState } from "react";
import { formatDate, formatTime } from "./pendingApproval";

export interface PendingModalProps {
  tempshop: TempShop;
  onClose: () => void;
}

export default function PendingModal({ onClose, tempshop }: PendingModalProps) {
  const [shop, setShop] = useState<ShopDetail>();
  useEffect(() => {
    fetchShopById(tempshop.shop_id).then((data) => setShop(data));
  }, [tempshop.shop_id]);
  return (
    console.log("Pending Modal", onClose),
    (
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
        onClick={onClose}
      >
        <div
          className="bg-white p-6 rounded-lg shadow-lg w-8/9 max-w-2xl relative left-[100px] max-h-[650px] min-w-[860px] overflow-y-auto scrollbar-hide"
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
                {tempshop.socials &&
                  tempshop.socials.map((social, index) => (
                    <li key={index}>
                      {social.platform.toString()} {social.name.toString()}{" "}
                      {social.link.toString()}
                    </li>
                  ))}
              </ul>
              <p>Updated Opening Schedule :</p>
              <div className="flex flex-row">
                <ul>
                  {Array.isArray(shop.shop_open_dates) &&
                    shop.shop_open_dates.map(
                      (date: ShopOpenDates, index: number) => (
                        <li key={index} className="text-[14px] font-light">
                          {`${formatDate(date.start_time)} ${formatTime(
                            date.start_time
                          )} - ${formatTime(date.end_time)}`}
                        </li>
                      )
                    )}
                </ul>
                <ul>
                  {Array.isArray(tempshop.time) &&
                    tempshop.time.map((date: ShopOpenDates, index: number) => (
                      <li key={index} className="text-[14px] font-light">
                        {`${formatDate(date.start_time)} ${formatTime(
                          date.start_time
                        )} - ${formatTime(date.end_time)}`}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}

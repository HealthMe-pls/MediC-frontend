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

  // Create a set of market_open_dates_id from editTime and deleteTime
  const editAndDeleteIds = new Set([
    ...(tempshop.editTime?.map((date) => date.market_open_date_id) || []),
    ...(tempshop.deleteTime?.map((date) => date.market_open_date_id) || []),
  ]);

  // Filter timeNoEdit to exclude items with market_open_dates_id in editAndDeleteIds
  const timeNoEdit = tempshop.time.filter(
    (date) => !editAndDeleteIds.has(date.market_open_date_id)
  );

  // Combine all time arrays into one
  const combinedTimes = [
    ...timeNoEdit.map((date) => ({ ...date, type: "noEdit" })),
    ...(tempshop.editTime?.map((date) => ({ ...date, type: "edit" })) || []),
    ...(tempshop.addTime?.map((date) => ({ ...date, type: "add" })) || []),
    ...(tempshop.deleteTime?.map((date) => ({ ...date, type: "delete" })) ||
      []),
  ];

  // Sort the combined array by start_time
  const sortedCombinedTimes = combinedTimes.sort(
    (a, b) =>
      new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
  );

  useEffect(() => {
    fetchShopById(tempshop.shop_id).then((data) => setShop(data));
  }, [tempshop.shop_id]);
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-8/9 max-w-2xl relative left-[100px] max-h-[650px] min-w-[860px] overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-normal">Information pending approval</h2>
        </div>
        {shop && (
          <div className="p-4 flex flex-col gap-4">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="flex flex-row gap-4">
                  <th className="font-normal text-left">Shop Name:</th>
                  <td>{shop.name}</td>
                </tr>
                <tr className="flex flex-row gap-4">
                  <th className="font-normal text-left">Shop Category:</th>
                  <td>{shop.category}</td>
                </tr>
                <tr className="flex flex-row gap-4">
                  <th className="font-normal text-left">Description:</th>
                  <td>{shop.description}</td>
                </tr>
              </tbody>
            </table>
            <p className="font-normal">Social Media:</p>
            <div className="px-4">
              <table className="w-full border-collapse ">
                <thead>
                  <tr className="border-b-[0.9px] border-black">
                    <th className="font-normal text-left">Platform</th>
                    <th className="font-normal text-left">Name</th>
                    <th className="font-normal text-left">Link</th>
                  </tr>
                </thead>

                <tbody>
                  {tempshop.socials &&
                    tempshop.socials.map((social, index) => (
                      <tr key={index}>
                        <td className="p-4">{social.platform.toString()}</td>
                        <td className="p-4">{social.name.toString()}</td>
                        <td className="p-4">{social.link.toString()}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <p className="font-normal">Updated Opening Schedule :</p>
            <div className="flex flex-col px-4">
              <ul>
                {sortedCombinedTimes.map(
                  (date: ShopOpenDates & { type: string }, index: number) => (
                    <li
                      key={index}
                      className={`text-[14px] font-light ${
                        date.type === "delete" ? "line-through" : ""
                      } ${date.type === "add" ? "text-[#52A794]" : ""}`}
                    >
                      {`${formatDate(date.start_time)} `}
                      <span
                        className={`${
                          date.type === "edit" ? "text-[#52A794]" : ""
                        }`}
                      >
                        {`${formatTime(date.start_time)} - ${formatTime(
                          date.end_time
                        )}`}
                      </span>
                    </li>
                  )
                )}
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
            <p className="font-normal">Menu:</p>
            <div className="px-4">
              <table className="w-full border-collapse ">
                <thead>
                  <tr className="border-b-[0.9px] border-black">
                    <th className="font-normal text-left">Image</th>
                    <th className="font-normal text-left">Product Name</th>
                    <th className="font-normal text-left">Description</th>
                    <th className="font-normal text-left">Price</th>
                  </tr>
                </thead>

                <tbody>
                  {tempshop.menus &&
                    tempshop.menus.map((menu, index) => {
                      const imageUrl =
                        menu.photos &&
                        menu.photos.length > 0 &&
                        menu.photos[0].path_file
                          ? `${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${menu.photos[0].path_file}`
                          : "no image";

                      console.log(imageUrl);
                      return (
                        <tr key={index}>
                          <td className="p-4">
                            {menu.photos &&
                            menu.photos.length > 0 &&
                            menu.photos[0].path_file ? (
                              <div
                                className={` w-24 h-24 rounded-lg`}
                                style={{
                                  backgroundImage: `url(${imageUrl})`,
                                  backgroundSize: "cover",
                                }}
                              ></div>
                            ) : (
                              <div className="w-24 h-24 rounded-lg flex items-center justify-center bg-gray-200">
                                No Image
                              </div>
                            )}
                          </td>
                          <td className="p-4">
                            {menu.product_name.toString()}
                          </td>
                          <td className="p-4">
                            {menu.product_description.toString()}
                          </td>
                          <td className="p-4">{menu.price.toString()}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

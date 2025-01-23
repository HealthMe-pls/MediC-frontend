import { useEffect, useState } from "react";
import { fetchMapDetail, MapDetail } from "../../utility/maps";
import { fetchShopDetail, ShopDetail } from "@/utility/shopDetail";
import { format } from "date-fns";
import Link from "next/link";
import { th } from "date-fns/locale";

const formatDate = (isoString: string): string => {
  const date = new Date(isoString); // ใช้ new Date() แทน parseISO
  return format(date, "dd/MM/yyyy EEEE");
};
const formatTime = (isoString: string): string => {
  const date = new Date(isoString); // ใช้ new Date() แทน parseISO
  return format(date, "HH:mm");
};
const Shoplist: React.FC = () => {
  const [mapDetails, setMapDetails] = useState<MapDetail[]>([]);
  const [shopDetails, setShopDetails] = useState<ShopDetail[]>([]);
  const [selectedZone, setSelectedZone] = useState<string | null>("A");
  const [selectedBlock, setSelectedBlock] = useState<MapDetail | null>(null);
  const [isShopListVisible, setShopListVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchMapDetail()
      .then((data) => setMapDetails(data))
      .catch((error) => console.error("Error fetching map details:", error));
  }, []);

  useEffect(() => {
    fetchShopDetail()
      .then((data) => setShopDetails(data))
      .catch((error) => console.error("Error fetching shop details:", error));
  }, []);

  const filteredBlock =
    selectedZone !== null
      ? mapDetails.filter((detail) => detail.block_zone === selectedZone)
      : [];

  const selectedShopDetail =
    selectedBlock &&
    shopDetails.find((shop) => shop.name === selectedBlock.shop_name);

  return (
    <div className="p-4 font-lexend text-[#4C4343]">
      {/* Dropdown Block */}
      <div className="py-2">
        {/* Dropdown Block */}
        <div className="flex space-x-0">
          {["A", "B", "C"].map((zone, index) => (
            <button
              key={zone}
              className={`flex-1 h-[30px] border border-gray-300 text-[#4C4343]-center ${
                selectedZone === zone
                  ? index === 0
                    ? "bg-[#FFEF9E] text-[#4C4343]"
                    : index === 1
                    ? "bg-[#D5EBD6] text-[#4C4343]"
                    : "bg-[#CAE5F3] text-[#4C4343]"
                  : "bg-white-200 text-gray-700"
              } ${
                index === 0
                  ? "rounded-l-full"
                  : index === 2
                  ? "rounded-r-full"
                  : ""
              }`}
              onClick={() => {
                setSelectedZone(zone);
                setSelectedBlock(null);
              }}
            >
              {zone}
            </button>
          ))}
        </div>
      </div>

      {/* Toggle Shop List */}
      <button
        className="mb-4 py-2 rounded  text-[18px] font-light flex items-center"
        onClick={() => setShopListVisible(!isShopListVisible)}
      >
        Shop List
        {isShopListVisible ? (
          <svg
            width="16"
            height="9"
            viewBox="0 0 16 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2"
          >
            <path
              d="M15.3614 7.2637L8.48642 0.3887C8.42257 0.324779 8.34675 0.274069 8.26329 0.23947C8.17983 0.204873 8.09036 0.187066 8.00002 0.187066C7.90967 0.187066 7.82021 0.204873 7.73674 0.23947C7.65328 0.274069 7.57746 0.324779 7.51361 0.3887L0.63861 7.2637C0.509607 7.3927 0.437134 7.56767 0.437134 7.75011C0.437134 7.93254 0.509607 8.10751 0.63861 8.23651C0.767613 8.36552 0.942578 8.43799 1.12502 8.43799C1.30745 8.43799 1.48242 8.36552 1.61142 8.23651L8.00002 1.84706L14.3886 8.23651C14.4525 8.30039 14.5283 8.35106 14.6118 8.38563C14.6952 8.4202 14.7847 8.43799 14.875 8.43799C14.9654 8.43799 15.0548 8.4202 15.1383 8.38563C15.2217 8.35106 15.2975 8.30039 15.3614 8.23651C15.4253 8.17264 15.476 8.09681 15.5105 8.01335C15.5451 7.92989 15.5629 7.84044 15.5629 7.75011C15.5629 7.65977 15.5451 7.57032 15.5105 7.48686C15.476 7.40341 15.4253 7.32758 15.3614 7.2637Z"
              fill="#4C4343"
            />
          </svg>
        ) : (
          <svg
            width="16"
            height="9"
            viewBox="0 0 16 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2"
          >
            <path
              d="M15.3614 1.73641L8.48641 8.61141C8.42256 8.67533 8.34673 8.72604 8.26327 8.76064C8.17981 8.79523 8.09035 8.81304 8 8.81304C7.90965 8.81304 7.82019 8.79523 7.73673 8.76064C7.65327 8.72604 7.57744 8.67533 7.51359 8.61141L0.638594 1.73641C0.509591 1.6074 0.437118 1.43244 0.437118 1.25C0.437118 1.06756 0.509591 0.892597 0.638594 0.763594C0.767597 0.634591 0.942562 0.562119 1.125 0.562119C1.30744 0.562119 1.4824 0.634591 1.61141 0.763594L8 7.15305L14.3886 0.763594C14.4525 0.699718 14.5283 0.649049 14.6118 0.61448C14.6952 0.579911 14.7847 0.562119 14.875 0.562119C14.9653 0.562119 15.0548 0.579911 15.1382 0.61448C15.2217 0.649049 15.2975 0.699718 15.3614 0.763594C15.4253 0.82747 15.476 0.903302 15.5105 0.986759C15.5451 1.07022 15.5629 1.15967 15.5629 1.25C15.5629 1.34033 15.5451 1.42978 15.5105 1.51324C15.476 1.5967 15.4253 1.67253 15.3614 1.73641Z"
              fill="#4C4343"
            />
          </svg>
        )}
      </button>

      {/* แสดง Block */}
      {isShopListVisible && (
        <div className="grid grid-cols-6 gap-4 mb-4">
          {filteredBlock.map((block, index) => (
            <button
              key={`shop-${block.block_id}-${index}`}
              className={`p-2 border font-light ${
                selectedBlock?.block_id === block.block_id
                  ? // Change color based on the selected zone
                    block.block_zone === "A"
                    ? "bg-[#FFEF9E]"
                    : block.block_zone === "B"
                    ? "bg-[#D5EBD6] "
                    : block.block_zone === "C"
                    ? "bg-[#CAE5F3]"
                    : "bg-gray-200"
                  : "bg-white text-black border-[#D0D0D0]"
              }`}
              onClick={() => setSelectedBlock(block)}
            >
              {block.block_name}
            </button>
          ))}
        </div>
      )}

      {/* รายละเอียดร้านค้า */}
      {isShopListVisible && selectedBlock && (
        <div className="p-4 bg-white rounded shadow-md">
          <h3 className="text-xl font-bold mb-2">{selectedBlock.shop_name}</h3>
          <p className="text-gray-600">{selectedBlock.block_name}</p>
          <p className="text-green-500 mt-2 font-medium">
            Status: {selectedShopDetail?.status ? "Open" : "Closed"}
          </p>
          <div className="mt-4">
            <h4 className="font-semibold">Business Hours</h4>
            {selectedShopDetail?.shop_open_dates ? (
              <ul>
                {Array.isArray(selectedShopDetail.shop_open_dates) &&
                  selectedShopDetail.shop_open_dates.map((date, index) => (
                    <li key={index}>
                      {`${formatDate(date.start_time)} ${formatTime(
                        date.start_time
                      )} - ${formatTime(date.end_time)}`}
                    </li>
                  ))}
              </ul>
            ) : (
              <p>Not available</p>
            )}
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">Social Media</h4>
            {selectedShopDetail?.social_media ? (
              <ul>
                {Array.isArray(selectedShopDetail.social_media) &&
                  selectedShopDetail.social_media.map((media, index) => (
                    <li key={index}>
                      {media.platform}: <a href={media.link}>{media.link}</a>
                    </li>
                  ))}
              </ul>
            ) : (
              <p>Not available</p>
            )}
          </div>
          <Link href={`/shop/${selectedBlock.shop_id}`}>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              See More
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Shoplist;

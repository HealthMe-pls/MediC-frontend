import { useEffect, useState } from "react";
import { fetchMapDetail, MapDetail } from "../../utility/maps";
import { fetchShopDetail, ShopDetail } from "@/utility/shopDetail";
import { format } from "date-fns";
import { parseISO } from "date-fns";
import { enUS, th } from "date-fns/locale";

const formatDateTime = (isoString: string): string => {
  const date = parseISO(isoString);
  return format(date, "EEEE HH:mm"); // ใช้ locale "th" สำหรับภาษาไทย
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

  const zone = Array.from(
    new Set(mapDetails.map((detail) => detail.block_zone))
  );

  const filteredBlock =
    selectedZone !== null
      ? mapDetails.filter((detail) => detail.block_zone === selectedZone)
      : [];

  // กรองข้อมูลร้านค้าที่ตรงกับชื่อของ selectedBlock
  const selectedShopDetail =
    selectedBlock &&
    shopDetails.find((shop) => shop.name === selectedBlock.shop_name);

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      {/* Dropdown Block */}
      <div className="mb-4 flex space-x-4">
        {zone.map((zone, index) => (
          <button
            key={`${zone}-${index}`}
            className={`px-4 py-2 rounded ${
              selectedZone === zone
                ? "bg-yellow-400 text-white"
                : "bg-gray-200 text-gray-700"
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
      {/* Toggle Shop List */}
      <button
        className="mb-4 px-4 py-2 bg-gray-200 rounded text-gray-700"
        onClick={() => setShopListVisible(!isShopListVisible)}
      >
        Shop List {isShopListVisible ? "▲" : "▼"}
      </button>
      {/* แสดง Block */}
      {isShopListVisible && (
        <div className="grid grid-cols-5 gap-4 mb-4">
          {filteredBlock.map((block, index) => (
            <button
              key={`shop-${block.block_id}-${index}`}
              className={`p-2 rounded border ${
                selectedBlock?.block_id === block.block_id
                  ? "bg-blue-500 text-white"
                  : "bg-white"
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
                      {`${formatDateTime(date.start_time)} - ${formatDateTime(
                        date.end_time
                      )}`}
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

          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default Shoplist;

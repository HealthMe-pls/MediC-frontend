import { useEffect, useState } from "react";
import { fetchMapDetail, MapDetail } from "../../utility/maps";

const Shoplist: React.FC = () => {
  const [mapDetails, setMapDetails] = useState<MapDetail[]>([]); // ข้อมูลร้านค้า
  const [selectedZone, setSelectedZone] = useState<string | null>("A"); // Block ที่เลือก
  const [selectedBlock, setSelectedBlock] = useState<MapDetail | null>(null); // ร้านที่เลือก
  const [isShopListVisible, setShopListVisible] = useState<boolean>(false); // ควบคุมการแสดง Block

  useEffect(() => {
    // ดึงข้อมูลร้านค้า
    fetchMapDetail()
      .then((data) => setMapDetails(data))
      .catch((error) => console.error("Error fetching map details:", error));
  }, []);

  // ดึง Zone ทั้งหมด
  const zone = Array.from(
    new Set(mapDetails.map((detail) => detail.block_zone))
  );

  // กรอง Block ใน Zone ที่เลือก
  const filteredBlock =
    selectedZone !== null
      ? mapDetails.filter((detail) => detail.block_zone === selectedZone)
      : [];

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      {/* Dropdown Block */}
      <div className="mb-4 flex space-x-4">
        {zone.map((zone, index) => (
          <button
            key={`${zone}-${index}`} // ใช้ block ร่วมกับ index เพื่อเพิ่มความเป็นเอกลักษณ์
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
        onClick={() => setShopListVisible(!isShopListVisible)} // Toggle การแสดงผล
      >
        Shop List {isShopListVisible ? "▲" : "▼"}
      </button>
      {/* แสดง Block */}
      {isShopListVisible && (
        <>
          <div className="grid grid-cols-5 gap-4 mb-4">
            {filteredBlock.map((block, index) => (
              <button
                key={`shop-${block.block_id}-${index}`} // ใช้ shop_id ร่วมกับ index
                className={`p-2 rounded border ${
                  selectedBlock?.shop_id === block.block_id
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
                onClick={() => setSelectedBlock(block)}
              >
                {block.block_name}
              </button>
            ))}
          </div>
        </>
      )}

      {/* รายละเอียดร้านค้า */}
      {isShopListVisible && selectedBlock && (
        <div className="p-4 bg-white rounded shadow-md">
          <h3 className="text-xl font-bold mb-2">{selectedBlock.shop_name}</h3>
          <p className="text-gray-600">{selectedBlock.block_name}</p>
          <p className="text-green-500 mt-2 font-medium">Status: Open</p>
          <div className="mt-4">
            <h4 className="font-semibold">Business Hours</h4>
            <p>25/01/2025 Saturday 09:00 - 20:00</p>
            <p>26/01/2025 Sunday 09:00 - 20:00</p>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Social Media</h4>
            <p>Facebook: Cotton Farm</p>
            <p>Instagram: cotton_farm</p>
            <p>Tiktok: Cotton Farm</p>
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

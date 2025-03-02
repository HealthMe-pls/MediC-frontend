import { useState, useEffect } from "react";
import { fetchShopDetail, deleteShopByAdmin } from "@/utility/shopDetail";

interface Shop {
  shop_id: number;
  name: string;
}

interface ModalManageShopListProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalManageShopList: React.FC<ModalManageShopListProps> = ({
  isOpen,
  onClose,
}) => {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchShopList();
    }
  }, [isOpen]);

  const fetchShopList = async () => {
    try {
      const shopData = await fetchShopDetail();
      setShops(shopData);
    } catch (error) {
      console.error("Error fetching shop details:", error);
    }
  };

  const handleDeleteShop = async (shop_id: number, name: string) => {
    const confirmRemove = window.confirm(
      `Are you sure you want to remove "${name}"?`
    );
    if (confirmRemove) {
      try {
        await deleteShopByAdmin(shop_id);
        setShops((prev) => prev.filter((shop) => shop.shop_id !== shop_id));
      } catch (error) {
        console.error("Error deleting shop:", error);
      }
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Manage Shops</h2>
          <button onClick={onClose} className="text-xl">
            ✖
          </button>
        </div>

        <ul className="mt-4">
          {shops.map((shop) => (
            <li
              key={shop.shop_id}
              className="p-2 border-b flex justify-between"
            >
              <span>{shop.name}</span>
              <button
                onClick={() => handleDeleteShop(shop.shop_id, shop.name)}
                className="text-red-500"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : null;
};

export default ModalManageShopList;

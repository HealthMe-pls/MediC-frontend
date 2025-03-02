import React, { useState, useEffect } from "react";
import {
  updateShopByAdmin,
  fetchShopDetail,
  fetchShopById,
} from "@/utility/shopDetail";
import {
  deleteSocialMedia,
  updateSocialByAdmin,
  createSocialByAdmin,
} from "@/utility/social";
import ShopFormModal, { ShopFormData, SocialFormData } from "./ShopFormModal";

interface ShopTableProps {
  blocks: Record<
    number,
    { blockName: string; shopName: string | null; shopId: number | null }
  >;
  ShopIdName: { shop_id: number; shop_name: string }[];
  handleShopSelect: (
    blockId: number,
    selectedShop: { shop_id: number; shop_name: string }
  ) => void;
  handleRemoveShop: (blockId: number) => void;
}

const ShopTable: React.FC<ShopTableProps> = ({
  blocks,
  ShopIdName,
  handleShopSelect,
  handleRemoveShop,
}) => {
  const [blockStatus, setBlockStatus] = useState<Record<number, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editShopData, setEditShopData] = useState<ShopFormData | null>(null);
  const [editSocialData, setEditSocialData] = useState<SocialFormData[] | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleOpenModal = async (shopId: number | null) => {
    if (shopId) {
      try {
        const shop = await fetchShopById(shopId);
        if (shop) {
          const newShopData: ShopFormData = {
            id: shop.shop_id,
            name: shop.name,
            shop_category_id: shop.category_id,
            description: shop.description || "",
            entrepreneur_id: shop.entrepreneur_id,
          };

          const newSocialData: SocialFormData[] = shop.social_media
            ? shop.social_media.map((social) => ({
                id: social.id,
                name: social.name,
                platform: social.platform,
                link: social.link,
                shop_id: shop.shop_id,
              }))
            : [];

          // ป้องกันการตั้งค่า state ถ้าข้อมูลไม่เปลี่ยน
          setEditShopData((prev) =>
            JSON.stringify(prev) === JSON.stringify(newShopData)
              ? prev
              : newShopData
          );
          setEditSocialData((prev) =>
            JSON.stringify(prev) === JSON.stringify(newSocialData)
              ? prev
              : newSocialData
          );
        }
      } catch (error) {
        console.error("Error fetching shop details:", error);
      }
    } else {
      setEditShopData(null);
      setEditSocialData([]); // รีเซ็ต social data เมื่อเป็นการเพิ่มร้านค้าใหม่
    }
    setIsModalOpen(true);
  };

  // const handleSubmit = async (formData: ShopFormData,socialData: SocialFormData[]) => {
  //   if (!editShopData || !editShopData.id) {
  //     console.error("Shop ID is missing!");
  //     return;
  //   }

  //   try {
  //     await updateShopByAdmin(editShopData.id, formData);
  //     console.log("Shop updated successfully!");
  //     setIsModalOpen(false);
  //   } catch (error) {
  //     console.error("Error updating shop:", error);
  //   }
  // };

  const handleSubmit = async (
    formData: ShopFormData,
    socialData: SocialFormData[]
  ) => {
    if (!editShopData || !editShopData.id) {
      console.error("Shop ID is missing!");
      return;
    }

    try {
      // อัปเดตร้านค้า
      await updateShopByAdmin(editShopData.id, formData);
      console.log("Shop updated successfully!");

      const deletedSocials = editSocialData?.filter(
        (oldSocial) =>
          !socialData.some(
            (newSocial) =>
              newSocial.platform === oldSocial.platform &&
              newSocial.name === oldSocial.name &&
              newSocial.link === oldSocial.link
          )
      );

      for (const social of deletedSocials || []) {
        if (social.id) {
          await deleteSocialMedia(social.id);
        }
      }

      const updatedSocials = socialData.filter((newSocial) =>
        editSocialData?.some(
          (oldSocial) =>
            oldSocial.platform === newSocial.platform &&
            oldSocial.name === newSocial.name &&
            oldSocial.link === newSocial.link
        )
      );

      const newSocials = socialData.filter(
        (newSocial) =>
          !editSocialData?.some(
            (oldSocial) =>
              oldSocial.platform === newSocial.platform &&
              oldSocial.name === newSocial.name &&
              oldSocial.link === newSocial.link
          )
      );

      for (const social of updatedSocials) {
        await updateSocialByAdmin(social.id!, social);
      }

      for (const social of newSocials) {
        const newSocial = {
          name: social.name,
          platform: social.platform,
          link: social.link,
          shop_id: editShopData.id,
        };
        await createSocialByAdmin(newSocial);
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating shop:", error);
    }
  };

  useEffect(() => {
    const loadShops = async () => {
      try {
        const shops = await fetchShopDetail();

        if (!Array.isArray(shops)) {
          throw new Error("Invalid shop data format");
        }

        const initialStatus = shops.reduce((acc, shop) => {
          if (shop.shop_id !== undefined) {
            acc[shop.shop_id] = shop.open_status ?? false;
          }
          return acc;
        }, {} as Record<number, boolean>);

        // ป้องกันการ setState ซ้ำถ้าข้อมูลเดิม
        setBlockStatus((prev) =>
          JSON.stringify(prev) === JSON.stringify(initialStatus)
            ? prev
            : initialStatus
        );
      } catch (error) {
        console.error("Error fetching shop details:", error);
      }
    };

    loadShops();
  }, []); // ✅ มี Dependency Array แล้ว ป้องกัน loop

  const toggleStatus = async (shopId: number) => {
    if (shopId === null) return;

    const currentStatus = blockStatus[shopId] ?? false;
    const newStatus = !currentStatus;

    try {
      await updateShopByAdmin(shopId, { open_status: newStatus });
      setBlockStatus((prev) => ({ ...prev, [shopId]: newStatus }));
    } catch (error) {
      console.error("Error updating shop status:", error);
    }
  };

  const paginatedBlocks = Object.entries(blocks).slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(Object.entries(blocks).length / rowsPerPage);

  return (
    <div className="max-h-[500px] overflow-y-auto">
      <table className="w-full border-collapse border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 w-[200px]">
              Block Name
            </th>
            <th className="border border-gray-300 px-4 py-2 w-[300px]">
              Shop Name
            </th>
            <th className="border border-gray-300 px-4 py-2 w-[200px]">
              Close | Open
            </th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBlocks.map(([blockId, details]) => {
            const shopId = details.shopId;

            return (
              <tr key={blockId}>
                <td className="border border-gray-300 px-4 py-4 text-center">
                  {details.blockName}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <select
                    value={shopId ?? ""}
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      if (selectedValue === "") {
                        handleRemoveShop(Number(blockId));
                      } else {
                        const selectedShop = ShopIdName.find(
                          (shop) => shop.shop_id === Number(selectedValue)
                        );
                        if (selectedShop) {
                          handleShopSelect(Number(blockId), selectedShop);
                        }
                      }
                    }}
                    className="p-2 border border-gray-300 rounded w-full bg-white"
                  >
                    <option value="">- No Shop -</option>
                    {ShopIdName.map(({ shop_id, shop_name }) => (
                      <option key={shop_id} value={shop_id}>
                        {shop_name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-4 text-center flex justify-center h-[65px]">
                  {shopId ? (
                    <button
                      onClick={() => toggleStatus(shopId)}
                      className={`relative w-14 h-8 flex items-center rounded-full p-1 transition ${
                        blockStatus[shopId] ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      <span
                        className={`w-6 h-6  rounded-full shadow-md transition-transform ${
                          blockStatus[shopId]
                            ? "translate-x-6 bg-green-500"
                            : "translate-x-0 bg-red-500"
                        }`}
                      ></span>
                    </button>
                  ) : (
                    <span className="text-gray-400">No Shop</span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {shopId ? (
                    <button
                      onClick={() => handleOpenModal(details.shopId)}
                      className="p-2 bg-gray-500 text-white rounded"
                    >
                      Edit Shop Detail
                    </button>
                  ) : (
                    <span className="text-gray-400">No Shop</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === page ? "bg-gray-500 text-white" : "bg-gray-200"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>
      <ShopFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editShopData || undefined}
        initialSocialData={editSocialData || []}
      />
    </div>
  );
};

export default ShopTable;

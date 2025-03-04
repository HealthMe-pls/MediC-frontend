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
import ShopFormModal from "./ShopFormModal";
import { ShopFormData, SocialFormData, MenuFormData, PhotoForm } from "./types";
import {
  createMenuByAdmin,
  deleteMenu,
  updateMenuByAdmin,
} from "@/utility/menu";
import {
  uploadPhotoMenuByAdmin,
  deletePhoto,
  uploadPhotoShopByAdmin,
} from "@/utility/photo";

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
  const [editMenuData, setEditMenuData] = useState<MenuFormData[] | null>(null);
  const [editPhotoData, setEditPhotoData] = useState<PhotoForm | null>(null);
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

          const newPhotoData: PhotoForm = {
            cover_id: shop.photos?.[0]?.photo_id || 0,
            cover_img: shop.photos?.[0]
              ? `${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${shop.photos[0]?.pathfile}`
              : "",
            sec_id: shop.photos?.[1]?.photo_id || 0,
            sec_img: shop.photos?.[1]
              ? `${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${shop.photos[1]?.pathfile}`
              : "",
            thr_id: shop.photos?.[2]?.photo_id || 0,
            thr_img: shop.photos?.[2]
              ? `${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${shop.photos[2]?.pathfile}`
              : "",
          };

          const newSocialData: SocialFormData[] = shop.social_media
            ? shop.social_media
                .filter((social) => social.is_public)
                .map((social) => ({
                  id: social.id,
                  name: social.name,
                  platform: social.platform,
                  link: social.link,
                  shop_id: shop.shop_id,
                }))
            : [];

          const newMenuData: MenuFormData[] = shop.menus
            ? shop.menus
                .filter((menu) => menu.is_public) // กรองเฉพาะเมนูที่ isPublic เป็น true
                .map((menu) => ({
                  id: menu.id,
                  idPhoto:
                    menu.photos?.length > 0 ? menu.photos[0].photo_id : 0,
                  img:
                    menu.photos?.length > 0
                      ? `${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${menu.photos[0].pathfile}`
                      : "",
                  product_name: menu.product_name,
                  product_description: menu.product_description,
                  price: menu.price,
                  shop_id: shop.shop_id,
                }))
            : [];

          // ป้องกันการตั้งค่า state ถ้าข้อมูลไม่เปลี่ยน
          setEditShopData((prev) =>
            JSON.stringify(prev) === JSON.stringify(newShopData)
              ? prev
              : newShopData
          );
          setEditPhotoData((prev) =>
            JSON.stringify(prev) === JSON.stringify(newShopData)
              ? prev
              : newPhotoData
          );
          setEditSocialData((prev) =>
            JSON.stringify(prev) === JSON.stringify(newSocialData)
              ? prev
              : newSocialData
          );
          setEditMenuData((prev) =>
            JSON.stringify(prev) === JSON.stringify(newMenuData)
              ? prev
              : newMenuData
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

  const handleSocialUpdate = async (
    shopId: number,
    socialData: SocialFormData[]
  ) => {
    try {
      const deletedSocials = editSocialData?.filter(
        (oldSocial) =>
          !socialData.some((newSocial) => newSocial.id === oldSocial.id)
      );

      for (const social of deletedSocials || []) {
        if (social.id) {
          console.log("delete social id : " + social.id);
          await deleteSocialMedia(social.id);
        }
      }

      const updatedSocials = socialData.filter((newSocial) =>
        editSocialData?.some(
          (oldSocial) =>
            oldSocial.id === newSocial.id &&
            (oldSocial.platform !== newSocial.platform ||
              oldSocial.name !== newSocial.name ||
              oldSocial.link !== newSocial.link)
        )
      );

      for (const social of updatedSocials) {
        console.log("update social id : " + social.id);
        await updateSocialByAdmin(social.id!, social);
      }

      const newSocials = socialData.filter(
        (newSocial) =>
          !editSocialData?.some((oldSocial) => oldSocial.id === newSocial.id)
      );

      for (const social of newSocials) {
        const newSocial = {
          name: social.name,
          platform: social.platform,
          link: social.link,
          shop_id: shopId,
        };
        console.log("create new social for shop : " + shopId);
        await createSocialByAdmin(newSocial);
      }
    } catch (error) {
      console.error("Error updating social media:", error);
    }
  };

  const handleMenuUpdate = async (shopId: number, menuData: MenuFormData[]) => {
    try {
      const deletedMenus = editMenuData?.filter(
        (oldMenu) => !menuData.some((newMenu) => newMenu.id === oldMenu.id)
      );

      for (const menu of deletedMenus || []) {
        if (menu.id) {
          console.log("delete menuid : " + menu.id);
          await deleteMenu(menu.id);
          // const response_menu = await deleteMenu(menu.id);
          // console.log("response from del menu" + response_menu);
        }
      }

      const updatedMenus = menuData.filter((newMenu) =>
        editMenuData?.some(
          (oldMenu) =>
            oldMenu.id === newMenu.id &&
            (newMenu.img instanceof File ||
              oldMenu.product_name !== newMenu.product_name ||
              oldMenu.product_description !== newMenu.product_description ||
              oldMenu.price !== newMenu.price) // ต้องมีการเปลี่ยนแปลงจริง ๆ
        )
      );

      for (const menu of updatedMenus) {
        const upMenu = {
          product_name: menu.product_name,
          product_description: menu.product_description,
          price: menu.price,
          shop_id: shopId,
        };
        console.log("update menuid : " + menu.id);
        await updateMenuByAdmin(menu.id!, upMenu);

        if (menu.img instanceof File && menu.id) {
          console.log(menu.idPhoto);
          if (menu.idPhoto) await deletePhoto(menu.idPhoto);
          await uploadPhotoMenuByAdmin(menu.img, menu.id);
        }
      }

      const newMenus = menuData.filter(
        (newMenu) => !editMenuData?.some((oldMenu) => oldMenu.id === newMenu.id)
      );

      for (const menu of newMenus) {
        const createMenu = {
          product_name: menu.product_name,
          product_description: menu.product_description,
          price: menu.price,
          shop_id: shopId,
        };
        await createMenuByAdmin(createMenu);
        const shopDe = await fetchShopById(shopId);
        const createdmenu = shopDe.menus.find(
          (m) => menu.product_name === m.product_name
        );
        if (createdmenu && menu.img && menu.img instanceof File) {
          await uploadPhotoMenuByAdmin(menu.img, createdmenu?.id);
        }
      }
    } catch (error) {
      console.error("Error updating social media:", error);
    }
  };

  const handlePhotoUpdate = async (shopId: number, photoData: PhotoForm) => {
    if (editPhotoData) {
      if (editPhotoData?.cover_img === "") {
        if (photoData.cover_img instanceof File)
          await uploadPhotoShopByAdmin(photoData.cover_img, shopId);
      } else {
        if (photoData.cover_img instanceof File) {
          console.log(editPhotoData.cover_id);
          await deletePhoto(editPhotoData.cover_id);
          await uploadPhotoShopByAdmin(photoData.cover_img, shopId);
        }
        if (photoData.cover_img === "") {
          console.log(editPhotoData.cover_id);
          await deletePhoto(editPhotoData.cover_id);
        }
      }
      if (editPhotoData?.sec_img === "") {
        if (photoData.sec_img instanceof File)
          await uploadPhotoShopByAdmin(photoData.sec_img, shopId);
      } else {
        if (photoData.sec_img instanceof File) {
          console.log(editPhotoData.sec_id);
          await deletePhoto(editPhotoData.sec_id);
          await uploadPhotoShopByAdmin(photoData.sec_img, shopId);
        }
        if (photoData.sec_img === "") {
          console.log(editPhotoData.sec_id);
          await deletePhoto(editPhotoData.sec_id);
        }
      }
      if (editPhotoData?.thr_img === "") {
        if (photoData.thr_img instanceof File)
          await uploadPhotoShopByAdmin(photoData.thr_img, shopId);
      } else {
        if (photoData.thr_img instanceof File) {
          console.log(editPhotoData.thr_id);
          await deletePhoto(editPhotoData.thr_id);
          await uploadPhotoShopByAdmin(photoData.thr_img, shopId);
        }
        if (photoData.thr_img === "") {
          console.log(editPhotoData.thr_id);
          await deletePhoto(editPhotoData.thr_id);
        }
      }
    }
  };

  const handleSubmit = async (
    formData: ShopFormData,
    socialData: SocialFormData[],
    menuData: MenuFormData[],
    photoData: PhotoForm
  ) => {
    if (!editShopData || !editShopData.id) {
      console.error("Shop ID is missing!");
      return;
    }

    try {
      // อัปเดตร้านค้า
      await updateShopByAdmin(editShopData.id, formData);
      console.log("Shop updated successfully!");

      // จัดการ Social Data
      await handleSocialUpdate(editShopData.id, socialData);
      await handlePhotoUpdate(editShopData.id, photoData);
      await handleMenuUpdate(editShopData.id, menuData);

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
  }, []);

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
                    className="p-2 border border-gray-300 rounded w-[400px] bg-white"
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
        initialMenuData={editMenuData || undefined}
        initialPhotoData={editPhotoData || undefined}
      />
    </div>
  );
};

export default ShopTable;

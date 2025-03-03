"use client";

import { useState, useEffect } from "react";
import { fetchMapDetail } from "../../../utility/maps";
import { ShopIdName } from "../../../utility/shop";
import { ChangeMap } from "../../../utility/maps";
import { createShopByAdmin, fetchShopDetail } from "@/utility/shopDetail";
import ShopFormModal, {
  ShopFormData,
  SocialFormData,
  MenuFormData,
} from "@/app/components/ShopFormModal";
import CategoryManager from "@/app/components/CategoryManager";
import AdminLayouts from "@/app/layouts/AdminLayouts";
import Map from "@/app/components/ShopMap";
import ShopTable from "@/app/components/ShopTable";
import ModalManageShopList from "@/app/components/ModalManageShopList";
import { createSocialByAdmin } from "@/utility/social";
import { fetchShopByName } from "@/utility/searchbar";
import { createMenuByAdmin } from "@/utility/menu";

export default function AdminPageComponent() {
  const [blocks, setBlocks] = useState<
    Record<
      number,
      { blockName: string; shopName: string | null; shopId: number | null }
    >
  >({});
  // const [shopSet, setShopSet] = useState<MapDetail[]>([]); //Block - Shop
  // const [Shops, setShops] = useState<ShopDetail[]>([]); // Shops Detail
  const [ShopIdName, setShopIdName] = useState<ShopIdName[]>([]); //lower case shop name
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  const [shopFormData, setShopFormData] = useState<ShopFormData | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isShopListModalOpen, setIsShopListModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlocks = Object.entries(blocks)
    .filter(([, block]) =>
      block.blockName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {} as typeof blocks
    );

  // Fetch map and shop data
  const fetchData = async () => {
    try {
      const [mapData, shopData] = await Promise.all([
        fetchMapDetail(),
        fetchShopDetail(),
      ]);

      const initialBlocks = mapData.reduce((acc, mapDetail) => {
        acc[mapDetail.block_id] = {
          shopName: mapDetail.shop_name,
          blockName: mapDetail.block_name,
          shopId: mapDetail.shop_id,
        };
        return acc;
      }, {} as Record<number, { blockName: string; shopName: string; shopId: number }>);

      setBlocks(initialBlocks);

      //reduce ShopDetail data -> [shop_id][shop_name]
      const shopIdNameRecord: ShopIdName[] = shopData.map((item) => ({
        shop_id: item.shop_id,
        shop_name: item.name,
      }));

      //console.log("shopIdNameRecord = ",shopIdNameRecord)

      setShopIdName(shopIdNameRecord);
    } catch (error) {
      console.error("Error fetching map details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isShopModalOpen && !isCategoryModalOpen && !isShopListModalOpen) {
      fetchData();
    }
  }, [isShopModalOpen, isCategoryModalOpen, isShopListModalOpen]);

  const handleOpenAddShopModal = () => {
    setShopFormData({
      name: "",
      shop_category_id: 1,
      description: "",
      entrepreneur_id: 1,
    });
    setIsShopModalOpen(true);
  };

  const handleCreateShop = async (
    formData: ShopFormData,
    socialData: SocialFormData[],
    menuData: MenuFormData[]
  ) => {
    try {
      await createShopByAdmin(formData); // รอให้ API สร้างร้านค้าเสร็จ
      const shop = await fetchShopByName(formData.name); // ใช้ await เพื่อรอข้อมูล

      console.log(shop);

      if (shop && shop.id) {
        // ตรวจสอบว่ามี id กลับมาหรือไม่
        for (const social of socialData) {
          const newSocial = {
            name: social.name,
            platform: social.platform,
            link: social.link,
            shop_id: shop.id, // ใช้ id จาก response
          };
          await createSocialByAdmin(newSocial); // เรียก API สำหรับ Social ทีละตัว
        }

        for (const menu of menuData) {
          const newMenu = {
            product_name: menu.product_name,
            product_description: menu.product_description,
            price: menu.price,
            shop_id: shop.id, // ใช้ id จาก response
          };
          await createMenuByAdmin(newMenu); // เรียก API สำหรับ Social ทีละตัว
        }
        console.log("Shop created successfully!");
        setIsShopModalOpen(false);
        fetchData();
      } else {
        throw new Error("Shop ID not found in response");
      }
    } catch (error) {
      console.error("Error creating shop:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Focus input when editing
  // useEffect(() => {
  //   console.log("isEdit changed:", isEdit);
  // }, [isEdit]);

  // const inputRef = useRef<HTMLInputElement | null>(null);
  // useEffect(() => {
  //   if (editingBlock !== null && inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, [editingBlock]);

  const handleShopSelect = async (
    blockId: number,
    selectedShop: { shop_id: number; shop_name: string }
  ) => {
    try {
      setBlocks((prevBlocks) => ({
        ...prevBlocks,
        [blockId]: {
          blockName: prevBlocks[blockId]?.blockName || "",
          shopName: selectedShop.shop_name,
          shopId: selectedShop.shop_id,
        },
      }));

      await ChangeMap([
        {
          block_id: blockId,
          block_name: blocks[blockId].blockName,
          shop_id: selectedShop.shop_id,
        },
      ]);

      console.log("Shop updated successfully!");
      fetchData();
    } catch (error) {
      console.error("Error updating shop:", error);
      alert("Failed to update shop. Please try again.");
    }
  };

  const handleRemoveShop = async (blockId: number) => {
    const confirmRemove = window.confirm(`Remove shop from block ${blockId}?`);
    if (confirmRemove) {
      console.log("remove");
      setBlocks((prevBlocks) => ({
        ...prevBlocks,
        [blockId]: {
          blockName: prevBlocks[blockId]?.blockName || "",
          shopName: null,
          shopId: null,
        },
      }));

      await ChangeMap([
        {
          block_id: blockId,
          block_name: blocks[blockId].blockName,
          shop_id: null,
        },
      ]);
    }
  };

  return (
    <AdminLayouts currentPage="Manage Market Map">
      {/* Main Content */}
      {/* Map */}
      <div className="flex-1 p-6  flex flex-col items-center">
        <div className="w-[430px]">
          <Map
            selectedCate={0}
            setSelectedBlock={() => {}}
            matchShopID={0}
            role="admin"
            mapUpdate={Date.now()}
          />
        </div>

        {isShopModalOpen && (
          <ShopFormModal
            isOpen={isShopModalOpen}
            onClose={() => setIsShopModalOpen(false)}
            onSubmit={handleCreateShop}
            initialData={shopFormData || undefined}
            initialSocialData={undefined}
            initialMenuData={undefined}
          />
        )}

        {/* Edit Table */}
        <div className="mt-8 w-full">
          <div className="flex justify-between items-center">
            <div className=" flex items-center gap-4 w-[55%]">
              <input
                type="text"
                placeholder="Search by block name..."
                className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex justify-self-end items-center">
              <button
                onClick={handleOpenAddShopModal}
                className="m-3 p-3 bg-blue-100  rounded"
              >
                + Add Shop
              </button>
              <button
                onClick={() => setIsShopListModalOpen(true)}
                className="m-3 p-3 bg-gray-300 rounded"
              >
                Manage Shop List
              </button>
              <button
                onClick={() => setIsCategoryModalOpen(true)}
                className="m-3 p-3 bg-gray-300 rounded"
              >
                Manage catagory
              </button>
            </div>
          </div>

          <ShopTable
            {...{
              blocks: filteredBlocks,
              ShopIdName,
              handleShopSelect,
              handleRemoveShop,
            }}
          />

          <CategoryManager
            isOpen={isCategoryModalOpen}
            onClose={() => setIsCategoryModalOpen(false)}
          />
          <ModalManageShopList
            isOpen={isShopListModalOpen}
            onClose={() => setIsShopListModalOpen(false)}
          />
        </div>
      </div>
    </AdminLayouts>
  );
}

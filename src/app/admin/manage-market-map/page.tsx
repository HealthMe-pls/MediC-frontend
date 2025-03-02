"use client";

import { useState, useEffect, useRef } from "react";
import { fetchMapDetail } from "../../../utility/maps";
import { fetchShopDetail, ShopIdName } from "../../../utility/shop";
import { ChangeMap } from "../../../utility/maps";
import { createShopByAdmin } from "@/utility/shopDetail";
import ShopFormModal, { ShopFormData } from "@/app/components/ShopFormModal";
import CategoryManager from "@/app/components/CategoryManager";
import { fetchShopCategory } from "@/utility/shopcategory";
import AdminLayouts from "@/app/layouts/AdminLayouts";
import Map from "@/app/components/ShopMap";
import ShopTable from "@/app/components/ShopTable";
import ModalManageShopList from "@/app/components/ModalManageShopList";

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
  const [editingBlock, setEditingBlock] = useState<number | null>(null);

  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  const [shopFormData, setShopFormData] = useState<ShopFormData | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isShopListModalOpen, setIsShopListModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlocks = Object.entries(blocks)
    .filter(([_, block]) =>
      block.blockName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {} as typeof blocks
    );

  // Fetch map and shop data
  const fetchData = async () => {
    try {
      const [mapData, shopData, categoryData] = await Promise.all([
        fetchMapDetail(),
        fetchShopDetail(),
        fetchShopCategory(),
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
        shop_id: item.id,
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

  const handleCreateShop = async (formData: ShopFormData) => {
    try {
      await createShopByAdmin(formData);
      console.log("Shop created successfully!");
      setIsShopModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error creating shop:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Focus input when editing
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (editingBlock !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingBlock]);

  // useEffect(() => {
  //   console.log("isEdit changed:", isEdit);
  // }, [isEdit]);

  const handleShopSelect = async (
    blockId: number,
    selectedShop: { shop_id: number; shop_name: string }
  ) => {
    try {
      // อัปเดต UI ทันทีเพื่อให้ dropdown ดู responsive
      setBlocks((prevBlocks) => ({
        ...prevBlocks,
        [blockId]: {
          blockName: prevBlocks[blockId]?.blockName || "",
          shopName: selectedShop.shop_name,
          shopId: selectedShop.shop_id,
        },
      }));

      // เรียก API เพื่อบันทึกค่าที่เปลี่ยนแปลง
      await ChangeMap([
        {
          block_id: blockId,
          block_name: blocks[blockId].blockName,
          shop_id: selectedShop.shop_id,
        },
      ]);

      console.log("Shop updated successfully!");
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
    }
    setIsEdit(true);
  };

  const generateBlockPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI;
    const radius = 140;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  };

  const handleSaveChanges = async () => {
    try {
      const mapChangedData = Object.entries(blocks).map(
        ([blockId, { blockName, shopId }]) => ({
          block_id: Number(blockId),
          block_name: blockName,
          shop_id: shopId,
        })
      );

      await ChangeMap(mapChangedData);
      setIsEdit(false);
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  const handleCancelChanges = async () => {
    await fetchData();
    setIsEdit(false);
  };

  const handleManageCategory = () => {
    if (isPopUpOpen) {
      setIsPopUpOpen(false);
    } else {
      setIsPopUpOpen(true);
    }
  };

  const categoryInputRef = useRef<HTMLInputElement | null>(null);
  const handleAddCategories = () => {
    setIsAddingCat(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    setCategorySearchTerm;
    categoryInputRef.current?.focus();
  };

  const handleConfirmCat = async (name: string) => {
    try {
      const category = {
        name: name,
      };
      await createCategory(category);
      setIsAddingCat(false);
      setIsPopUpOpen(false); // Close the popup
      fetchData();
      setIsPopUpOpen(true); // Reopen the popup
      setCategorySearchTerm("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleCancelAdd = () => {
    setIsAddingCat(false);
  };

  const handleDeleteCat = async (id: number, name: string) => {
    const confirmRemove = window.confirm(`Remove Category ${name}?`);
    if (confirmRemove) {
      try {
        await DeleteCatagory(id);
        setIsPopUpOpen(false); // Close the popup
        fetchData();
        setIsPopUpOpen(true); // Reopen the popup
        alert("Category removed successfully!");
      } catch (error) {
        console.error("Error removing category:", error);
        alert("An error occurred while removing the category.");
      }
    }
  };

  return (
    <AdminLayouts currentPage="Manage Market Map">
      {/* Main Content */}
      {/* Map */}
      <div className="flex-1 p-6  flex flex-col items-center">
        <Map selectedCate={0} setSelectedBlock={(block: string) => {}} matchShopID={0} role="" />
        {isPopUpOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
                {/* Close Button */}
                <button
                  onClick={handleManageCategory}
                  className="p-2 text-black rounded"
                >
                  x
                </button>
              </div>

        {isShopModalOpen && (
          <ShopFormModal
            isOpen={isShopModalOpen}
            onClose={() => setIsShopModalOpen(false)}
            onSubmit={handleCreateShop}
            initialData={shopFormData || undefined}
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

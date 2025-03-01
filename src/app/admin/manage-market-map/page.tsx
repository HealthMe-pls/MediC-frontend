"use client";

import { useState, useEffect, useRef } from "react";
import { fetchMapDetail } from "../../../utility/maps";
import { fetchShopDetail, ShopIdName } from "../../../utility/shop";
import { ChangeMap } from "../../../utility/maps";
import { createShopByAdmin } from "@/utility/shopDetail";
import ShopFormModal, { ShopFormData } from "@/app/components/ShopFormModal";

// import Link from "next/link";

import {
  createCategory,
  DeleteCatagory,
  fetchShopCategory,
  ShopCategory,
} from "@/utility/shopcategory";
import AdminLayouts from "@/app/layouts/AdminLayouts";
import Map from "@/app/components/ShopMap";
import ShopTable from "@/app/components/ShopTable";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  //manage category
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [shopCategory, setShopCategory] = useState<ShopCategory[]>([]);
  const [isAddingCat, setIsAddingCat] = useState(false);
  const [categorySearchTerm, setCategorySearchTerm] = useState("");

  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  const [shopFormData, setShopFormData] = useState<ShopFormData | null>(null);

  // Fetch map and shop data
  const fetchData = async () => {
    try {
      const [mapData, shopData, categoryData] = await Promise.all([
        fetchMapDetail(),
        fetchShopDetail(),
        fetchShopCategory(),
      ]);

      // setShopSet(mapData);
      // setShops(shopData);
      setShopCategory(categoryData);
      //console.log("category data : ", categoryData);

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

  const handleEditClick = (blockId: number) => {
    if (editingBlock === blockId) {
      setEditingBlock(null);
      setSearchTerm(""); // Reset search term when exiting edit mode
    } else {
      setEditingBlock(blockId);
      setSearchTerm(""); // Clear search term when entering edit mode
    }
  };

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

      await ChangeMap([
        {
          block_id: blockId,
          block_name: blocks[blockId].blockName,
          shop_id: null,
        },
      ]);
    }
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
        <Map
          selectedCate={0}
          setSelectedBlock={(block: string) => {}}
          matchShopID={0}
          role="admin"
        />
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

              {isAddingCat ? (
                <ul>
                  <div>
                    {shopCategory.map((category) => (
                      <li key={category.id} className="p-2 border-b">
                        {category.name}
                      </li>
                    ))}
                    <input
                      type="text"
                      value={categorySearchTerm}
                      onChange={(e) => setCategorySearchTerm(e.target.value)}
                      ref={categoryInputRef}
                      className="m-2 p-2"
                      placeholder="Add Category..."
                    />
                    <button
                      className="align-middle"
                      onClick={() => handleConfirmCat(categorySearchTerm)}
                    >
                      ✔
                    </button>
                    <button
                      className="align-middle ml-3"
                      onClick={handleCancelAdd}
                    >
                      ❌
                    </button>
                  </div>
                </ul>
              ) : (
                <ul>
                  {shopCategory.map((category) => (
                    <li key={category.id} className="p-2 border-b">
                      <button
                        onClick={() =>
                          handleDeleteCat(category.id, category.name)
                        }
                        className=" mr-3"
                      >
                        ✖
                      </button>
                      {category.name}
                    </li>
                  ))}
                </ul>
              )}
              {!isAddingCat && (
                <button
                  onClick={handleAddCategories}
                  className="mt-5 px-5 bg-green-200 rounded"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        )}

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
            <h2 className="text-xl font-bold mb-4">Manage Shops</h2>
            <div className="flex justify-self-end items-center">
              <button
                onClick={handleOpenAddShopModal}
                className="m-3 p-3 bg-blue-100  rounded"
              >
                + Add Shop
              </button>
              <button
                onClick={handleManageCategory}
                className="m-3 p-3 bg-gray-300 rounded"
              >
                Manage catagory
              </button>
            </div>
          </div>

          <ShopTable
            {...{ blocks, ShopIdName, handleShopSelect, handleRemoveShop }}
          />
        </div>
      </div>
    </AdminLayouts>
  );
}

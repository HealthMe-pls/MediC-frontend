"use client";

import { useState, useEffect, useRef } from "react";
import { fetchMapDetail, MapDetail } from "../../../utility/maps";
import { fetchShopDetail,ShopDetail, ShopIdName } from "../../../utility/shop";
import { ChangeMap } from "../../../utility/maps";
import "./adminPage.css";
import { createCategory, DeleteCatagory, fetchShopCategory, ShopCategory } from "@/utility/shopcategory";

export default function AdminPage() {
  const [blocks, setBlocks] = useState<Record<number, { blockName: string; shopName: string |null; shopId: number|null }>>({});
  const [shopSet, setShopSet] = useState<MapDetail[]>([]); //Block - Shop
  const [Shops,setShops] = useState<ShopDetail[]>([]); // Shops Detail
  const [ShopIdName,setShopIdName] = useState<ShopIdName[]>([]); //lower case shop name
  const [editingBlock, setEditingBlock] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  //manage category
  const [isPopUpOpen,setIsPopUpOpen] = useState(false);
  const [shopCategory,setShopCategory] = useState<ShopCategory[]>([]);
  const [isAddingCat,setIsAddingCat] = useState(false);
  const [categorySearchTerm, setCategorySearchTerm] = useState("");

  // Fetch map and shop data
  const fetchData = async () => {
    try {
      const [mapData, shopData, categoryData] = await Promise.all([
        fetchMapDetail(),
        fetchShopDetail(),
        fetchShopCategory()
      ]);

      setShopSet(mapData);
      setShops(shopData);
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
      const shopIdNameRecord: ShopIdName[] = shopData.map((item)=>({
        shop_id : item.id,
        shop_name : item.name
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

  // Focus input when editing
  const inputRef = useRef<HTMLInputElement|null>(null);
  useEffect(() => {
    if (editingBlock !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingBlock]);

  useEffect(() => {
    console.log("isEdit changed:", isEdit);
  }, [isEdit]);
  


  const handleEditClick = (blockId: number) => {
    if (editingBlock === blockId) {
      setEditingBlock(null);
      setSearchTerm(""); // Reset search term when exiting edit mode

    } else {
      setEditingBlock(blockId);
      setSearchTerm(""); // Clear search term when entering edit mode
    }
  };

  const handleShopSelect = (blockId: number, selectedShop:{ shop_id: number; shop_name: string } ) => {
    // Update block with selected shop details
    setBlocks((prevBlocks) => ({
      ...prevBlocks,
      [blockId]: {
        blockName: prevBlocks[blockId]?.blockName || "",
        shopName: selectedShop.shop_name,
        shopId: selectedShop.shop_id,
      },
    }));
    setIsEdit(true);
    setEditingBlock(null);
  };

  //search for shop name
  const filteredShops = ShopIdName.filter(({shop_name}) =>
    shop_name && shop_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveShop = (blockId: number) => {
    const confirmRemove = window.confirm(`Remove shop from block ${blockId}?`);
    if (confirmRemove) {
      setBlocks((prevBlocks) => ({
        ...prevBlocks,
        [blockId]: { blockName: prevBlocks[blockId]?.blockName || "", shopName: null, shopId: null },
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
      const mapChangedData = Object.entries(blocks).map(([blockId, { blockName, shopId }]) => ({
        block_id: Number(blockId),
        block_name: blockName,
        shop_id: shopId,
      }));

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

  const handleManageCategory = () =>{
    if(isPopUpOpen){
      setIsPopUpOpen(false);
      setIsAddingCat(false)
    }else{
      setIsPopUpOpen(true);
    }
  }

  const categoryInputRef = useRef<HTMLInputElement|null>(null);
  const handleAddCategories = () => {
    setIsAddingCat(true);
    setCategorySearchTerm
    categoryInputRef.current?.focus();
  }

  const handleConfirmCat = async (name:string) => {
    try{
      const category = {
        name : name
      }
      await createCategory(category);
      setIsAddingCat(false);
      setIsPopUpOpen(false);  // Close the popup
      fetchData();
      setIsPopUpOpen(true);   // Reopen the popup
      setCategorySearchTerm('');
    } catch (error) {
      console.error("Error adding category:", error);
    }
  }

  const handleCancelAdd = () => {
    setIsAddingCat(false);
  }

  const handleDeleteCat = async (id: number,name:string) => {
    const confirmRemove = window.confirm(`Remove Category ${name}?`);
    if (confirmRemove) {
      try{
        await DeleteCatagory(id);
        setIsPopUpOpen(false);  // Close the popup
        fetchData();
        setIsPopUpOpen(true);   // Reopen the popup
        alert("Category removed successfully!");
      }catch(error){
        console.error("Error removing category:", error);
        alert("An error occurred while removing the category.");
      }
    }
  }


  //debug
    // console.log("Shops:", Shops);
    // console.log("ShopIdName:", ShopIdName);
    // console.log("Search Term:", searchTerm);
    // console.log("Filtered Shops:", filteredShops);
    //console.log("shopCategory: ", shopCategory);


  return (
    <div className="h-screen flex flex-col">
      <header className="bg-blue-600 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">Admin - Edit Market Map</h1>
      </header>

      <main className="flex-1 p-6 bg-gray-50 flex flex-col items-center">
        {/* Map */}
        <div
          className="relative w-72 h-72 rounded-full border-4 border-gray-500 flex items-center justify-center"
        >
          {Object.keys(blocks).map((blockId, index) => {
            const { x, y } = generateBlockPosition(index, Object.keys(blocks).length);
            return (
              <div
                key={blockId}
                className="absolute w-16 h-16 text-white flex items-center justify-center rounded-full cursor-pointer"
                style={{
                  backgroundColor: "blue",
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                <p>{blocks[Number(blockId)].shopName || "no shop"}</p>
              </div>
            );
          })}
        </div>

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
                    onClick={()=>handleConfirmCat(categorySearchTerm)}>
                      ✔
                  </button>
                  <button
                    className="align-middle ml-3"
                    onClick={handleCancelAdd}>
                      ❌
                  </button>
                </div>
              </ul>
              ) : (
                <ul>
                  {shopCategory.map((category) => (
                  <li key={category.id} className="p-2 border-b">
                    <button 
                      onClick={()=>handleDeleteCat(category.id,category.name)}
                      className=" mr-3">
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
              className="mt-5 px-5 bg-green-200 rounded">
              Add
            </button>
            )}

            
          </div>
        </div>
      )}

        {/* Edit Table */}
        <div className="mt-8 w-full">
        {isEdit ? (
          <div>
            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-4">Manage Shops</h2>
              <button onClick={handleManageCategory} className="m-1 p-3 bg-gray-300 rounded">
                Manage catagory
              </button>
            </div>
              <div className="mb-1 flex justify-end">
                <button disabled={!isEdit} onClick={handleSaveChanges} className="p-3 mr-2 bg-green-500 text-white rounded">
                  Save Changes
                </button>
                <button disabled={!isEdit} onClick={handleCancelChanges} className="p-3 bg-gray-500 text-white rounded">
                  Cancel
                </button>
              </div>
            </div>
          ):(
            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold mb-4">Manage Shops</h2>
                <button onClick={handleManageCategory} className="m-3 p-3 bg-gray-300 rounded">
                  Manage catagory
                </button>
              </div>
            </div>
          )}
          <div className="table-container">
            <table className="w-full border-collapse border border-gray-300 bg-white ">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Block Name</th>
                  <th className="border border-gray-300 px-4 py-2">Shop ID</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(blocks).map(([blockId, details]) => (
                  <tr key={blockId} >
                    <td className="border border-gray-300 px-4 py-4 text-center">{details.blockName}</td>
                    <td className="border border-gray-300 px-4 py-4 text-center">{details.shopId}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center" style={{ width: "200px" }}>
                      {editingBlock === Number(blockId) ? (
                        <div>
                          <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            ref={inputRef}
                            className="p-2 border border-gray-300 rounded w-full"
                            placeholder="Search shop..."
                          />
                          {filteredShops !== null ? (
                            <ul className="border border-gray-300 mt-2 rounded bg-white max-h-40 overflow-y-auto">
                              {filteredShops.map(({shop_id,shop_name}) => (
                                <li
                                  key={shop_name}
                                  className="p-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() => handleShopSelect(Number(blockId), {shop_id,shop_name})}
                                >
                                  {shop_name}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500 mt-2">No shop found...</p>
                          )}
                        </div>
                      ) : (
                        <span>{details.shopName || "-"}</span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => handleEditClick(Number(blockId))}
                        className="p-2 bg-blue-500 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemoveShop(Number(blockId))}
                        className="p-2 bg-red-500 text-white rounded ml-2"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2025 Bamboo Family Market. All rights reserved.</p>
      </footer>
    </div>
  );
}

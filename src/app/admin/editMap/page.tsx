"use client";

import { useState, useEffect, useRef } from "react";
import { fetchMapDetail, MapDetail } from "../../../utility/maps";
import { fetchShopDetail,ShopDetail, ShopIdName } from "../../../utility/shop";
import { ChangeMap } from "../../../utility/maps";
import "./adminPage.css";

export default function AdminPage() {
  const [blocks, setBlocks] = useState<Record<number, { blockName: string; shopName: string |null; shopId: number|null }>>({});
  const [shopSet, setShopSet] = useState<MapDetail[]>([]); //Block - Shop
  const [Shops,setShops] = useState<ShopDetail[]>([]); // Shops Detail
  const [ShopIdName,setShopIdName] = useState<ShopIdName[]>([]); //lower case shop name
  const [editingBlock, setEditingBlock] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  // Fetch map and shop data
  const fetchData = async () => {
    try {
      const [mapData, shopData] = await Promise.all([fetchMapDetail(),fetchShopDetail()]);
      setShopSet(mapData);
      setShops(shopData);
      console.log("shop data : ", shopData);

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

      console.log("shopIdNameRecord = ",shopIdNameRecord)
      
      setShopIdName(shopIdNameRecord);

    } catch (error) {
      console.error("Error fetching map details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Focus input when editing
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editingBlock !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingBlock]);

  const handleEditClick = (blockId: number) => {
    if (editingBlock === blockId) {
      setEditingBlock(null);
      setSearchTerm(""); // Reset search term when exiting edit mode
      setIsEdit(false);
    } else {
      setEditingBlock(blockId);
      setSearchTerm(""); // Clear search term when entering edit mode
      setIsEdit(true);
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
      alert("Changes saved successfully!");
      setIsEdit(true);
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  const handleResetChanges = async () => {
    await fetchData();
  };

  //debug
    console.log("Shops:", Shops);
    console.log("ShopIdName:", ShopIdName);
    console.log("Search Term:", searchTerm);
    console.log("Filtered Shops:", filteredShops);


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

        {/* Edit Table */}
        <div className="mt-8 w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-4">Manage Shops</h2>
            <div className="mb-1">
              <button disabled={!isEdit} onClick={handleSaveChanges} className="p-1 bg-green-500 text-white rounded">
                Save Changes
              </button>
              <button disabled={!isEdit} onClick={handleResetChanges} className="p-1 m-2 bg-gray-500 text-white rounded">
                Cancel
              </button>
            </div>
          </div>
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

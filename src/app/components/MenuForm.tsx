import React from "react";
import Image from "next/image";
import { MenuFormData } from "./types";

interface MenuFormProps {
  menuFormData: MenuFormData[];
  onAddMenu: () => void;
  onMenuChange: (
    index: number,
    field: keyof MenuFormData,
    value: string | number | File
  ) => void;
  onRemoveMenu: (index: number) => void;
}

const MenuForm: React.FC<MenuFormProps> = ({
  menuFormData,
  onAddMenu,
  onMenuChange,
  onRemoveMenu,
}) => {
  return (
    <div>
      <div className="flex flex-row items-center mt-4 mb-4">
        <p className="mr-3">Menus:</p>
        <button
          type="button"
          onClick={onAddMenu}
          className="bg-green-200 w-[50px] h-[30px] rounded ml-4"
        >
          Add
        </button>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Product Name</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuFormData.map((menu, index) => (
            <tr key={menu.id}>
              <td className="p-2 border">
                <div
                  className="relative w-24 h-24 border rounded flex items-center justify-center overflow-hidden cursor-pointer"
                  onClick={() =>
                    document.getElementById(`fileInput-${index}`)?.click()
                  }
                >
                  {menu.img ? (
                    <div className="relative w-full h-full group">
                      <Image
                        src={
                          menu.img instanceof File
                            ? URL.createObjectURL(menu.img)
                            : menu.img
                        }
                        alt="Preview"
                        className="w-full h-full object-cover"
                        width={200}
                        height={200}
                        onError={(
                          e: React.SyntheticEvent<HTMLImageElement, Event>
                        ) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.onerror = null;
                          onMenuChange(index, "img", "");
                        }}
                      />
                      <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <span className="text-white">Upload</span>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="bg-gray-200 text-gray-600 p-2 rounded"
                    >
                      Upload
                    </button>
                  )}
                </div>
                <input
                  id={`fileInput-${index}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      onMenuChange(index, "img", e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
              </td>
              <td className="p-2 border h-24">
                <input
                  type="text"
                  value={menu.product_name}
                  onChange={(e) =>
                    onMenuChange(index, "product_name", e.target.value)
                  }
                  className="border p-1 w-full h-full"
                  placeholder="Product Name"
                />
              </td>
              <td className="p-2 border relative">
                <div className="relative">
                  <textarea
                    value={menu.product_description}
                    onChange={(e) => {
                      if (e.target.value.length <= 200) {
                        onMenuChange(
                          index,
                          "product_description",
                          e.target.value
                        );
                      }
                    }}
                    onFocus={() => (document.body.style.overflow = "hidden")}
                    onBlur={() => (document.body.style.overflow = "auto")}
                    className="border p-2 w-full h-24 resize-none pr-10 scrollbar-hide"
                    placeholder="Description (Max 200 characters)"
                  />
                  <span className="absolute bottom-1 right-2 text-xs text-gray-500 mb-2">
                    {menu.product_description.length}/200
                  </span>
                </div>
              </td>
              <td className="p-2 border w-[70px]">
                <input
                  type="number"
                  value={menu.price}
                  onChange={(e) => {
                    const value = e.target.value.replace(/^0+/, "");
                    onMenuChange(index, "price", value ? parseFloat(value) : 0);
                  }}
                  className="border p-1 w-full appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="Price"
                />
              </td>
              <td className="p-2 border text-center">
                <button
                  type="button"
                  onClick={() => onRemoveMenu(index)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuForm;

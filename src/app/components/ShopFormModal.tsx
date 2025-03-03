import React, { useState, useEffect } from "react";
import { fetchShopCategory, ShopCategory } from "@/utility/shopcate";
import { fetchEntrepreneur, Entrepreneur } from "@/utility/entrepreneur";
import Image from "next/image";

interface ShopFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: ShopFormData,
    socialData: SocialFormData[],
    menuData: MenuFormData[]
  ) => void;
  initialData?: ShopFormData;
  initialSocialData?: SocialFormData[];
  initialMenuData?: MenuFormData[];
}

export interface ShopFormData {
  id?: number;
  name: string;
  shop_category_id: number;
  description: string;
  entrepreneur_id: number;
}

export interface SocialFormData {
  id?: number;
  name: string;
  platform: string;
  link: string;
  shop_id: number;
}

export interface MenuFormData {
  id?: number;
  img: File | string;
  product_name: string;
  product_description: string;
  price: number;
  shop_id: number;
}

const ShopFormModal: React.FC<ShopFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  initialSocialData = [],
  initialMenuData = [],
}) => {
  const [formData, setFormData] = useState<ShopFormData>({
    name: "",
    shop_category_id: 1,
    description: "",
    entrepreneur_id: 1,
  });
  const [socialFormData, setSocialFormData] = useState<SocialFormData[]>(
    initialSocialData || []
  );
  const [menuFormData, setMenuFormData] = useState<MenuFormData[]>(
    initialMenuData || []
  );
  const [categories, setCategories] = useState<ShopCategory[]>([]);
  const [entrepreneurs, setEntrepreneurs] = useState<Entrepreneur[]>([]);

  // เพิ่มข้อมูล Social Media ใหม่
  const handleAddSocial = () => {
    setSocialFormData([
      ...socialFormData,
      { id: Date.now(), platform: "", name: "", link: "", shop_id: 0 },
    ]);
  };

  // อัปเดตข้อมูล Social Media
  const handleSocialChange = (
    index: number,
    field: keyof SocialFormData,
    value: string
  ) => {
    setSocialFormData((prev) => {
      const updatedSocials = [...prev];
      updatedSocials[index] = {
        ...updatedSocials[index],
        [field]: value,
      } as SocialFormData;
      return updatedSocials;
    });
  };

  // ลบข้อมูล Social Media
  const handleRemoveSocial = (index: number) => {
    setSocialFormData(socialFormData.filter((_, i) => i !== index));
  };

  // เพิ่มข้อมูลเมนูใหม่
  const handleAddMenu = () => {
    setMenuFormData([
      ...menuFormData,
      {
        id: Date.now(),
        img: new File([], ""),
        product_name: "",
        product_description: "",
        price: 0,
        shop_id: 0,
      },
    ]);
  };

  // อัปเดตข้อมูลเมนู
  const handleMenuChange = (
    index: number,
    field: keyof MenuFormData,
    value: string | number | File
  ) => {
    setMenuFormData((prev) => {
      const updatedMenus = [...prev];
      updatedMenus[index] = {
        ...updatedMenus[index],
        [field]: value,
      } as MenuFormData;
      return updatedMenus;
    });
  };

  // ลบข้อมูลเมนู
  const handleRemoveMenu = (index: number) => {
    setMenuFormData(menuFormData.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData(
      initialData || {
        name: "",
        shop_category_id: 1,
        description: "",
        entrepreneur_id: 1,
      }
    );
    setMenuFormData(initialMenuData || []);
    setSocialFormData(initialSocialData || []);
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          const [categoriesData, entrepreneursData] = await Promise.all([
            fetchShopCategory(),
            fetchEntrepreneur(),
          ]);
          setCategories(categoriesData);
          setEntrepreneurs(entrepreneursData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [isOpen]);

  // ปิดการ scroll เมื่อ modal เปิด
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (initialSocialData.length > 0) {
      setSocialFormData(initialSocialData);
    } else if (socialFormData.length === 0) {
      setSocialFormData([
        { id: Date.now(), platform: "", name: "", link: "", shop_id: 0 },
      ]);
    }
  }, [initialSocialData]);

  useEffect(() => {
    setMenuFormData((prevMenuData) => {
      if (
        initialMenuData.length > 0 &&
        JSON.stringify(prevMenuData) !== JSON.stringify(initialMenuData)
      ) {
        return initialMenuData;
      } else if (initialMenuData.length === 0 && prevMenuData.length === 0) {
        return [
          {
            id: Date.now(),
            img: new File([], ""), // ใช้ File ว่างๆ เป็นค่าเริ่มต้น
            product_name: "",
            product_description: "",
            price: 0,
            shop_id: 0,
          },
        ];
      }
      return prevMenuData;
    });
  }, [initialMenuData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, socialFormData, menuFormData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[full] ml-[234px] relative max-h-[650px] overflow-y-auto scrollbar-hide">
        <h2 className="text-xl mb-4">
          {initialData ? "Edit Shop" : "Add Shop"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-row items-center">
            <p className="mr-2 w-[150px]">Shop Name: </p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Shop Name"
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="flex flex-row items-center">
            <p className="mr-2 w-[150px]">Shop Category: </p>
            <select
              name="shop_category_id"
              value={formData.shop_category_id}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row w-full">
            <p className="mr-2 w-[150px]">Description: </p>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="border p-2 rounded resize-y min-h-[150px] max-h-[300px] w-full"
              rows={3}
            />
          </div>

          <div className="flex flex-row w-full items-center">
            <p className="mr-2 w-[150px]">Owned By: </p>
            <select
              name="entrepreneur_id"
              value={formData.entrepreneur_id}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="" disabled>
                Select Entrepreneur
              </option>
              {entrepreneurs.map((entrepreneur) => (
                <option key={entrepreneur.id} value={entrepreneur.id}>
                  {entrepreneur.username}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row items-center mt-2">
            <p className="mr-3">Social Media:</p>
            <button
              type="button"
              onClick={handleAddSocial}
              className="bg-green-200 w-[50px] h-[30px] rounded"
            >
              Add
            </button>
          </div>

          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Platform</th>
                <th className="p-2 border">Account Name</th>
                <th className="p-2 border">Link</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {socialFormData.map((social, index) => (
                <tr key={social.id}>
                  <td className="p-2 border">
                    <input
                      type="text"
                      value={social.platform}
                      onChange={(e) =>
                        handleSocialChange(index, "platform", e.target.value)
                      }
                      className="border p-1 w-full"
                      placeholder="Platform"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="text"
                      value={social.name}
                      onChange={(e) =>
                        handleSocialChange(index, "name", e.target.value)
                      }
                      className="border p-1 w-full"
                      placeholder="Account Name"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="text"
                      value={social.link}
                      onChange={(e) =>
                        handleSocialChange(index, "link", e.target.value)
                      }
                      className="border p-1 w-full"
                      placeholder="Link"
                    />
                  </td>
                  <td className="p-2 border text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveSocial(index)}
                      className="bg-red-500 text-white p-1 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* ปุ่มเพิ่มเมนู */}
          <div className="flex flex-row items-center mt-4">
            <p className="mr-3">Menus:</p>
            <button
              type="button"
              onClick={handleAddMenu}
              className="bg-green-200 w-[50px] h-[30px] rounded"
            >
              Add
            </button>
          </div>

          {/* ตารางแสดงรายการเมนู */}
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
                          {/* รูปภาพ */}
                          <Image
                            src={
                              menu.img instanceof File
                                ? URL.createObjectURL(menu.img)
                                : menu.img
                            }
                            alt="Preview"
                            className="w-full h-full object-cover"
                            width={200} // ต้องกำหนดขนาด ถ้าใช้ next/image
                            height={200}
                            onError={(
                              e: React.SyntheticEvent<HTMLImageElement, Event>
                            ) => {
                              const target =
                                e.currentTarget as HTMLImageElement;
                              target.onerror = null; // ป้องกัน loop error
                              handleMenuChange(index, "img", ""); // รีเซ็ตเป็นค่าว่าง
                            }}
                          />
                          {/* Overlay เมื่อ hover */}
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
                          handleMenuChange(index, "img", e.target.files[0]);
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
                        handleMenuChange(index, "product_name", e.target.value)
                      }
                      className="border p-1 w-full h-full"
                      placeholder="Product Name"
                    />
                  </td>
                  <td className="p-2 border relative ">
                    <div className="relative">
                      <textarea
                        value={menu.product_description}
                        onChange={(e) => {
                          if (e.target.value.length <= 200) {
                            handleMenuChange(
                              index,
                              "product_description",
                              e.target.value
                            );
                          }
                        }}
                        onFocus={() =>
                          (document.body.style.overflow = "hidden")
                        }
                        onBlur={() => (document.body.style.overflow = "auto")}
                        className="border p-2 w-full min-h-24 resize-none pr-10 scrollbar-hide resize-y " // Padding ขวาให้เว้นที่ตัวนับ
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
                        let value = e.target.value.replace(/^0+/, ""); // ลบ 0 นำหน้า
                        handleMenuChange(
                          index,
                          "price",
                          value ? parseFloat(value) : 0
                        );
                      }}
                      className="border p-1 w-full appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="Price"
                    />
                  </td>

                  <td className="p-2 border text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveMenu(index)}
                      className="bg-red-500 text-white p-1 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                resetForm(); // คืนค่าเดิม
                onClose(); // ปิด Modal
              }}
              className="p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopFormModal;

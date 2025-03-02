import React, { useState, useEffect } from "react";
import { fetchShopCategory, ShopCategory } from "@/utility/shopcate";
import { fetchEntrepreneur, Entrepreneur } from "@/utility/entrepreneur";

interface ShopFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ShopFormData, socialData: SocialFormData[]) => void;
  initialData?: ShopFormData;
  initialSocialData?: SocialFormData[];
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

const ShopFormModal: React.FC<ShopFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  initialSocialData = [],
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

  const resetForm = () => {
    setFormData(
      initialData || {
        name: "",
        shop_category_id: 1,
        description: "",
        entrepreneur_id: 1,
      }
    );

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

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

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
    if (initialSocialData.length > 0) {
      setSocialFormData(initialSocialData);
    } else if (socialFormData.length === 0) {
      setSocialFormData([
        { id: Date.now(), platform: "", name: "", link: "", shop_id: 0 },
      ]);
    }
  }, [initialSocialData]);

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
    onSubmit(formData, socialFormData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full ml-[234px] max-w-2xl relative max-h-[650px] overflow-y-auto scrollbar-hide">
        <h2 className="text-xl mb-4">
          {initialData ? "Edit Shop" : "Add Shop"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Shop Name"
            className="border p-2 rounded"
          />
          <select
            name="shop_category_id"
            value={formData.shop_category_id}
            onChange={handleChange}
            className="border p-2 rounded"
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
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded resize-y min-h-[150px] max-h-[300px]"
            rows={3}
          />
          <select
            name="entrepreneur_id"
            value={formData.entrepreneur_id}
            onChange={handleChange}
            className="border p-2 rounded"
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
          <div className="flex flex-row items-center">
            <p className="mr-3">Social Media:</p>
            <button
              type="button"
              onClick={handleAddSocial}
              className="bg-green-200 w-[50px] h-[30px] rounded"
            >
              Add
            </button>
          </div>

          <table className="w-full border mt-2">
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

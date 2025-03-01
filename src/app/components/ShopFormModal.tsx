import React, { useState, useEffect } from "react";
import { fetchShopCategory, ShopCategory } from "@/utility/shopcate";
import { fetchEntrepreneur, Entrepreneur } from "@/utility/entrepreneur";

interface ShopFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ShopFormData) => void;
  initialData?: ShopFormData;
}

export interface ShopFormData {
  id?: number;
  name: string;
  shop_category_id: number;
  description: string;
  entrepreneur_id: number;
}

const ShopFormModal: React.FC<ShopFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<ShopFormData>({
    name: "",
    shop_category_id: 1,
    description: "",
    entrepreneur_id: 1,
  });

  const [categories, setCategories] = useState<ShopCategory[]>([]);
  const [entrepreneurs, setEntrepreneurs] = useState<Entrepreneur[]>([]);

  useEffect(() => {
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
  }, []);

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
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
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

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
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

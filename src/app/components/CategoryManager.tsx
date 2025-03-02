import { useState, useEffect, useRef } from "react";
import {
  createCategory,
  DeleteCatagory,
  fetchShopCategory,
  ShopCategory,
} from "@/utility/shopcategory";

interface CategoryManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  isOpen,
  onClose,
}) => {
  const [shopCategory, setShopCategory] = useState<ShopCategory[]>([]);
  const [isAddingCat, setIsAddingCat] = useState(false);
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const categoryInputRef = useRef<HTMLInputElement | null>(null);

  const fetchData = async () => {
    try {
      const categories = await fetchShopCategory();
      setShopCategory(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const handleAddCategories = () => {
    setIsAddingCat(true);
    setCategorySearchTerm("");
    categoryInputRef.current?.focus();
  };

  const handleConfirmCat = async () => {
    if (!categorySearchTerm.trim()) return;
    try {
      await createCategory({ name: categorySearchTerm });
      setIsAddingCat(false);
      fetchData();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCat = async (id: number, name: string) => {
    const confirmRemove = window.confirm(`Remove Category "${name}"?`);
    if (confirmRemove) {
      try {
        await DeleteCatagory(id);
        fetchData();
      } catch (error) {
        console.error("Error removing category:", error);
      }
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Manage Categories</h2>
          <button onClick={onClose} className="text-xl">
            ✖
          </button>
        </div>
        <ul className="mt-4">
          {shopCategory.map((category) => (
            <li key={category.id} className="p-2 border-b flex justify-between">
              <span>{category.name}</span>
              <button
                onClick={() => handleDeleteCat(category.id, category.name)}
                className="text-red-500"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
        {isAddingCat ? (
          <div className="flex items-center space-x-2 mt-4">
            <input
              type="text"
              value={categorySearchTerm}
              onChange={(e) => setCategorySearchTerm(e.target.value)}
              ref={categoryInputRef}
              className="border p-2 flex-1"
              placeholder="New Category..."
            />
            <button
              onClick={handleConfirmCat}
              className="bg-green-500 text-white px-3 py-2 rounded"
            >
              ✔
            </button>
            <button
              onClick={() => setIsAddingCat(false)}
              className="bg-red-500 text-white px-3 py-2 rounded"
            >
              ✖
            </button>
          </div>
        ) : null}

        {!isAddingCat && (
          <button
            onClick={handleAddCategories}
            className="mt-4 px-5 py-2 bg-green-200 rounded w-full"
          >
            + Add Category
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default CategoryManager;

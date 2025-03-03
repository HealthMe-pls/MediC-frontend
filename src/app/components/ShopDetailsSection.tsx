import React from "react";
import { ShopFormData } from "./types";
import { ShopCategory } from "@/utility/shopcate";
import { Entrepreneur } from "@/utility/entrepreneur";

interface ShopDetailsSectionProps {
  formData: ShopFormData;
  categories: ShopCategory[];
  entrepreneurs: Entrepreneur[];
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const ShopDetailsSection: React.FC<ShopDetailsSectionProps> = ({
  formData,
  categories,
  entrepreneurs,
  onChange,
}) => {
  return (
    <>
      <div className="flex flex-row items-center">
        <p className="mr-2 w-[150px]">Shop Name: </p>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Shop Name"
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="flex flex-row items-center">
        <p className="mr-2 w-[150px]">Shop Category: </p>
        <select
          name="shop_category_id"
          value={formData.shop_category_id}
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
    </>
  );
};

export default ShopDetailsSection;

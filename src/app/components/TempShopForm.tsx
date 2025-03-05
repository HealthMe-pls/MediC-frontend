"use client";

import React, { useState, useEffect, useCallback } from "react";
import { fetchShopCategory, ShopCategory } from "@/utility/shopcate";
import { fetchEntrepreneur, Entrepreneur } from "@/utility/entrepreneur";
import { ShopFormData, SocialFormData, MenuFormData, PhotoForm } from "./types";
import ShopDetailsSection from "./ShopDetailsSection";
import SocialMediaForm from "./SocialMediaForm";
import MenuForm from "./MenuForm";
import ImageUpload from "./ImageUpload";
import MarketHoursTable from "./MarketHoursTable";
import { ShopOpenDates } from "./types";

export interface TempShopFormProps {
  onSubmit: (
    data: ShopFormData,
    socialData: SocialFormData[],
    menuData: MenuFormData[],
    PhotoData: PhotoForm,
    shopHours: ShopOpenDates[]
  ) => void;
  initialData?: ShopFormData;
  initialSocialData?: SocialFormData[];
  initialMenuData?: MenuFormData[];
  initialPhotoData?: PhotoForm;
  initialShopHours?: ShopOpenDates[];
}

const TempShopForm: React.FC<TempShopFormProps> = ({
  onSubmit,
  initialData,
  initialSocialData = [],
  initialMenuData = [],
  initialPhotoData,
  initialShopHours,
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
  const [isEditing, setIsEditing] = useState(false);
  const [formImg, setFormImg] = useState<PhotoForm>(
    initialPhotoData || {
      cover_id: 0,
      cover_img: "",
      sec_id: 0,
      sec_img: "",
      thr_id: 0,
      thr_img: "",
    }
  );
  const [savedShopHours, setSavedShopHours] = useState<ShopOpenDates[]>(
    () => initialShopHours || []
  );

  const handleAddSocial = () => {
    setSocialFormData([
      ...socialFormData,
      { id: Date.now(), platform: "", name: "", link: "", shop_id: 0 },
    ]);
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "cover_img" | "sec_img" | "thr_img"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormImg((prev) => ({ ...prev, [key]: file }));
    }
  };

  const handleRemoveImage = (key: "cover_img" | "sec_img" | "thr_img") => {
    setFormImg((prev) => ({ ...prev, [key]: "" }));
  };

  const handleShopHoursChange = useCallback((hours: ShopOpenDates[]) => {
    setSavedShopHours(hours);
  }, []);

  const handleSocialChange = (
    index: number,
    field: keyof SocialFormData,
    value: string
  ) => {
    setSocialFormData((prev) => {
      const updatedSocials = [...prev];
      updatedSocials[index] = { ...updatedSocials[index], [field]: value };
      return updatedSocials;
    });
  };

  const handleRemoveSocial = (index: number) => {
    setSocialFormData(socialFormData.filter((_, i) => i !== index));
  };

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

  const handleMenuChange = (
    index: number,
    field: keyof MenuFormData,
    value: string | number | File
  ) => {
    setMenuFormData((prev) => {
      const updatedMenus = [...prev];
      updatedMenus[index] = { ...updatedMenus[index], [field]: value };
      return updatedMenus;
    });
  };

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
    setFormImg(
      initialPhotoData || {
        cover_id: 0,
        cover_img: "",
        sec_id: 0,
        sec_img: "",
        thr_id: 0,
        thr_img: "",
      }
    );
  };

  useEffect(() => {
    if (!(initialData ?? null)) {
      resetForm();
    }
  }, [initialData ?? null]);

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

    // ทำการเรียก fetchData เพียงครั้งเดียวหลังจาก component mount
    fetchData();
  }, []); // เพิ่ม array ว่าง [] เพื่อให้มันทำงานแค่ครั้งเดียว

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
            idPhoto: Date.now(),
            img: new File([], ""),
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

    const filteredShopHours = savedShopHours.filter(
      (shopHour) => shopHour.start_time !== ""
    );

    onSubmit(
      formData,
      socialFormData,
      menuFormData,
      formImg,
      filteredShopHours
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">
        {/* Disable input fields when not editing */}
        <ShopDetailsSection
          formData={formData}
          categories={categories}
          entrepreneurs={entrepreneurs}
          onChange={handleChange}
          disabled={!isEditing}
          isTemp={true}
        />
        <SocialMediaForm
          socialFormData={socialFormData}
          onAddSocial={handleAddSocial}
          onSocialChange={handleSocialChange}
          onRemoveSocial={handleRemoveSocial}
          disabled={!isEditing}
        />
        {isEditing && (
          <MarketHoursTable
            shopId={initialData?.id || 0}
            initialShopHours={initialShopHours}
            onShopHoursChange={handleShopHoursChange}
          />
        )}
        <p className="mb-1">Shop Image :</p>
        <ImageUpload
          formImg={formImg}
          handleImageChange={handleImageChange}
          handleRemoveImage={handleRemoveImage}
          disabled={!isEditing}
        />

        <MenuForm
          menuFormData={menuFormData}
          onAddMenu={handleAddMenu}
          onMenuChange={handleMenuChange}
          onRemoveMenu={handleRemoveMenu}
          disabled={!isEditing}
        />
        <div className="flex justify-center gap-2">
          <button
            type="submit"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
            className={`p-2 rounded-[22px] text-[20px] w-[100px] h-[50px] ${
              isEditing
                ? "bg-blue-200 hover:bg-blue-300"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TempShopForm;

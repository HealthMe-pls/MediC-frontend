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

export interface ShopFormModalProps {
  isOpen: boolean;
  onClose: () => void;
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

const ShopFormModal: React.FC<ShopFormModalProps> = ({
  isOpen,
  onClose,
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
    // ไม่รีเซ็ต savedShopHours เพื่อให้ค่าที่แก้ไขไว้คงอยู่
    // setSavedShopHours(initialShopHours || []);
  };

  useEffect(() => {
    if (isOpen && !(initialData ?? null)) {
      resetForm();
    }
  }, [isOpen, initialData ?? null]);

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
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[full] ml-[234px] relative max-h-[650px] overflow-y-auto scrollbar-hide">
        <h2 className="text-xl mb-4">
          {initialData?.name ? "Edit Shop" : "Add Shop"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Shop Details Section */}
          <ShopDetailsSection
            formData={formData}
            categories={categories}
            entrepreneurs={entrepreneurs}
            onChange={handleChange}
          />

          {/* Social Media Section */}
          <SocialMediaForm
            socialFormData={socialFormData}
            onAddSocial={handleAddSocial}
            onSocialChange={handleSocialChange}
            onRemoveSocial={handleRemoveSocial}
          />
          {/* Market Hours Section */}
          <MarketHoursTable
            shopId={initialData?.id || 0}
            initialShopHours={initialShopHours}
            onShopHoursChange={handleShopHoursChange}
          />
          <div className="my-1 ml-4">
            <p className="mb-1">Shop Image :</p>
            <ImageUpload
              formImg={formImg}
              handleImageChange={handleImageChange}
              handleRemoveImage={handleRemoveImage}
            />
          </div>
          {/* Menu Section */}
          <MenuForm
            menuFormData={menuFormData}
            onAddMenu={handleAddMenu}
            onMenuChange={handleMenuChange}
            onRemoveMenu={handleRemoveMenu}
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
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

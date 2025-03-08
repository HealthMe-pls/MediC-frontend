/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"; // This tells Next.js that this file is a client-side component

import { useEffect, useState } from "react";
import {
  getShopDetailsByLoggedInEntrepreneur,
  TempShopEn,
} from "@/utility/entrepreneurLogin";
import { logoutEntrepreneur } from "@/utility/login";
import { useRouter } from "next/navigation";
import VendorLayouts from "@/app/layouts/VendorLayouts";
import TempShopForm from "@/app/components/TempShopForm";
import {
  MenuFormData,
  PhotoForm,
  ShopFormData,
  ShopOpenDates,
  SocialFormData,
} from "@/app/components/types";
import { fetchShopById } from "@/utility/shopDetail";
import {
  createMenuEnt,
  deleteMenuEnt,
  updateTempMenu,
  updateTempShop,
} from "@/utility/temp";

const EditShopInformation = () => {
  const [shopData, setShopData] = useState<TempShopEn[]>([]);
  const [selectedShop, setSelectedShop] = useState<TempShopEn | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const router = useRouter();
  const [editShopData, setEditShopData] = useState<ShopFormData | null>(null);
  const [editSocialData, setEditSocialData] = useState<SocialFormData[] | null>(
    null
  );
  const [editMenuData, setEditMenuData] = useState<MenuFormData[] | null>(null);
  const [editPhotoData, setEditPhotoData] = useState<PhotoForm | null>(null);
  const [editTimeData, setEditTimeData] = useState<ShopOpenDates[] | null>(
    null
  );

  const handleEditInformation = async (temp: TempShopEn | null) => {
    if (temp) {
      const newShopData: ShopFormData = {
        id: temp.shop_id,
        name: temp.name,
        shop_category_id: temp.category_id,
        description: temp.description || "",
        entrepreneur_id: temp.entrepreneur_id,
      };
      const newPhotoData: PhotoForm = {
        cover_id: temp.photos_shop?.[0]?.id || 0,
        cover_img: temp.photos_shop?.[0]
          ? `${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${temp.photos_shop[0]?.path_file}`
          : "",
        sec_id: temp.photos_shop?.[1]?.id || 0,
        sec_img: temp.photos_shop?.[1]
          ? `${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${temp.photos_shop[1]?.path_file}`
          : "",
        thr_id: temp.photos_shop?.[2]?.id || 0,
        thr_img: temp.photos_shop?.[2]
          ? `${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${temp.photos_shop[2]?.path_file}`
          : "",
      };
      const newSocialData: SocialFormData[] = temp.socials
        ? temp.socials.map((social) => ({
            id: social.id,
            name: social.name,
            platform: social.platform,
            link: social.link,
            shop_id: temp.shop_id,
          }))
        : [];
      const newMenuData: MenuFormData[] = temp.menus
        ? temp.menus.map((menu) => ({
            id: menu.id,
            idPhoto: menu.photos?.length > 0 ? menu.photos[0].id : 0,
            img:
              menu.photos?.length > 0
                ? `${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${menu.photos[0].path_file}`
                : "",
            product_name: menu.product_name,
            product_description: menu.product_description,
            price: menu.price,
            shop_id: temp.shop_id,
          }))
        : [];

      const combinedArray = [...temp.editTime, ...temp.addTime, ...temp.time];

      const newTimeData: ShopOpenDates[] = combinedArray
        ? combinedArray.map((time) => ({
            id: time.id,
            start_time: time.start_time,
            end_time: time.end_time,
            shop_id: temp.shop_id,
            market_open_date_id: time.market_open_date_id,
          }))
        : [];
      // ป้องกันการตั้งค่า state ถ้าข้อมูลไม่เปลี่ยน
      setEditShopData((prev) =>
        JSON.stringify(prev) === JSON.stringify(newShopData)
          ? prev
          : newShopData
      );
      setEditPhotoData((prev) =>
        JSON.stringify(prev) === JSON.stringify(newShopData)
          ? prev
          : newPhotoData
      );
      setEditSocialData((prev) =>
        JSON.stringify(prev) === JSON.stringify(newSocialData)
          ? prev
          : newSocialData
      );
      setEditMenuData((prev) =>
        JSON.stringify(prev) === JSON.stringify(newMenuData)
          ? prev
          : newMenuData
      );
      setEditTimeData((prev) =>
        JSON.stringify(prev) === JSON.stringify(newTimeData)
          ? prev
          : newTimeData
      );
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setIsLoggedIn(false);
      router.push("/login");
    } else {
      const fetchShopData = async () => {
        try {
          const response = await getShopDetailsByLoggedInEntrepreneur();

          if ("error" in response) {
            setError(response.error);
            setShopData([]); // Ensure it's an empty array, not null
          } else {
            setShopData(response.temp_shops);

            // Set the first shop as the default selected shop
            if (response.temp_shops.length > 0) {
              setSelectedShop(response.temp_shops[0]);
              handleEditInformation(response.temp_shops[0]);
            }
          }
        } catch (err) {
          setError(`Failed to load shop data ${err}`);
          setShopData([]); // Ensure it's an empty array
        }
      };

      fetchShopData();
    }
  }, [router]);

  const handleShopChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedShopId = event.target.value; // This is a string
    const shop = shopData.find(
      (shop) => shop.shop_id.toString() === selectedShopId
    ); // Convert shop_id to string
    setSelectedShop(shop || null);
    if (shop) handleEditInformation(shop);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (token) {
        await logoutEntrepreneur(token);
        setIsLoggedIn(false);
        localStorage.removeItem("authToken");

        // Optionally, redirect the user to the login page after logout
        router.push("/login"); // Navigate to the login page after successful logout
      } else {
        console.error("No token found, cannot log out.");
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleMenuUpdate = async (shopId: number, menuData: MenuFormData[]) => {
    try {
      const deletedMenus = editMenuData?.filter(
        (oldMenu) => !menuData.some((newMenu) => newMenu.id === oldMenu.id)
      );

      for (const menu of deletedMenus || []) {
        if (menu.id && selectedShop) {
          // console.log("delete menuid : " + menu.id);
          const deleteMenu = {
            menu_id: menu.id,
            temp_id: selectedShop?.id,
          };
          await deleteMenuEnt(deleteMenu);
          // const response_menu = await deleteMenu(menu.id);
          // console.log("response from del menu" + response_menu);
        }
      }

      const updatedMenus = menuData.filter((newMenu) =>
        editMenuData?.some(
          (oldMenu) =>
            oldMenu.id === newMenu.id &&
            (newMenu.img instanceof File ||
              oldMenu.product_name !== newMenu.product_name ||
              oldMenu.product_description !== newMenu.product_description ||
              oldMenu.price !== newMenu.price) // ต้องมีการเปลี่ยนแปลงจริง ๆ
        )
      );

      for (const menu of updatedMenus) {
        const upMenu = {
          product_name: menu.product_name,
          product_description: menu.product_description,
          price: menu.price,
          shop_id: shopId,
        };
        // console.log("update menuid : " + menu.id);
        await updateTempMenu(menu.id!, upMenu);

        // if (menu.img instanceof File && menu.id) {
        //   console.log(menu.idPhoto);
        //   if (menu.idPhoto) await deletePhoto(menu.idPhoto);
        //   await uploadPhotoMenuByAdmin(menu.img, menu.id);
        // }
      }

      const newMenus = menuData.filter(
        (newMenu) => !editMenuData?.some((oldMenu) => oldMenu.id === newMenu.id)
      );

      for (const menu of newMenus) {
        const createMenu = {
          product_name: menu.product_name,
          product_description: menu.product_description,
          price: menu.price,
          shop_id: shopId,
        };
        await createMenuEnt(createMenu);
        // const shopDe = await fetchShopById(shopId);
        // const createdmenu = shopDe.menus.find(
        //   (m) => menu.product_name === m.product_name
        // );
        // if (createdmenu && menu.img && menu.img instanceof File) {
        //   await uploadPhotoMenuByAdmin(menu.img, createdmenu?.id);
        // }
      }
    } catch (error) {
      console.error("Error updating social media:", error);
    }
  };

  const handleEditShop = async (
    formData: ShopFormData,
    socialData: SocialFormData[],
    menuData: MenuFormData[],
    PhotoData: PhotoForm,
    shopHours: ShopOpenDates[]
  ) => {
    const newData = {
      name: formData.name,
      description: formData.description,
      shop_category_id: Number(formData.shop_category_id) || 0,
    };
    // console.log(newData);
    if (selectedShop) {
      await updateTempShop(selectedShop.shop_id, newData);
      await handleMenuUpdate(selectedShop.shop_id, menuData);
    }
  };

  return (
    <VendorLayouts currentPage="Edit Shop Information">
      <div>
        <h1 className="text-[18px] font-light">
          Please select a shop from the list to edit its details
        </h1>

        {error && <div style={{ color: "red" }}>{error}</div>}

        {shopData.length > 0 ? (
          <div>
            <div className="flex flex-row mt-5">
              <h2 className="text-[25px] mr-2">Select Shop :</h2>

              {/* Dropdown to select shop */}
              <select
                onChange={handleShopChange}
                value={selectedShop?.shop_id || ""}
                className="w-[70%] rounded-[15px] pl-5 "
              >
                <option value="">Select a Shop</option>
                {shopData.map((shop) => (
                  <option
                    key={shop.shop_id}
                    value={shop.shop_id}
                    className="pl-5"
                  >
                    {shop.name}
                  </option>
                ))}
              </select>
            </div>

            <TempShopForm
              onSubmit={handleEditShop}
              initialData={editShopData || undefined}
              initialSocialData={editSocialData || []}
              initialMenuData={editMenuData || undefined}
              initialPhotoData={editPhotoData || undefined}
              initialShopHours={editTimeData || undefined}
            />
          </div>
        ) : (
          <p>{error ? "No shops found." : "Loading your shop data..."}</p>
        )}

        {isLoggedIn && (
          <button onClick={handleLogout} style={{ marginTop: "20px" }}>
            Log Out
          </button>
        )}
      </div>
    </VendorLayouts>
  );
};

export default EditShopInformation;

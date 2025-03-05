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

const EditShopInformation = () => {
  const [shopData, setShopData] = useState<TempShopEn[]>([]);
  const [selectedShop, setSelectedShop] = useState<TempShopEn | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const router = useRouter();

  const handleEditInformation = async (temp: TempShopEn | null) => {
    // if (temp) {
    //   const newShopData: ShopFormData = {
    //     id: temp.shop_id,
    //     name: temp.name,
    //     shop_category_id: temp.category_id,
    //     description: temp.description || "",
    //     entrepreneur_id: temp.entrepreneur_id,
    //   };
    //   const newPhotoData: PhotoForm = {
    //     cover_id: temp.photos_shop?.[0]?.photo_id || 0,
    //     cover_img: shop.photos?.[0]
    //       ? `${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${shop.photos[0]?.pathfile}`
    //       : "",
    //     sec_id: shop.photos?.[1]?.photo_id || 0,
    //     sec_img: shop.photos?.[1]
    //       ? `${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${shop.photos[1]?.pathfile}`
    //       : "",
    //     thr_id: shop.photos?.[2]?.photo_id || 0,
    //     thr_img: shop.photos?.[2]
    //       ? `${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${shop.photos[2]?.pathfile}`
    //       : "",
    //   };
    //   const newSocialData: SocialFormData[] = shop.social_media
    //     ? shop.social_media
    //         .filter((social) => social.is_public)
    //         .map((social) => ({
    //           id: social.id,
    //           name: social.name,
    //           platform: social.platform,
    //           link: social.link,
    //           shop_id: shop.shop_id,
    //         }))
    //     : [];
    //   const newMenuData: MenuFormData[] = shop.menus
    //     ? shop.menus
    //         .filter((menu) => menu.is_public) // กรองเฉพาะเมนูที่ isPublic เป็น true
    //         .map((menu) => ({
    //           id: menu.id,
    //           idPhoto:
    //             menu.photos?.length > 0 ? menu.photos[0].photo_id : 0,
    //           img:
    //             menu.photos?.length > 0
    //               ? `${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${menu.photos[0].pathfile}`
    //               : "",
    //           product_name: menu.product_name,
    //           product_description: menu.product_description,
    //           price: menu.price,
    //           shop_id: shop.shop_id,
    //         }))
    //     : [];
    //   const newTimeData: ShopOpenDates[] = shop.shop_open_dates
    //     ? shop.shop_open_dates.map((time) => ({
    //         id: time.id,
    //         start_time: time.start_time,
    //         end_time: time.end_time,
    //         shop_id: shop.shop_id,
    //         market_open_date_id: time.market_open_date_id,
    //       }))
    //     : [];
    //   // ป้องกันการตั้งค่า state ถ้าข้อมูลไม่เปลี่ยน
    //   setEditShopData((prev) =>
    //     JSON.stringify(prev) === JSON.stringify(newShopData)
    //       ? prev
    //       : newShopData
    //   );
    //   setEditPhotoData((prev) =>
    //     JSON.stringify(prev) === JSON.stringify(newShopData)
    //       ? prev
    //       : newPhotoData
    //   );
    //   setEditSocialData((prev) =>
    //     JSON.stringify(prev) === JSON.stringify(newSocialData)
    //       ? prev
    //       : newSocialData
    //   );
    //   setEditMenuData((prev) =>
    //     JSON.stringify(prev) === JSON.stringify(newMenuData)
    //       ? prev
    //       : newMenuData
    //   );
    //   setEditTimeData((prev) =>
    //     JSON.stringify(prev) === JSON.stringify(newTimeData)
    //       ? prev
    //       : newTimeData
    //   );
    // }
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

  const handleEditShop = async (
    formData: ShopFormData,
    socialData: SocialFormData[],
    menuData: MenuFormData[],
    PhotoData: PhotoForm,
    shopHours: ShopOpenDates[]
  ) => {};

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

            {/* Display selected shop details */}
            {selectedShop ? (
              <div>
                <h3>{selectedShop.name}</h3>
                <ul>
                  <li>
                    <strong>Entrepreneur ID:</strong>{" "}
                    {selectedShop.entrepreneur_id}
                  </li>

                  {/* Socials */}
                  <li>
                    <strong>Socials:</strong>
                    {selectedShop.socials.length > 0
                      ? selectedShop.socials.map((s, index) => (
                          <span key={index}>
                            {s.platform} ({s.link}) |{" "}
                          </span>
                        ))
                      : "No socials available"}
                  </li>

                  {/* Menus */}
                  <li>
                    <strong>Menus:</strong>
                    {selectedShop.menus.length > 0
                      ? selectedShop.menus.map((menu) => (
                          <span key={menu.id}>{menu.product_name} | </span>
                        ))
                      : "No menus available"}
                  </li>

                  {/* Photos */}
                  <li>
                    <strong>Shop Photos:</strong>
                    {selectedShop.photos_shop.length > 0
                      ? selectedShop.photos_shop.map((photo, index) => (
                          <span key={index}>{photo.path_file} | </span>
                        ))
                      : "No photos available"}
                  </li>
                  <li>
                    <strong>Menu Photos:</strong>
                    {selectedShop.photos_menu.length > 0
                      ? selectedShop.photos_menu.map((photo, index) => (
                          <span key={index}>{photo.path_file} | </span>
                        ))
                      : "No menu photos available"}
                  </li>

                  {/* Time Details */}
                  <li>
                    <strong>Shop Open Dates:</strong>
                    {selectedShop.time.length > 0
                      ? selectedShop.time.map((date, index) => (
                          <span key={index}>
                            {date.start_time} - {date.end_time} |{" "}
                          </span>
                        ))
                      : "No open dates available"}
                  </li>
                  <li>
                    <strong>Added Time:</strong>
                    {selectedShop.addTime.length > 0
                      ? selectedShop.addTime.map((date, index) => (
                          <span key={index}>
                            {date.start_time} - {date.end_time} |{" "}
                          </span>
                        ))
                      : "No added times available"}
                  </li>
                  <li>
                    <strong>Edited Time:</strong>
                    {selectedShop.editTime.length > 0
                      ? selectedShop.editTime.map((date, index) => (
                          <span key={index}>
                            {date.start_time} - {date.end_time} |{" "}
                          </span>
                        ))
                      : "No edited times available"}
                  </li>
                  <li>
                    <strong>Deleted Time:</strong>
                    {selectedShop.deleteTime.length > 0
                      ? selectedShop.deleteTime.map((date, index) => (
                          <span key={index}>
                            {date.start_time} - {date.end_time} |{" "}
                          </span>
                        ))
                      : "No deleted times available"}
                  </li>
                </ul>
              </div>
            ) : (
              <p>Please select a shop to view details.</p>
            )}
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

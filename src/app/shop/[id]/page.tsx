"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchShopById, ShopDetail } from "@/utility/shopDetail";
import CardProductDetail from "@/app/components/CardProductDetail";
// import Link from "next/link";
import Header from "@/app/layouts/Header";
import ImageBanner from "@/app/components/ImageBanner";
import Footer from "@/app/layouts/Footer";
import { format, addDays, subDays  } from "date-fns";
import { isAfter, isBefore } from "date-fns";

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return format(date, "dd/MM/yyyy EEEE");
};
const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  return format(date, "HH:mm");
};

const ShopPage = () => {
  const { id } = useParams();
  const [shopDetail, setShopDetail] = useState<ShopDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const filteredDates = shopDetail?.shop_open_dates
  .filter((date) => {
    const startTime = new Date(date.start_time);
    const now = new Date();
    const thirtyDaysFromNow = addDays(now, 30);
    const oneDayBeforeNow = subDays(now, 1);

    return startTime >= oneDayBeforeNow && startTime <= thirtyDaysFromNow;
  })
  .sort((a, b) => {
    const startTimeA = new Date(a.start_time);
    const startTimeB = new Date(b.start_time);

    return startTimeA.getTime() - startTimeB.getTime();
  });

const checkShopOpenStatus = () => {
  if (!shopDetail?.open_status || !filteredDates || filteredDates.length === 0) {
    return false;
  }

  const now = new Date();

  const isOpen = filteredDates.some((date) => {
    const startTime = new Date(date.start_time);
    const endTime = new Date(date.end_time);

    return isAfter(now, startTime) && isBefore(now, endTime);
  });

  return isOpen ? true : false;
};

  const shopStatus = checkShopOpenStatus();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const data = await fetchShopById(Number(id));
          setShopDetail(data);
        } catch (error) {
          setError("Failed to fetch shop details");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="font-lexend text-[#4C4343] bg-[#FFF7EB] min-h-screen flex flex-col justify-between">
      {/*Mobile*/}
      <div className="sm:hidden ">
        <div>
          {shopDetail ? (
            <div className=" font-lexend text-[#4C4343] flex-col justify-center  bg-[#FFF7EB]">
              <div className="p-4 mt-[55px]">
                {shopDetail.photos?.filter((photo) => photo.is_public)?.length >
                  0 && (
                  <div className="">
                    <ImageBanner
                      photos={shopDetail.photos.filter(
                        (photo) => photo.is_public
                      )}
                      basePath="http://127.0.0.1:3000/"
                    />
                  </div>
                )}
              </div>

              <div className="mx-5">
                <div className="flex justify-between items-center">
                  <div>
                    <p className=" font-regular text-[21px] ">
                      {shopDetail.name}
                    </p>
                    <p className="font-light">{shopDetail.category}</p>
                  </div>
                  <p className="text-green-500 font-light text-[14px]">
                    {shopStatus ? (
                      <svg
                        width="73"
                        height="23"
                        viewBox="0 0 73 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="73" height="23" rx="11.5" fill="#D5EBD6" />
                        <circle cx="16" cy="12" r="5" fill="#52A794" />
                        <path d="1" fill="#4C4343" />
                      </svg>
                    ) : (
                      <svg
                        width="73"
                        height="23"
                        viewBox="0 0 73 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="73" height="23" rx="11.5" fill="#FFC7C7" />
                        <circle cx="16" cy="12" r="5" fill="#E57373" />
                        <path d="2" fill="#4C4343" />
                      </svg>
                    )}
                  </p>
                </div>

                <p className="mt-4 font-light text-[14px]">
                  &emsp;&emsp;{shopDetail.description}
                </p>
                <div className="text-[18px] font-regular flex items-center  mt-5 mb-2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <path d="3" fill="#4C4343" />
                  </svg>
                  <p>Business Hours</p>
                </div>
                {filteredDates && filteredDates.length > 0 ? (
                  <ul>
                    {filteredDates.map((date, index) => (
                      <li key={index} className="text-[14px] font-light">
                        {`${formatDate(date.start_time)} ${formatTime(
                          date.start_time
                        )} - ${formatTime(date.end_time)}`}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[14px] font-light">Not available</p>
                )}
                <p className="text-[18px] font-regular flex items-center mt-5 mb-2">
                  <svg
                    width="24"
                    height="16"
                    viewBox="0 0 24 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <path d="4" fill="#4C4343" />
                  </svg>
                  Menu
                </p>
                {shopDetail?.menus?.length ? (
                  <div className="hide-scrollbar flex-col">
                    {shopDetail.menus
                      .filter((menu) => menu.is_public)
                      .map((menu) => (
                        <div
                          key={menu.id}
                          style={{
                            flexShrink: 0,
                          }}
                        >
                          <CardProductDetail menu={menu} />
                        </div>
                      ))}
                  </div>
                ) : (
                  <p>No menus available</p>
                )}
                <div className="mt-4">
                  <p className="text-[18px] font-regular flex items-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2"
                    >
                      <path d="5" fill="#4C4343" />
                    </svg>
                    Social Media
                  </p>
                  {Array.isArray(shopDetail?.social_media) &&
                  shopDetail.social_media.filter((media) => media.is_public)
                    .length > 0 ? (
                    <ul>
                      {shopDetail.social_media
                        .filter((media) => media.is_public)
                        .map((media, index) => (
                          <li key={index} className="text-[14px] font-light">
                            {media.platform}:{" "}
                            <a href={media.link} className="underline">
                              {media.name}
                            </a>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p className="text-[14px] font-light">Not available</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p>No shop details found</p>
          )}
        </div>
        <div className="flex flex-col justify-end mt-8">
          <div>
            <Footer />
          </div>
        </div>
      </div>

      {/*Desktop*/}
      <div className="hidden md:block">
        <Header />
        {shopDetail ? (
          <div className="bg-[#FFF7EB] flex flex-col items-center ">
            {" "}
            {/* Adjusted padding to move block lower */}
            {/* Main Block */}
            <div className="bg-white p-6 mt-6 rounded-2xl shadow-lg flex flex-col md:flex-row">
              {" "}
              {/* Increased margin-top */}
              {/* Left Section: Image Banner */}
              <div className="pl-4 pr-16">
                <div className="flex justify-between items-center">
                  <div>
                    <p className=" font-regular text-[21px] ">
                      {shopDetail.name}
                    </p>
                    <p className="font-light mb-2">{shopDetail.category}</p>
                  </div>
                  <p className="text-green-500 font-light text-[14px]">
                    {shopStatus ? (
                      <svg
                        width="73"
                        height="23"
                        viewBox="0 0 73 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="73" height="23" rx="11.5" fill="#D5EBD6" />
                        <circle cx="16" cy="12" r="5" fill="#52A794" />
                        <path
                          d="M31.88 17.15C31.14 17.15 30.455 17.02 29.825 16.76C29.205 16.49 28.66 16.115 28.19 15.635C27.73 15.155 27.37 14.59 27.11 13.94C26.86 13.28 26.735 12.56 26.735 11.78C26.735 11 26.86 10.285 27.11 9.635C27.37 8.975 27.73 8.405 28.19 7.925C28.66 7.435 29.205 7.06 29.825 6.8C30.455 6.53 31.14 6.395 31.88 6.395C32.63 6.395 33.315 6.53 33.935 6.8C34.565 7.06 35.11 7.435 35.57 7.925C36.04 8.405 36.4 8.975 36.65 9.635C36.91 10.285 37.04 11 37.04 11.78C37.04 12.55 36.91 13.265 36.65 13.925C36.4 14.575 36.04 15.145 35.57 15.635C35.11 16.115 34.565 16.49 33.935 16.76C33.315 17.02 32.63 17.15 31.88 17.15ZM31.88 15.995C32.45 15.995 32.975 15.895 33.455 15.695C33.945 15.485 34.365 15.19 34.715 14.81C35.065 14.43 35.335 13.985 35.525 13.475C35.725 12.955 35.825 12.39 35.825 11.78C35.825 11.16 35.725 10.595 35.525 10.085C35.335 9.565 35.065 9.115 34.715 8.735C34.365 8.355 33.945 8.06 33.455 7.85C32.975 7.64 32.45 7.535 31.88 7.535C31.31 7.535 30.78 7.64 30.29 7.85C29.81 8.06 29.395 8.355 29.045 8.735C28.695 9.115 28.425 9.565 28.235 10.085C28.045 10.595 27.95 11.16 27.95 11.78C27.95 12.39 28.045 12.955 28.235 13.475C28.425 13.985 28.695 14.43 29.045 14.81C29.395 15.19 29.81 15.485 30.29 15.695C30.78 15.895 31.31 15.995 31.88 15.995ZM38.8723 20.3V9.17H39.9973L40.0273 11.075L39.8173 11.105C39.9073 10.725 40.1023 10.38 40.4023 10.07C40.7023 9.75 41.0673 9.495 41.4973 9.305C41.9273 9.115 42.3823 9.02 42.8623 9.02C43.5623 9.02 44.1873 9.195 44.7373 9.545C45.2973 9.895 45.7423 10.375 46.0723 10.985C46.4023 11.595 46.5673 12.295 46.5673 13.085C46.5673 13.865 46.4073 14.56 46.0873 15.17C45.7673 15.78 45.3273 16.265 44.7673 16.625C44.2073 16.975 43.5773 17.15 42.8773 17.15C42.3873 17.15 41.9223 17.05 41.4823 16.85C41.0423 16.65 40.6673 16.39 40.3573 16.07C40.0473 15.74 39.8423 15.385 39.7423 15.005H40.0123V20.3H38.8723ZM42.6973 16.07C43.2273 16.07 43.6973 15.94 44.1073 15.68C44.5173 15.42 44.8423 15.065 45.0823 14.615C45.3223 14.165 45.4423 13.655 45.4423 13.085C45.4423 12.505 45.3223 11.99 45.0823 11.54C44.8423 11.09 44.5173 10.735 44.1073 10.475C43.6973 10.215 43.2273 10.085 42.6973 10.085C42.1673 10.085 41.6923 10.215 41.2723 10.475C40.8623 10.725 40.5373 11.075 40.2973 11.525C40.0573 11.975 39.9373 12.49 39.9373 13.07C39.9373 13.65 40.0573 14.165 40.2973 14.615C40.5373 15.065 40.8623 15.42 41.2723 15.68C41.6923 15.94 42.1673 16.07 42.6973 16.07ZM51.6534 17.15C50.8734 17.15 50.1784 16.98 49.5684 16.64C48.9684 16.3 48.4984 15.825 48.1584 15.215C47.8184 14.605 47.6484 13.905 47.6484 13.115C47.6484 12.505 47.7434 11.955 47.9334 11.465C48.1234 10.965 48.3884 10.53 48.7284 10.16C49.0784 9.79 49.4934 9.505 49.9734 9.305C50.4534 9.095 50.9734 8.99 51.5334 8.99C52.0634 8.99 52.5434 9.085 52.9734 9.275C53.4134 9.465 53.7884 9.73 54.0984 10.07C54.4184 10.4 54.6584 10.795 54.8184 11.255C54.9784 11.715 55.0484 12.22 55.0284 12.77L55.0134 13.295H48.4884L48.3234 12.35H54.1584L53.8884 12.605V12.245C53.8684 11.885 53.7634 11.54 53.5734 11.21C53.3834 10.87 53.1134 10.595 52.7634 10.385C52.4234 10.175 52.0134 10.07 51.5334 10.07C50.9734 10.07 50.4884 10.185 50.0784 10.415C49.6684 10.635 49.3534 10.965 49.1334 11.405C48.9134 11.845 48.8034 12.39 48.8034 13.04C48.8034 13.66 48.9234 14.2 49.1634 14.66C49.4034 15.11 49.7434 15.46 50.1834 15.71C50.6334 15.96 51.1734 16.085 51.8034 16.085C52.1734 16.085 52.5384 16.025 52.8984 15.905C53.2684 15.775 53.6734 15.525 54.1134 15.155L54.6984 15.965C54.4684 16.195 54.1934 16.4 53.8734 16.58C53.5534 16.75 53.2034 16.89 52.8234 17C52.4434 17.1 52.0534 17.15 51.6534 17.15ZM56.6263 17V9.17H57.7362L57.7813 10.805L57.6013 10.88C57.7013 10.54 57.8963 10.23 58.1863 9.95C58.4763 9.67 58.8213 9.445 59.2213 9.275C59.6313 9.095 60.0513 9.005 60.4813 9.005C61.0613 9.005 61.5463 9.12 61.9363 9.35C62.3263 9.58 62.6213 9.935 62.8213 10.415C63.0213 10.895 63.1213 11.505 63.1213 12.245V17H61.9813V12.305C61.9813 11.785 61.9113 11.36 61.7713 11.03C61.6413 10.69 61.4363 10.44 61.1563 10.28C60.8763 10.12 60.5313 10.045 60.1213 10.055C59.7813 10.055 59.4663 10.115 59.1763 10.235C58.8863 10.345 58.6363 10.5 58.4263 10.7C58.2163 10.9 58.0513 11.13 57.9313 11.39C57.8113 11.65 57.7513 11.93 57.7513 12.23V17H57.1963C57.1263 17 57.0463 17 56.9563 17C56.8663 17 56.7563 17 56.6263 17Z"
                          fill="#4C4343"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="73"
                        height="23"
                        viewBox="0 0 73 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="73" height="23" rx="11.5" fill="#FFC7C7" />
                        <circle cx="16" cy="12" r="5" fill="#E57373" />
                        <path
                          d="M31.895 17.15C31.145 17.15 30.455 17.02 29.825 16.76C29.195 16.49 28.65 16.115 28.19 15.635C27.73 15.145 27.37 14.57 27.11 13.91C26.86 13.25 26.735 12.53 26.735 11.75C26.735 10.98 26.86 10.275 27.11 9.635C27.37 8.985 27.735 8.42 28.205 7.94C28.675 7.45 29.22 7.075 29.84 6.815C30.46 6.555 31.14 6.425 31.88 6.425C32.37 6.425 32.855 6.505 33.335 6.665C33.815 6.815 34.255 7.025 34.655 7.295C35.065 7.565 35.4 7.875 35.66 8.225L34.85 9.065C34.6 8.765 34.31 8.505 33.98 8.285C33.66 8.065 33.32 7.895 32.96 7.775C32.6 7.655 32.24 7.595 31.88 7.595C31.32 7.595 30.795 7.7 30.305 7.91C29.825 8.11 29.41 8.395 29.06 8.765C28.71 9.135 28.435 9.575 28.235 10.085C28.045 10.595 27.95 11.15 27.95 11.75C27.95 12.37 28.045 12.94 28.235 13.46C28.435 13.98 28.715 14.43 29.075 14.81C29.445 15.18 29.875 15.47 30.365 15.68C30.865 15.88 31.42 15.98 32.03 15.98C32.39 15.98 32.75 15.93 33.11 15.83C33.47 15.72 33.8 15.57 34.1 15.38C34.4 15.19 34.655 14.975 34.865 14.735L35.465 15.71C35.235 15.99 34.925 16.24 34.535 16.46C34.155 16.67 33.735 16.84 33.275 16.97C32.815 17.09 32.355 17.15 31.895 17.15ZM37.2617 17V5.9H38.3867V17H37.2617ZM43.9194 17.15C43.1394 17.15 42.4444 16.975 41.8344 16.625C41.2344 16.275 40.7594 15.79 40.4094 15.17C40.0694 14.55 39.8994 13.845 39.8994 13.055C39.8994 12.275 40.0694 11.58 40.4094 10.97C40.7594 10.36 41.2344 9.88 41.8344 9.53C42.4444 9.18 43.1394 9.005 43.9194 9.005C44.6894 9.005 45.3744 9.18 45.9744 9.53C46.5844 9.88 47.0594 10.36 47.3994 10.97C47.7494 11.58 47.9244 12.275 47.9244 13.055C47.9244 13.845 47.7494 14.55 47.3994 15.17C47.0594 15.79 46.5844 16.275 45.9744 16.625C45.3744 16.975 44.6894 17.15 43.9194 17.15ZM43.9194 16.085C44.4694 16.085 44.9594 15.955 45.3894 15.695C45.8194 15.425 46.1544 15.065 46.3944 14.615C46.6344 14.155 46.7544 13.635 46.7544 13.055C46.7544 12.475 46.6344 11.96 46.3944 11.51C46.1544 11.06 45.8194 10.71 45.3894 10.46C44.9594 10.2 44.4694 10.07 43.9194 10.07C43.3694 10.07 42.8744 10.2 42.4344 10.46C42.0044 10.71 41.6644 11.065 41.4144 11.525C41.1744 11.975 41.0594 12.485 41.0694 13.055C41.0594 13.635 41.1744 14.155 41.4144 14.615C41.6644 15.065 42.0044 15.425 42.4344 15.695C42.8744 15.955 43.3694 16.085 43.9194 16.085ZM52.1307 17.15C51.4607 17.15 50.8607 17.025 50.3307 16.775C49.8007 16.525 49.3807 16.195 49.0707 15.785L49.8657 15.095C50.1557 15.445 50.4957 15.71 50.8857 15.89C51.2857 16.07 51.7307 16.16 52.2207 16.16C52.4707 16.16 52.6957 16.135 52.8957 16.085C53.0957 16.025 53.2707 15.94 53.4207 15.83C53.5707 15.72 53.6857 15.59 53.7657 15.44C53.8457 15.29 53.8857 15.125 53.8857 14.945C53.8857 14.615 53.7407 14.34 53.4507 14.12C53.3207 14.03 53.1357 13.94 52.8957 13.85C52.6557 13.75 52.3657 13.655 52.0257 13.565C51.4657 13.405 51.0007 13.245 50.6307 13.085C50.2607 12.915 49.9707 12.72 49.7607 12.5C49.6107 12.32 49.4957 12.125 49.4157 11.915C49.3457 11.705 49.3107 11.475 49.3107 11.225C49.3107 10.905 49.3757 10.61 49.5057 10.34C49.6457 10.07 49.8357 9.835 50.0757 9.635C50.3257 9.425 50.6157 9.27 50.9457 9.17C51.2857 9.06 51.6507 9.005 52.0407 9.005C52.4107 9.005 52.7757 9.055 53.1357 9.155C53.4957 9.255 53.8307 9.4 54.1407 9.59C54.4507 9.78 54.7157 10.005 54.9357 10.265L54.2457 11.015C54.0557 10.815 53.8457 10.635 53.6157 10.475C53.3857 10.315 53.1407 10.19 52.8807 10.1C52.6307 10.01 52.3707 9.965 52.1007 9.965C51.8607 9.965 51.6357 9.995 51.4257 10.055C51.2257 10.115 51.0507 10.2 50.9007 10.31C50.7607 10.41 50.6507 10.535 50.5707 10.685C50.5007 10.835 50.4657 11 50.4657 11.18C50.4657 11.33 50.4957 11.465 50.5557 11.585C50.6157 11.705 50.7007 11.81 50.8107 11.9C50.9507 12.01 51.1457 12.115 51.3957 12.215C51.6557 12.305 51.9757 12.4 52.3557 12.5C52.7957 12.62 53.1657 12.745 53.4657 12.875C53.7757 12.995 54.0307 13.14 54.2307 13.31C54.5007 13.51 54.6907 13.74 54.8007 14C54.9207 14.26 54.9807 14.555 54.9807 14.885C54.9807 15.325 54.8557 15.715 54.6057 16.055C54.3657 16.395 54.0307 16.665 53.6007 16.865C53.1707 17.055 52.6807 17.15 52.1307 17.15ZM60.1934 17.15C59.4134 17.15 58.7184 16.98 58.1084 16.64C57.5084 16.3 57.0384 15.825 56.6984 15.215C56.3584 14.605 56.1884 13.905 56.1884 13.115C56.1884 12.505 56.2834 11.955 56.4734 11.465C56.6634 10.965 56.9284 10.53 57.2684 10.16C57.6184 9.79 58.0334 9.505 58.5134 9.305C58.9934 9.095 59.5134 8.99 60.0734 8.99C60.6034 8.99 61.0834 9.085 61.5134 9.275C61.9534 9.465 62.3284 9.73 62.6384 10.07C62.9584 10.4 63.1984 10.795 63.3584 11.255C63.5184 11.715 63.5884 12.22 63.5684 12.77L63.5534 13.295H57.0284L56.8634 12.35H62.6984L62.4284 12.605V12.245C62.4084 11.885 62.3034 11.54 62.1134 11.21C61.9234 10.87 61.6534 10.595 61.3034 10.385C60.9634 10.175 60.5534 10.07 60.0734 10.07C59.5134 10.07 59.0284 10.185 58.6184 10.415C58.2084 10.635 57.8934 10.965 57.6734 11.405C57.4534 11.845 57.3434 12.39 57.3434 13.04C57.3434 13.66 57.4634 14.2 57.7034 14.66C57.9434 15.11 58.2834 15.46 58.7234 15.71C59.1734 15.96 59.7134 16.085 60.3434 16.085C60.7134 16.085 61.0784 16.025 61.4384 15.905C61.8084 15.775 62.2134 15.525 62.6534 15.155L63.2384 15.965C63.0084 16.195 62.7334 16.4 62.4134 16.58C62.0934 16.75 61.7434 16.89 61.3634 17C60.9834 17.1 60.5934 17.15 60.1934 17.15Z"
                          fill="#4C4343"
                        />
                      </svg>
                    )}
                  </p>
                </div>
                <ImageBanner
                  photos={
                    shopDetail.photos && shopDetail.photos.length != 0
                      ? shopDetail.photos.filter((photo) => photo.is_public)
                      : []
                  }
                  basePath="http://127.0.0.1:3000/"
                />
              </div>
              {/* Right Section: Details */}
              <div className="pr-4">
                <div className="mt-4">
                  <h3 className="text-lg  text-gray-700  ">Details</h3>
                  <p className="text-[14px] font-light break-words whitespace-pre-wrap w-[500px] ">
                    &nbsp;&nbsp;&nbsp;&nbsp;{shopDetail.description}
                  </p>
                </div>
                {/* Business Hours */}
                <div className="mt-4">
                  <h3 className="text-lg  text-gray-700  ">
                    🕒 Business Hours
                  </h3>
                  <ul className="text-gray-600 text-sm">
                  {filteredDates && filteredDates.length > 0 ? (
                  <ul>
                    {filteredDates.map((date, index) => (
                      <li key={index} className="text-[14px] font-light">
                        {`${formatDate(date.start_time)} ${formatTime(
                          date.start_time
                        )} - ${formatTime(date.end_time)}`}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[14px] font-light">Not available</p>
                )}
                  </ul>
                </div>

                {/* Social Media */}
                <div className="mt-4 mb-6">
                  <h3 className="text-lg  text-gray-700">💬Social Media</h3>
                  {Array.isArray(shopDetail?.social_media) &&
                  shopDetail.social_media.filter((media) => media.is_public)
                    .length > 0 ? (
                    <ul>
                      {shopDetail.social_media
                        .filter((media) => media.is_public)
                        .map((media, index) => (
                          <li key={index} className="text-[14px] font-light">
                            {media.platform}:{" "}
                            <a href={media.link}>{media.link}</a>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p className="text-[14px] font-light">Not available</p>
                  )}
                </div>
              </div>
            </div>
            {/* Bottom Block */}
            <div className="bg-white p-6 mt-10 rounded-2xl shadow-lg">
              {" "}
              {/* Adjusted margin-top */}
              {/* Top Left Icon Menu */}
              <p className="text-[18px] font-regular flex items-center mt-2 mb-2">
                <svg
                  width="24"
                  height="16"
                  viewBox="0 0 24 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path
                    d="M0.5 1C0.5 0.767936 0.592187 0.545376 0.756282 0.381282C0.920376 0.217187 1.14294 0.125 1.375 0.125H20.625C20.8571 0.125 21.0796 0.217187 21.2437 0.381282C21.4078 0.545376 21.5 0.767936 21.5 1C21.5 1.23206 21.4078 1.45462 21.2437 1.61872C21.0796 1.78281 20.8571 1.875 20.625 1.875H1.375C1.14294 1.875 0.920376 1.78281 0.756282 1.61872C0.592187 1.45462 0.5 1.23206 0.5 1ZM1.375 8.875H9.25C9.48206 8.875 9.70462 8.78281 9.86872 8.61872C10.0328 8.45463 10.125 8.23206 10.125 8C10.125 7.76794 10.0328 7.54538 9.86872 7.38128C9.70462 7.21719 9.48206 7.125 9.25 7.125H1.375C1.14294 7.125 0.920376 7.21719 0.756282 7.38128C0.592187 7.54538 0.5 7.76794 0.5 8C0.5 8.23206 0.592187 8.45463 0.756282 8.61872C0.920376 8.78281 1.14294 8.875 1.375 8.875ZM11 14.125H1.375C1.14294 14.125 0.920376 14.2172 0.756282 14.3813C0.592187 14.5454 0.5 14.7679 0.5 15C0.5 15.2321 0.592187 15.4546 0.756282 15.6187C0.920376 15.7828 1.14294 15.875 1.375 15.875H11C11.2321 15.875 11.4546 15.7828 11.6187 15.6187C11.7828 15.4546 11.875 15.2321 11.875 15C11.875 14.7679 11.7828 14.5454 11.6187 14.3813C11.4546 14.2172 11.2321 14.125 11 14.125ZM22.9941 15.6191C22.9128 15.7004 22.8163 15.765 22.7101 15.809C22.6038 15.853 22.49 15.8757 22.375 15.8757C22.26 15.8757 22.1462 15.853 22.0399 15.809C21.9337 15.765 21.8372 15.7004 21.7559 15.6191L19.5312 13.3988C18.6265 13.9956 17.5325 14.2355 16.461 14.0717C15.3896 13.908 14.4171 13.3524 13.7319 12.5125C13.0468 11.6727 12.6978 10.6084 12.7525 9.52587C12.8073 8.44338 13.2619 7.41975 14.0283 6.65334C14.7948 5.88692 15.8184 5.43228 16.9009 5.37752C17.9834 5.32275 19.0477 5.67176 19.8875 6.35691C20.7274 7.04207 21.283 8.01458 21.4467 9.08602C21.6105 10.1575 21.3706 11.2515 20.7738 12.1562L22.9941 14.3766C23.0761 14.4579 23.1412 14.5547 23.1856 14.6613C23.23 14.7679 23.2529 14.8823 23.2529 14.9978C23.2529 15.1133 23.23 15.2277 23.1856 15.3343C23.1412 15.4409 23.0761 15.5377 22.9941 15.6191ZM17.125 12.375C17.6442 12.375 18.1517 12.221 18.5834 11.9326C19.0151 11.6442 19.3515 11.2342 19.5502 10.7545C19.7489 10.2749 19.8008 9.74709 19.6996 9.23789C19.5983 8.72869 19.3483 8.26096 18.9812 7.89384C18.614 7.52673 18.1463 7.27672 17.6371 7.17544C17.1279 7.07415 16.6001 7.12614 16.1205 7.32482C15.6408 7.5235 15.2308 7.85995 14.9424 8.29163C14.654 8.72331 14.5 9.23082 14.5 9.75C14.5 10.4462 14.7766 11.1139 15.2688 11.6062C15.7611 12.0984 16.4288 12.375 17.125 12.375Z"
                    fill="#4C4343"
                  />
                </svg>
                Menu
              </p>
              {/* Menu Items */}
              <div className="">
                {shopDetail?.menus?.length ? (
                  <div className="grid grid-cols-2 gap-4">
                    {shopDetail.menus
                      .filter((menu) => menu.is_public)
                      .map((menu) => (
                        <div
                          key={menu.id}
                          className="border border-gray-300 rounded-lg p-2 shadow-md"
                          style={{
                            flexShrink: 0,
                          }}
                        >
                          <CardProductDetail menu={menu} />
                        </div>
                      ))}
                  </div>
                ) : (
                  <p>Not available</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>No shop details found</p>
        )}
        <div></div>
      </div>
      <div className="flex flex-col justify-end mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default ShopPage;

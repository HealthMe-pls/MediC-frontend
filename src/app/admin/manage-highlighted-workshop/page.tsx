"use client";
import { useState, useEffect } from "react";
import {
  fetchWorkshops,
  Workshop,
  createWorkshop,
  deleteWorkshop,
  updateWorkshop,
} from "../../../utility/workshop";
import React from "react";
import AdminLayouts from "@/app/layouts/AdminLayouts";
import Image from "next/image";
import WorkshopForm from "@/app/components/WorkshopForm";
import { deletePhoto, uploadPhotoWorkshops } from "@/utility/photo";
import { PhotoForm } from "@/app/components/types";

const ManageHighlightedWorkshop = () => {
  const [formImg, setFormImg] = useState<{
    cover_id: number;
    cover_img: File | string;
    sec_id: number;
    sec_img: File | string;
    thr_id: number;
    thr_img: File | string;
  }>({
    cover_id: 0,
    cover_img: "",
    sec_id: 0,
    sec_img: "",
    thr_id: 0,
    thr_img: "",
  });
  const [originalFormImg, setOriginalFormImg] = useState<{
    cover_id: number;
    cover_img: File | string;
    sec_id: number;
    sec_img: File | string;
    thr_id: number;
    thr_img: File | string;
  }>({
    cover_id: 0,
    cover_img: "",
    sec_id: 0,
    sec_img: "",
    thr_id: 0,
    thr_img: "",
  });

  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    date: string;
    start_time: string;
    end_time: string;
    price: number;
    language: string;
    instructor: string;
  }>({
    name: "",
    description: "",
    date: "",
    start_time: "",
    end_time: "",
    price: 0,
    language: "",
    instructor: "",
  });
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const formatDate = (dateTime: string) => dateTime.split("T")[0];
  const formatTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [currentWorkshopId, setCurrentWorkshopId] = useState<number | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  // ฟังก์ชันกรอง Workshop ตามชื่อ
  const filteredWorkshops = workshops.filter((workshop) =>
    workshop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  useEffect(() => {
    loadWorkshops();
  }, []);

  const loadWorkshops = async () => {
    try {
      const data = await fetchWorkshops();
      setWorkshops(data || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id: number) => {
    setDeleteTargetId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (deleteTargetId !== null) {
      try {
        await deleteWorkshop(deleteTargetId);
        setWorkshops(
          workshops.filter((workshop) => workshop.id !== deleteTargetId)
        );
        setIsDeleteModalOpen(false);
        setDeleteTargetId(null);
      } catch (error) {
        console.error(
          `Error deleting workshop with id ${deleteTargetId}:`,
          error
        );
      }
    }
  };

  const openModal = (workshop?: Workshop) => {
    if (workshop) {
      const photos = Array.isArray(workshop.photos) ? workshop.photos : []; // Ensure it's an array

      const newFormImg = {
        cover_id: photos[0]?.photo_id || 0,
        cover_img: photos[0]
          ? `${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${photos[0].pathfile}`
          : "",
        sec_id: photos[1]?.photo_id || 0,
        sec_img: photos[1]
          ? `${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${photos[1].pathfile}`
          : "",
        thr_id: photos[2]?.photo_id || 0,
        thr_img: photos[2]
          ? `${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${photos[2].pathfile}`
          : "",
      };

      setFormImg(newFormImg);
      setOriginalFormImg(newFormImg); // Save original values
      setFormData({
        name: workshop.name,
        description: workshop.description,
        date: formatDate(workshop.date),
        start_time: formatTime(workshop.start_time),
        end_time: formatTime(workshop.end_time),
        price: workshop.price,
        language: workshop.language,
        instructor: workshop.instructor,
      });

      setCurrentWorkshopId(workshop.id);
      setEditMode(true);
    } else {
      setFormData({
        name: "",
        description: "",
        date: "",
        start_time: "",
        end_time: "",
        price: 0,
        language: "",
        instructor: "",
      });
      setFormImg({
        cover_id: 0,
        cover_img: "",
        sec_id: 0,
        sec_img: "",
        thr_id: 0,
        thr_img: "",
      });
      setOriginalFormImg({
        cover_id: 0,
        cover_img: "",
        sec_id: 0,
        sec_img: "",
        thr_id: 0,
        thr_img: "",
      });
      setCurrentWorkshopId(null);
      setEditMode(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(formData);

    if (
      !formData.name ||
      !formData.date ||
      !formData.start_time ||
      !formData.end_time
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const formattedData = {
      name: formData.name,
      description: formData.description,
      date: `${formData.date}T00:00:00+07:00`,
      start_time: `${formData.date}T${formData.start_time}:00+07:00`,
      end_time: `${formData.date}T${formData.end_time}:00+07:00`,
      price: formData.price,
      language: formData.language,
      instructor: formData.instructor,
    };

    try {
      if (editMode && currentWorkshopId !== null) {
        await updateWorkshop(currentWorkshopId, formattedData);
        handlePhotoUpdate(currentWorkshopId, formImg);
      } else {
        const response = await createWorkshop(formattedData);
        // console.log(response);
        if (response.id) {
          if (formImg.cover_img instanceof File)
            await uploadPhotoWorkshops(formImg.cover_img, response.id);
          if (formImg.sec_img instanceof File)
            await uploadPhotoWorkshops(formImg.sec_img, response.id);
          if (formImg.thr_img instanceof File)
            await uploadPhotoWorkshops(formImg.thr_img, response.id);
        }
      }
      closeModal();
      loadWorkshops();
    } catch (error) {
      console.error("Error saving workshop:", error);
    }
  };

  const handlePhotoUpdate = async (id: number, photoData: PhotoForm) => {
    if (originalFormImg) {
      if (originalFormImg?.cover_img === "") {
        if (photoData.cover_img instanceof File)
          await uploadPhotoWorkshops(photoData.cover_img, id);
      } else {
        if (photoData.cover_img instanceof File) {
          // console.log(originalFormImg.cover_id);
          await deletePhoto(originalFormImg.cover_id);
          await uploadPhotoWorkshops(photoData.cover_img, id);
        }
        if (photoData.cover_img === "") {
          // console.log(originalFormImg.cover_id);
          await deletePhoto(originalFormImg.cover_id);
        }
      }
      if (originalFormImg?.sec_img === "") {
        if (photoData.sec_img instanceof File)
          await uploadPhotoWorkshops(photoData.sec_img, id);
      } else {
        if (photoData.sec_img instanceof File) {
          // console.log(originalFormImg.sec_id);
          await deletePhoto(originalFormImg.sec_id);
          await uploadPhotoWorkshops(photoData.sec_img, id);
        }
        if (photoData.sec_img === "") {
          // console.log(originalFormImg.sec_id);
          await deletePhoto(originalFormImg.sec_id);
        }
      }
      if (originalFormImg?.thr_img === "") {
        if (photoData.thr_img instanceof File)
          await uploadPhotoWorkshops(photoData.thr_img, id);
      } else {
        if (photoData.thr_img instanceof File) {
          // console.log(originalFormImg.thr_id);
          await deletePhoto(originalFormImg.thr_id);
          await uploadPhotoWorkshops(photoData.thr_img, id);
        }
        if (photoData.thr_img === "") {
          // console.log(originalFormImg.thr_id);
          await deletePhoto(originalFormImg.thr_id);
        }
      }
    }
    loadWorkshops();
  };

  const [sortMethod, setSortMethod] = useState("");
  const sortedWorkshops = [...filteredWorkshops].sort((a, b) => {
    if (sortMethod === "name_desc") {
      return b.name.localeCompare(a.name); // Descending (Z → A)
    } else if (sortMethod === "name_asc") {
      return a.name.localeCompare(b.name); // Ascending (A → Z)
    } else if (sortMethod === "new_to_old") {
      return b.id - a.id; // Newest to Oldest
    } else if (sortMethod === "old_to_new") {
      return a.id - b.id; // Oldest to Newest
    }
    return 0; // Default (no sorting)
  });

  return (
    <div className="h-screen flex flex-col">
      <AdminLayouts currentPage="Manage Highlighted Workshop & Event">
        <section className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="">
              Sort by :
              <select
                value={sortMethod}
                onChange={(e) => setSortMethod(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg ml-2 mr-4"
              >
                <option value="">Sort by...</option>
                <option value="name_asc">Name (A → Z)</option>
                <option value="name_desc">Name (Z → A)</option>
                <option value="new_to_old">Newest to Oldest</option>
                <option value="old_to_new">Oldest to Newest</option>
              </select>
              <input
                type="text"
                placeholder="Search..."
                className=" border border-gray-300 rounded-lg px-4 py-2 pr-96"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => openModal()}
              className="bg-blue-200 hover:bg-blue-300 text-black py-2 px-4 rounded-3xl transition duration-200"
            >
              + Add New Workshop or Event
            </button>
          </div>

          <div className="flex justify-center ml-8 overflow-hidden">
            <div className="flex flex-wrap gap-4 justify-center p-5">
              {loading ? (
                <p className="text-center text-gray-500">
                  Loading workshops...
                </p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : filteredWorkshops.length === 0 ? (
                <div className="flex justify-center h-screen bg-[#FFF7EB]">
                  <div className="mt-7 text-center text-gray-500">
                    <p>No workshops available at the moment.</p>
                    <p>Please check back later!</p>
                  </div>
                </div>
              ) : (
                sortedWorkshops.map((workshop) => (
                  <div
                    key={workshop.id}
                    className="border border-gray-300 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition w-[250px]"
                  >
                    <div className="w-[215px] h-[200px] overflow-hidden rounded-[10px] mb-3 bg-gray-300 flex items-center justify-center">
                      {workshop.photos?.length > 0 ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${workshop.photos[0].pathfile}`}
                          alt="workshop image"
                          width={300}
                          height={300}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span className="text-gray-500">No Image</span>
                      )}
                    </div>

                    <h3 className="font-semibold mb-2">{workshop.name}</h3>
                    <div className="flex justify-between">
                      <button
                        onClick={() => openModal(workshop)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => confirmDelete(workshop.id)}
                        className="text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <WorkshopForm
            isModalOpen={isModalOpen}
            editMode={editMode}
            formImg={formImg}
            formData={formData}
            setFormData={setFormData}
            handleImageChange={handleImageChange}
            handleRemoveImage={handleRemoveImage}
            handleSubmit={handleSubmit}
            closeModal={() => setIsModalOpen(false)}
          />
        </section>
      </AdminLayouts>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this workshop?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageHighlightedWorkshop;

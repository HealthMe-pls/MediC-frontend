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

const ManageHighlightedWorkshop = () => {
  const [formImg, setFormImg] = useState<{
    cover_img: File | string;
    sec_img: File | string;
    thr_img: File | string;
  }>({
    cover_img: "",
    sec_img: "",
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
      setFormImg({
        cover_img: workshop.photos[0]
          ? `${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${workshop.photos[0]?.pathfile}`
          : "",
        sec_img: workshop.photos[1]
          ? `${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${workshop.photos[1]?.pathfile}`
          : "",
        thr_img: workshop.photos[2]
          ? `${process.env.NEXT_PUBLIC_GO_API_URL}/upload/${workshop.photos[2]?.pathfile}`
          : "",
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
        cover_img: "",
        sec_img: "",
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
    console.log(formData);

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
      } else {
        await createWorkshop(formattedData);
      }
      closeModal();
      loadWorkshops();
    } catch (error) {
      console.error("Error saving workshop:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <AdminLayouts currentPage="Manage Highlighted Workshop & Event">
        <section className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => openModal()}
              className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition duration-200"
            >
              Add
            </button>
          </div>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex justify-center ml-8 overflow-hidden">
            <div className="flex flex-wrap gap-4 justify-start p-5">
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
                filteredWorkshops.map((workshop) => (
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[full] ml-[234px] relative max-h-[650px] overflow-y-auto scrollbar-hide">
            <h2 className="text-[20px] font-bold mb-4">
              {editMode
                ? "Edit Highlighted Workshop or Event"
                : "Add Highlighted Workshop or Event"}
            </h2>
            <div className="flex flex-row items-center">
              <p className="text-[18px] mr-2">Upload Image</p>
              <p className="text-gray-400 mr-2">
                ** The first uploaded image will be used as the cover. **
              </p>
            </div>
            <form>
              <div className="mb-4">
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {(["cover_img", "sec_img", "thr_img"] as const).map((key) => (
                    <div
                      key={key}
                      className="relative border p-2 rounded-lg flex flex-col items-center"
                    >
                      <div
                        className="relative w-[200px] h-[150px] border rounded flex items-center justify-center overflow-hidden cursor-pointer"
                        onClick={() => document.getElementById(key)?.click()}
                      >
                        {formImg[key] && formImg[key] !== "" ? (
                          <div className="relative w-full h-full group">
                            {/* รูปภาพ */}
                            <Image
                              src={
                                formImg[key] instanceof File
                                  ? URL.createObjectURL(formImg[key] as File)
                                  : formImg[key]
                              }
                              alt="Preview"
                              className="w-full h-full object-cover"
                              width={300} // ต้องกำหนดขนาด ถ้าใช้ next/image
                              height={200}
                              onError={(
                                e: React.SyntheticEvent<HTMLImageElement, Event>
                              ) => {
                                const target =
                                  e.currentTarget as HTMLImageElement;
                                target.onerror = null; // ป้องกัน loop error
                              }}
                            />
                            {/* Overlay เมื่อ hover */}
                            <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                              <span className="text-white">Upload</span>
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="bg-gray-200 text-gray-600 p-2 rounded"
                          >
                            Upload
                          </button>
                        )}
                      </div>
                      <input
                        id={key}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            handleImageChange(e, key);
                          }
                        }}
                        className="hidden"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <input
                type="text"
                placeholder="Name"
                className="w-full mb-2 border rounded p-2"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <textarea
                placeholder="Description"
                className="w-full mb-2 border rounded p-2 resize-y overflow-auto"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                onInput={(e) => {
                  e.currentTarget.style.height = "auto"; // รีเซ็ตความสูงก่อน
                  e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // ปรับตามเนื้อหา
                }}
              />

              <input
                type="date"
                className="w-full mb-2 border rounded p-2"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
              <div className="flex gap-2">
                <input
                  type="time"
                  className="w-1/2 border rounded p-2"
                  value={formData.start_time} // ค่านี้จะต้องอยู่ในรูปแบบ 24 ชม.
                  onChange={(e) =>
                    setFormData({ ...formData, start_time: e.target.value })
                  }
                  lang="en-GB"
                />
                <input
                  type="time"
                  className="w-1/2 border rounded p-2"
                  value={formData.end_time}
                  onChange={(e) =>
                    setFormData({ ...formData, end_time: e.target.value })
                  }
                  lang="en-GB"
                />
              </div>
              <input
                type="number"
                placeholder="Price"
                className="w-full mb-2 border rounded p-2"
                value={formData.price}
                onChange={
                  (e) =>
                    setFormData({ ...formData, price: Number(e.target.value) }) // แปลงเป็น number
                }
              />

              <input
                type="text"
                placeholder="Language"
                className="w-full mb-2 border rounded p-2"
                value={formData.language}
                onChange={(e) =>
                  setFormData({ ...formData, language: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Instructor"
                className="w-full mb-2 border rounded p-2"
                value={formData.instructor}
                onChange={(e) =>
                  setFormData({ ...formData, instructor: e.target.value })
                }
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {editMode ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageHighlightedWorkshop;

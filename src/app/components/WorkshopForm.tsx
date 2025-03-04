import React from "react";
import ImageUpload from "./ImageUpload";

interface WorkshopFormProps {
  isModalOpen: boolean;
  editMode: boolean;
  formImg: {
    cover_img: File | string;
    sec_img: File | string;
    thr_img: File | string;
  };
  formData: {
    name: string;
    description: string;
    date: string;
    start_time: string;
    end_time: string;
    price: number;
    language: string;
    instructor: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      date: string;
      start_time: string;
      end_time: string;
      price: number;
      language: string;
      instructor: string;
    }>
  >;
  handleImageChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "cover_img" | "sec_img" | "thr_img"
  ) => void;
  handleRemoveImage: (key: "cover_img" | "sec_img" | "thr_img") => void;
  handleSubmit: (e: React.FormEvent) => void;
  closeModal: () => void;
}

const WorkshopForm: React.FC<WorkshopFormProps> = ({
  isModalOpen,
  editMode,
  formImg,
  formData,
  setFormData,
  handleImageChange,
  handleRemoveImage,
  handleSubmit,
  closeModal,
}) => {
  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal} // Close modal when clicking outside
    >
      <div
        className="bg-white py-10 px-24 rounded-3xl shadow-lg  overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="flex justify-between mb-4">
          <h2 className="text-[30px] font-bold ">
            {editMode
              ? "Edit Highlighted Workshop or Event"
              : "Add Highlighted Workshop or Event"}
          </h2>
          <button
            type="button"
            onClick={closeModal}
            className="p-2"
          >
            ✖
          </button>
        </div>
        <p>Upload Image :</p>

        <form onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className="mb-4 ml-4">
            <ImageUpload
              formImg={formImg}
              handleImageChange={handleImageChange}
              handleRemoveImage={handleRemoveImage}
            />
          </div>

          {/* Name */}
          <div className="flex items-center">
            <p>Name : </p>
            <input
              type="text"
              placeholder="Name"
              className="ml-14 mb-2 border rounded-3xl py-2 px-3 pr-64"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className="flex">
            <p>Description : </p>
            <textarea
              placeholder="Description"
              className="ml-4 mb-2 border rounded-3xl py-2 px-3 pr-64 resize-y overflow-auto min-h-[50px] scrollbar-hide"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              onInput={(e) => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
            />
          </div>

          {/* Date */}
          <div className="flex items-center">
            <p>Date : </p>
            <input
              type="date"
              className="ml-16 mb-2 border rounded-3xl py-2 px-3"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          {/* Time */}
          <div className="flex items-center mb-2">
          <p>Time : </p>
            <div className="flex gap-2">
              <input
                type="time"
                className="ml-16 border rounded-3xl py-2 px-3"
                value={formData.start_time}
                onChange={(e) =>
                  setFormData({ ...formData, start_time: e.target.value })
                }
              />
              <p className="flex items-center">To </p>
              <input
                type="time"
                className="ml-2 border rounded-3xl py-2 px-3"
                value={formData.end_time}
                onChange={(e) =>
                  setFormData({ ...formData, end_time: e.target.value })
                }
              />
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center">
            <p>Price : </p>
            <input
              type="number"
              placeholder="Price"
              className="ml-16 mx-2 mb-2 border rounded-3xl py-2 px-3"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
            />
            <p>Bath </p>
          </div>

          {/* Language */}
          <div className="flex items-center">
            <p>Language : </p>
            <input
              type="text"
              placeholder="Language"
              className="ml-6 mb-2 border rounded-3xl py-2 px-3"
              value={formData.language}
              onChange={(e) =>
                setFormData({ ...formData, language: e.target.value })
              }
            />
          </div>

          {/* Instructor */}
          <div className="flex items-center">
            <p>Instructor : </p>
            <input
              type="text"
              placeholder="Instructor"
              className="ml-6 mb-2 border rounded-3xl py-2 px-3"
              value={formData.instructor}
              onChange={(e) =>
                setFormData({ ...formData, instructor: e.target.value })
              }
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-2 mt-8">
            
            <button
              type="submit"
              className="px-4 py-2 bg-blue-200 text-blacke rounded-full"
            >
              {editMode ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkshopForm;

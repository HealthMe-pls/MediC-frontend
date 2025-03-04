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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] max-w-[900px] ml-[234px] relative max-h-[650px] overflow-y-auto scrollbar-hide">
        <h2 className="text-[20px] font-bold mb-4">
          {editMode
            ? "Edit Highlighted Workshop or Event"
            : "Add Highlighted Workshop or Event"}
        </h2>

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
          <input
            type="text"
            placeholder="Name"
            className="w-full mb-2 border rounded p-2"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            className="w-full mb-2 border rounded p-2 resize-y overflow-auto"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            onInput={(e) => {
              e.currentTarget.style.height = "auto";
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
          />

          {/* Date */}
          <input
            type="date"
            className="w-full mb-2 border rounded p-2"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />

          {/* Time */}
          <div className="flex gap-2">
            <input
              type="time"
              className="w-1/2 border rounded p-2"
              value={formData.start_time}
              onChange={(e) =>
                setFormData({ ...formData, start_time: e.target.value })
              }
            />
            <input
              type="time"
              className="w-1/2 border rounded p-2"
              value={formData.end_time}
              onChange={(e) =>
                setFormData({ ...formData, end_time: e.target.value })
              }
            />
          </div>

          {/* Price */}
          <input
            type="number"
            placeholder="Price"
            className="w-full mb-2 border rounded p-2"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
          />

          {/* Language */}
          <input
            type="text"
            placeholder="Language"
            className="w-full mb-2 border rounded p-2"
            value={formData.language}
            onChange={(e) =>
              setFormData({ ...formData, language: e.target.value })
            }
          />

          {/* Instructor */}
          <input
            type="text"
            placeholder="Instructor"
            className="w-full mb-2 border rounded p-2"
            value={formData.instructor}
            onChange={(e) =>
              setFormData({ ...formData, instructor: e.target.value })
            }
          />

          {/* Buttons */}
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
              className="px-4 py-2 bg-blue-600 text-white rounded"
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

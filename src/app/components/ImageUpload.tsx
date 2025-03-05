import React from "react";
import Image from "next/image";

interface ImageUploadProps {
  formImg: {
    cover_img: File | string;
    sec_img: File | string;
    thr_img: File | string;
  };
  handleImageChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "cover_img" | "sec_img" | "thr_img"
  ) => void;
  handleRemoveImage: (key: "cover_img" | "sec_img" | "thr_img") => void;
  disabled: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  formImg,
  handleImageChange,
  handleRemoveImage,
  disabled = false,
}) => {
  const imageKeys: ("cover_img" | "sec_img" | "thr_img")[] = [
    "cover_img",
    "sec_img",
    "thr_img",
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mt-2">
      {imageKeys.map((key, index) => (
        <div key={key} className="flex flex-col items-center">
          <div className="relative flex items-center">
            {/* วงกลมเลข 1, 2, 3 - มีระยะห่างจากรูป */}
            <span className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 bg-gray-300 text-gray-700 w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold">
              {index + 1}
            </span>

            <div
              className={`relative w-[200px] h-[150px] flex items-center justify-center overflow-hidden cursor-pointer ${
                formImg[key]
                  ? ""
                  : "border-2 border-dashed border-gray-400 rounded-[30px]"
              } ml-2`}
              onClick={() => document.getElementById(key)?.click()}
            >
              {formImg[key] && formImg[key] !== "" ? (
                <div className="relative w-full h-full group">
                  <Image
                    src={
                      formImg[key] instanceof File
                        ? URL.createObjectURL(formImg[key] as File)
                        : formImg[key]
                    }
                    alt="Preview"
                    className="w-full h-full object-cover rounded-[30px]"
                    width={300}
                    height={200}
                  />
                  <div className="rounded-[30px] absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-white">Upload</span>
                  </div>
                </div>
              ) : (
                <div>
                  {disabled ? (
                    <p className="text-gray-400 italic">No Image</p>
                  ) : (
                    <button
                      type="button"
                      className="bg-gray-200 text-gray-600 p-2 rounded"
                    >
                      Upload
                    </button>
                  )}
                </div>
              )}
            </div>
            <input
              id={key}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, key)}
              className="hidden"
              disabled={disabled}
            />
          </div>
          {formImg[key] && formImg[key] !== "" && (
            <button
              type="button"
              onClick={() => handleRemoveImage(key)}
              disabled={disabled}
              className="mt-2 bg-white border border-red-500 text-red-500 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white transition"
            >
              Remove Image
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageUpload;

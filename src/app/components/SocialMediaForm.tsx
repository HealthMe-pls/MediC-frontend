import React from "react";
import { SocialFormData } from "./types";

interface SocialMediaFormProps {
  socialFormData: SocialFormData[];
  onAddSocial: () => void;
  onSocialChange: (
    index: number,
    field: keyof SocialFormData,
    value: string
  ) => void;
  onRemoveSocial: (index: number) => void;
}

const SocialMediaForm: React.FC<SocialMediaFormProps> = ({
  socialFormData,
  onAddSocial,
  onSocialChange,
  onRemoveSocial,
}) => {
  return (
    <div>
      <div className="flex flex-row items-center mt-2 mb-4">
        <p className="mr-3">Social Media:</p>
        <button
          type="button"
          onClick={onAddSocial}
          className="bg-green-200 w-[50px] h-[30px] rounded ml-4"
        >
          Add
        </button>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Platform</th>
            <th className="p-2 border">Account Name</th>
            <th className="p-2 border">Link</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {socialFormData.map((social, index) => (
            <tr key={social.id}>
              <td className="p-2 border">
                <input
                  type="text"
                  value={social.platform}
                  onChange={(e) =>
                    onSocialChange(index, "platform", e.target.value)
                  }
                  className="border p-1 w-full"
                  placeholder="Platform"
                />
              </td>
              <td className="p-2 border">
                <input
                  type="text"
                  value={social.name}
                  onChange={(e) =>
                    onSocialChange(index, "name", e.target.value)
                  }
                  className="border p-1 w-full"
                  placeholder="Account Name"
                />
              </td>
              <td className="p-2 border">
                <input
                  type="text"
                  value={social.link}
                  onChange={(e) =>
                    onSocialChange(index, "link", e.target.value)
                  }
                  className="border p-1 w-full"
                  placeholder="Link"
                />
              </td>
              <td className="p-2 border text-center">
                <button
                  type="button"
                  onClick={() => onRemoveSocial(index)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SocialMediaForm;

"use client";

import { useState } from "react";
import { Mail, createMail } from "../../../utility/contactToAdmin";
import { Dialog } from "@headlessui/react";

export default function ManageVendor() {
  const [formData, setFormData] = useState({
    from_username: "",
    problem: "",
    detail: "",
    contact_to_en: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      console.log("Sending form data:", formData);
      const newMail = await createMail(formData);
      setSuccessMessage("Mail successfully sent!");
      console.log("Mail sent: ", newMail);
      setFormData({
        from_username: "",
        problem: "",
        detail: "",
        contact_to_en: "",
      });
      setAcceptedTerms(false);
    } catch (error) {
      console.error("Failed to send mail", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Form</h1>
      <form
        onSubmit={handleSend}
        className="space-y-4 bg-white p-6 rounded-2xl shadow-lg"
      >
        <div>
          <label className="block font-medium mb-1">Contacted from</label>
          <input
            type="text"
            name="from_username"
            value={formData.from_username}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username or store name"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Subject</label>
          <input
            type="text"
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., forgot password, cannot log in, etc."
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Details</label>
          <textarea
            name="detail"
            value={formData.detail}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            placeholder="Enter the details of your problem here..."
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Contact at</label>
          <input
            type="text"
            name="contact_to_en"
            value={formData.contact_to_en}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your contact information, e.g., LINE ID, phone number, etc."
            required
          />
        </div>

        {/* Terms of Service Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
            required
          />
          <span className="text-sm">
            I agree to the{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => setIsModalOpen(true)}
            >
              Terms of Service
            </button>
          </span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !acceptedTerms}
          className={`w-full p-2 rounded-xl transition ${
            isSubmitting || !acceptedTerms
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>

        {successMessage && (
          <p className="text-green-600 font-medium text-center mt-2">
            {successMessage}
          </p>
        )}
      </form>

      {/* Modal for Terms of Service */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <Dialog.Title className="text-xl font-bold mb-4">
              Terms of Service
            </Dialog.Title>
            <Dialog.Description className="text-gray-600">
              By using this service, you agree to abide by all applicable laws
              and regulations. Your information will be kept confidential and
              will not be shared without consent.
            </Dialog.Description>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

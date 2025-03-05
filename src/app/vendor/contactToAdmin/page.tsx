"use client";

import { useState } from "react";
// import { createMail } from "../../../utility/contactToAdmin";
import { Dialog } from "@headlessui/react";
import Logo from "../../../../public/assets/logo.png";
import Image from "next/image";

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
      // console.log("Sending form data:", formData);
      // const newMail = await createMail(formData);
      setSuccessMessage("Mail successfully sent!");
      // console.log("Mail sent: ", newMail);
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
    <div className="h-screen flex flex-col items-center justify-center p-4 text-[#4C4343] text-lexend">
      <div className="flex justify-center items-center  mb-10">
        <Image src={Logo} alt="Logo" width={200} height={200} />
      </div>
      <h1 className="text-6xl  font-bold mb-4">Contact Form</h1>
      <form
        onSubmit={handleSend}
        className="space-y-4 bg-white py-4 px-4 rounded-2xl"
      >
        <div className="m-2 flex items-center gap-6">
          <label className="block font-medium mb-1 text-2xl">
            Contacted from :{" "}
          </label>
          <input
            type="text"
            name="from_username"
            value={formData.from_username}
            onChange={handleChange}
            className="w-[600px] px-4 py-2 bg-gray-100 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username or store name"
            required
          />
        </div>

        <div className="m-2 flex items-center gap-28">
          <label className="block font-medium mb-1 text-2xl">Subject : </label>
          <input
            type="text"
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            className="w-[600px] px-4 py-2 bg-gray-100 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., forgot password, cannot log in, etc."
            required
          />
        </div>

        <div className="m-2 flex gap-28">
          <label className="block font-medium mb-1 text-2xl">Details : </label>
          <textarea
            name="detail"
            value={formData.detail}
            onChange={handleChange}
            className="w-[600px] px-4 py-2 border rounded-3xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[160px] scrollbar-hide"
            placeholder="Enter the details of your problem here..."
            rows={4}
            required
          />
        </div>

        <div className="m-2 flex items-center gap-20">
          <label className="block font-medium mb-1 text-2xl">
            Contact at :{" "}
          </label>
          <input
            type="text"
            name="contact_to_en"
            value={formData.contact_to_en}
            onChange={handleChange}
            className="w-[600px] px-4 py-2 border rounded-2xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your contact information, e.g., LINE ID, phone number, etc."
            required
          />
        </div>

        {/* Terms of Service Checkbox */}
        <div className="flex items-center space-x-2 ml-56">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="w-5 h-5 border-2 border-gray-300 rounded-sm bg-white accent-[#4C4343]"
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
        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={isSubmitting || !acceptedTerms}
            className={`py-2 px-6 rounded-2xl transition  ${
              isSubmitting || !acceptedTerms
                ? "bg-gray-200"
                : "bg-[#4C4343] text-white"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
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
          <Dialog.Panel className="w-full max-w-5xl max-h-[80vh] rounded-2xl bg-white p-8 shadow-lg overflow-y-auto scrollbar-hide">
            <Dialog.Title className="text-2xl font-bold text-center mb-6">
              Terms of Service
            </Dialog.Title>
            <Dialog.Description className="text-gray-700 text-lg leading-relaxed space-y-6">
              <div>
                <h2 className="font-semibold text-xl">
                  1. Temporary Collection of Personal Data
                </h2>
                <p>
                  This website may temporarily collect users&#39; personal data,
                  such as usernames, email addresses, phone numbers, LINE IDs,
                  or other necessary contact information to provide services.
                  This data will be stored only for the required period and
                  securely deleted when no longer necessary.
                </p>
                <ul className="list-inside pl-4 space-y-1 text-gray-600">
                  <li>
                    Use of Data: The collected data will be used solely for the
                    purpose of providing services and will not be disclosed to
                    third parties without user consent.
                  </li>
                  <li>
                    Access to Data by Administrators: User data may be accessed
                    by administrators (Admin) for account management, system
                    maintenance, and technical support purposes. Administrators
                    are responsible for ensuring the security and
                    confidentiality of the data.
                  </li>
                  <li>
                    Retention Period: Data will be automatically deleted within
                    a specified period after the relevant process has been
                    completed.
                  </li>
                  <li>
                    Security Measures: The website implements appropriate
                    security measures, such as encryption, access control, and
                    secure data storage systems.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-semibold text-xl">
                  2. Limitation of Liability
                </h2>
                <p>
                  Although the website applies industry-standard security
                  measures, users acknowledge that:
                </p>
                <ul className="list-inside pl-4 space-y-1 text-gray-600">
                  <li>
                    Internet Usage Risks: Transmitting data over the internet
                    inherently carries risks, and 100% security cannot be
                    guaranteed.
                  </li>
                  <li>
                    Force Majeure: The website shall not be liable for damages
                    resulting from events beyond its control, such as
                    cyberattacks, natural disasters, or issues caused by network
                    service providers.
                  </li>
                  <li>
                    Exclusion of Liability for Gross Negligence: The website
                    shall not be held liable for damages except in cases of
                    gross negligence by the service provider.&#39;
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-semibold text-xl">3. User Rights</h2>
                <p>Users have the following rights:</p>
                <ul className="list-inside pl-4 space-y-1 text-gray-600">
                  <li>
                    Right to Access: Users may request access to their personal
                    data stored on the website, such as phone numbers or LINE
                    IDs.
                  </li>
                  <li>
                    Right to Deletion: Users may request the deletion of their
                    data when it is no longer necessary.
                  </li>
                  <li>
                    Right to Correction: Users may request modifications to
                    their data to ensure accuracy and currency.
                  </li>
                </ul>
                <p>
                  For any inquiries or requests regarding personal data, users
                  may contact the system administrator through the designated
                  channels.
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-xl">4. Policy Updates</h2>
                <p>
                  The website reserves the right to update or modify the Terms &
                  Conditions and Privacy Policy as necessary and will notify
                  users through appropriate channels, such as the website.
                </p>
              </div>

              <div>
                <h2 className="font-semibold text-xl">5. Consent</h2>
                <p>By using this website, users:</p>
                <ul className="list-inside pl-4 space-y-1 text-gray-600">
                  <li>
                    Consent to the collection and use of personal data, such as
                    phone numbers and LINE IDs, as outlined in this policy.
                  </li>
                  <li>
                    Understand and accept all terms, limitations of liability,
                    and conditions specified in this document.
                  </li>
                </ul>
              </div>
            </Dialog.Description>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-[$4C4343] rounded-2xl hover:bg-gray-300 transition"
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

"use client";

import { useState, useEffect } from "react";
import {
  fetchEntrepreneur,
  fetchShopEntById,
  createEntrepreneur,
  editEntrepreneur,
  deleteEntrepreneur,
  Entrepreneur,
} from "../../../utility/entrepreneur";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import AdminLayouts from "@/app/layouts/AdminLayouts";

export default function ManageVendor() {
  const [entrepreneurs, setEntrepreneurs] = useState<Entrepreneur[]>([]);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [shopCounts, setShopCounts] = useState<Record<string, number>>({});
  const [editingUser, setEditingUser] = useState<Entrepreneur | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{ id: number; username: string } | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [visibleModalPassword, setVisibleModalPassword] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadEntrepreneurs();
  }, []);

  const loadEntrepreneurs = async () => {
    try {
      const data = await fetchEntrepreneur();
      setEntrepreneurs(data);
      data.forEach((ent) => {
        fetchShopEntById(ent.id).then((shopData) => {
          setShopCounts((prev) => ({ ...prev, [ent.id]: shopData.length }));
        });
      });
    } catch (error) {
      console.error("Error fetching entrepreneurs:", error);
    }
  };

  const togglePasswordVisibility = (username: string) => {
    setVisiblePasswords((prev) => ({ ...prev, [username]: !prev[username] }));
  };

  const openModal = (ent?: Entrepreneur) => {
    setEditingUser(ent || { id: 0, username: "", password: "" });
    setIsCreating(!ent);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setVisibleModalPassword(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      try {
        if (isCreating) {
          await createEntrepreneur({
            username: editingUser.username,
            password: editingUser.password,
          });
        } else {
          await editEntrepreneur(editingUser.id, editingUser);
        }
        loadEntrepreneurs();
        closeModal();
      } catch (error) {
        console.error("Error saving entrepreneur:", error);
      }
    }
  };

  const confirmDelete = (id: number, username: string) => {
    setShowDeleteConfirm({ id, username });
  };

  const handleDelete = async () => {
    if (showDeleteConfirm) {
      try {
        await deleteEntrepreneur(showDeleteConfirm.id);
        loadEntrepreneurs();
        setShowDeleteConfirm(null);
      } catch (error) {
        console.error("Error deleting entrepreneur:", error);
      }
    }
  };

  const toggleModalPasswordVisibility = () => {
    setVisibleModalPassword((prev) => !prev);
  };

  // ** Pagination Logic **
  const totalPages = Math.ceil(entrepreneurs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = entrepreneurs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <AdminLayouts currentPage="Manage Vendor">
      <div className="p-4 text-[#4C4343]">
        {/*Add Vendor*/}
        <div className="flex justify-end">
          <button onClick={() => openModal()} className="bg-blue-100 text-[#4C4343] py-2 px-4 rounded-2xl mb-4">
            + Add Vendor
          </button>
        </div>

        {/*Table*/}
        <table className="w-full border-collapse border-gray-300">
          <thead>
            <tr className="border-b">
              <th className="p-4">Vendor Name</th>
              <th className="p-4">Username</th>
              <th className="p-4">Password</th>
              <th className="p-4"># Shops Owned</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((ent) => (
              <tr key={ent.id} className="text-center">
                <td className="p-4">{ent.username}</td>
                <td className="p-4">{ent.username}</td>
                <td className="p-4 flex items-center justify-center">
                  {visiblePasswords[ent.username] ? ent.password : "••••••"}
                  <button onClick={() => togglePasswordVisibility(ent.username)} className="ml-2">
                    {visiblePasswords[ent.username] ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </td>
                <td className="p-4">{shopCounts[ent.id] ?? "Loading..."}</td>
                <td className="">
                  <button onClick={() => openModal(ent)} className="bg-gray-300 text-[#4C4343] px-7 py-1 rounded-2xl mx-1">
                    Edit
                  </button>
                  <button onClick={() => confirmDelete(ent.id, ent.username)} className="bg-red-300 text-[#4C4343] px-7 py-1 rounded-2xl">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 ">
              <div className="bg-white p-10 rounded-xl shadow-md ">
              <div className="relative">
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute top-0 right-0 text-gray-600 hover:text-gray-800"
                >
                  ✖
                </button>

                <h2 className="text-lg font-bold mb-4">
                  {isCreating ? "Add Vendor Information" : "Edit User"}
                </h2>
              </div>
                {editingUser && (
                  <form onSubmit={handleSave}>
                    <div>Login Credential</div>
                    <div className="m-2 flex items-center">
                      <label className="">Username : </label>
                      <input
                        type="text"
                        value={editingUser.username}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            username: e.target.value,
                          })
                        }
                        className="border border-gray-300 p-1 w-80 ml-2 rounded-xl"
                        required
                      />
                    </div>
                    <div className="m-2 flex items-center">
                      <label className="">Password : </label>
                      <div className="m-2 flex items-center border border-gray-300 rounded-xl">
                        <input
                          type={visibleModalPassword ? "text" : "password"}
                          value={editingUser.password}
                          onChange={(e) =>
                            setEditingUser({
                              ...editingUser,
                              password: e.target.value,
                            })
                          }
                          className="flex-1 p-1 w-72 ml-2 outline-none"
                          required
                        />
                        <button
                          type="button"
                          onClick={toggleModalPasswordVisibility}
                          className="p-1 text-gray-500"
                        >
                          {visibleModalPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="bg-blue-200 text-[#4C4343] px-6 py-1 rounded-full shadow-md "
                      >
                        Save
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20">
              <div className="bg-white py-7 px-20 rounded-xl shadow-md">
                <h2 className="flex justify-center mb-2 text-lg font-bold">Remove this vendor?</h2>
                <p className="flex justify-center">
                  This action cannot be undone.
                  {/*<strong>{showDeleteConfirm.username}</strong>?*/}
                </p>
                <div className="flex justify-center m-4">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="bg-gray-200 py-2 px-4 mr-20 text-gray-600 rounded-full"
                  >
                    No, Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white py-2 px-4 rounded-full"
                  >
                    Yes, Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

        {/* Pagination Controls */}
          <div className="flex justify-center mt-16 space-x-4">
            <button
              className="px-3 py-1 rounded text-[#4C4343]"
              onClick={() => setCurrentPage((prev) => (prev === 1 ? totalPages : prev - 1))}
            >
              {"<"}
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded-full ${currentPage === i + 1 ? "bg-gray-300 text-[#4C4343]" : "text-[#4C4343]"}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              className="px-3 py-1 rounded text-[#4C4343]"
              onClick={() => setCurrentPage((prev) => (prev === totalPages ? 1 : prev + 1))}
            >
              {">"}
            </button>
          </div>

      </div>
    </AdminLayouts>
  );
}

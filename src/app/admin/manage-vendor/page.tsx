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
  const [visiblePasswords, setVisiblePasswords] = useState<
    Record<string, boolean>
  >({});
  const [shopCounts, setShopCounts] = useState<Record<string, number>>({});
  const [editingUser, setEditingUser] = useState<Entrepreneur | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{
    id: number;
    username: string;
  } | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [visibleModalPassword, setVisibleModalPassword] = useState(false);

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

  return (
    <AdminLayouts currentPage="Manage Vendor">
      <div className="h-screen flex flex-row p-4">
        <div className="h-screen flex flex-col p-4">
          {entrepreneurs.map((ent) => (
            <div key={ent.id} className="flex flex-row items-center mb-2">
              <p className="mx-5">{ent.username}</p>
              <p className="mr-2">
                {visiblePasswords[ent.username] ? ent.password : "••••••"}
              </p>
              <button onClick={() => togglePasswordVisibility(ent.username)}>
                {visiblePasswords[ent.username] ? <EyeOffIcon /> : <EyeIcon />}
              </button>
              <p className="mr-2">
                Shops: {shopCounts[ent.id] ?? "Loading..."}
              </p>
              <button
                onClick={() => openModal(ent)}
                className="bg-blue-500 w-[50px] text-white h-[30px] rounded mx-2"
              >
                Edit
              </button>
              <button
                onClick={() => confirmDelete(ent.id, ent.username)}
                className="bg-red-500 w-[50px] text-white h-[30px] rounded"
              >
                Delete
              </button>
            </div>
          ))}

          <button
            onClick={() => openModal()}
            className="bg-green-500 w-[50px] text-white h-[30px] rounded my-2"
          >
            Add
          </button>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-5 rounded shadow-md">
                <h2 className="mb-4 text-lg font-bold">
                  {isCreating ? "Add User" : "Edit User"}
                </h2>
                {editingUser && (
                  <form onSubmit={handleSave}>
                    <div className="mb-2">
                      <label className="block mb-1">Username</label>
                      <input
                        type="text"
                        value={editingUser.username}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            username: e.target.value,
                          })
                        }
                        className="border border-gray-300 p-1 w-full"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block mb-1">Password</label>
                      <div className="flex items-center">
                        <input
                          type={visibleModalPassword ? "text" : "password"}
                          value={editingUser.password}
                          onChange={(e) =>
                            setEditingUser({
                              ...editingUser,
                              password: e.target.value,
                            })
                          }
                          className="border border-gray-300 p-1 w-full"
                          required
                        />
                        <button
                          type="button"
                          onClick={toggleModalPasswordVisibility}
                          className="ml-2"
                        >
                          {visibleModalPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="mr-2 text-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white p-1 rounded"
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
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-5 rounded shadow-md">
                <h2 className="mb-4 text-lg font-bold">Confirm Delete</h2>
                <p>
                  Are you sure you want to delete{" "}
                  <strong>{showDeleteConfirm.username}</strong>?
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="mr-2 text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayouts>
  );
}

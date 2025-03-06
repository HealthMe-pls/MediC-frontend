"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import VendorLayouts from "@/app/layouts/VendorLayouts";
import { fetchEntrepreneurLoginById } from "@/utility/entrepreneurLogin";
import { editEntrepreneur } from "@/utility/entrepreneur";
import { Entrepreneur } from "@/utility/entrepreneur";

export default function EditAccountInformation() {
  const [entrepreneurData, setEntrepreneurData] = useState<Entrepreneur | null>(
    null
  );
  const [editAccountData, setEditAccountData] = useState<Entrepreneur | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsLoggedIn(false);
      router.push("/login");
      return;
    } else {
      const fetchEntrepreneurData = async () => {
        try {
          const response = await fetchEntrepreneurLoginById();

          setEntrepreneurData(response);
          setEditAccountData(response);

          if (
            !localStorage.getItem("username") &&
            !localStorage.getItem("password")
          ) {
            localStorage.setItem("username", response.username);
            localStorage.setItem("password", response.password);
          }
        } catch (err) {
          setError(`Failed to load entrepreneur data: ${String(err)}`);
          setEntrepreneurData(null);
        } finally {
          setIsLoading(false);
        }
      };

      fetchEntrepreneurData();
    }
  }, [router]);

  useEffect(() => {
    if (editAccountData === null) {
      const storedUsername = localStorage.getItem("username");
      const storedPassword = localStorage.getItem("password");

      if (storedUsername && storedPassword) {
        setEditAccountData({
          ...entrepreneurData!,
          username: storedUsername,
          password: storedPassword,
        });
      }
    }
  }, [editAccountData, entrepreneurData]);

  const handleEditInformation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editAccountData && entrepreneurData) {
      try {
        const response = await editEntrepreneur(entrepreneurData.id, {
          username: editAccountData.username,
          password: editAccountData.password,
        });

        if ("error" in response) {
          setError(response.error as string);
        } else {
          setSuccess("Account updated successfully!");
          setEntrepreneurData(response);

          // เก็บข้อมูลใหม่ใน localStorage
          localStorage.setItem("username", response.username);
          localStorage.setItem("password", response.password);

        }
      } catch (err) {
        setError(`Failed to update account: ${String(err)}`);
      }
    }
  };
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        router.push("/login");
      }, 1500); // Redirect after 1.5 seconds
    }
  }, [success, router]);
  return (
    <VendorLayouts currentPage="Edit Account Information">
      <div className="flex justify-start items-start p-5">
        <div>
          <h1 className="text-[32px] font-light mb-5">
            Edit Account Information
          </h1>

          {error && <div style={{ color: "red" }}>{error}</div>}

          {isLoading ? (
            <p>Loading your account data...</p>
          ) : (
            <div>
              {entrepreneurData ? (
                <div>
                  <h2 className="text-[18px] mb-5 ml-10">Login Credentials</h2>
                  <form onSubmit={handleEditInformation} className="space-y-4">
                    <div className="flex items-center ml-20">
                      <label className="block mr-2">Username:</label>
                      <input
                        type="text"
                        value={editAccountData?.username || ""}
                        onChange={(e) =>
                          setEditAccountData((prev) => ({
                            ...prev!,
                            username: e.target.value,
                          }))
                        }
                        className="border p-2 w-full rounded-full"
                      />
                    </div>
                    <div className="flex items-center ml-20">
                      <label className="block mr-2">Password:</label>
                      <input
                        type="password"
                        value={editAccountData?.password || ""}
                        onChange={(e) =>
                          setEditAccountData((prev) => ({
                            ...prev!,
                            password: e.target.value,
                          }))
                        }
                        className="border p-2 w-full rounded-full"
                      />
                    </div>

                    <div className="flex justify-end mt-5">
                      <button
                        type="submit"
                        className="p-2 bg-[#E0EEF5] text-black rounded-full"
                      >
                        Save
                      </button>
                    </div>
                    {success && <div className="text-[#929292]">{success}</div>}
                  </form>
                </div>
              ) : (
                <p>No entrepreneur data found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </VendorLayouts>
  );
}

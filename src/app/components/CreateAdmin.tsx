"use client";

import { useState } from "react";

export default function CreateAdmin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    title: "",
    first_name: "",
    middle_name: "",
    last_name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create admin");
      }

      const newAdmin = await response.json();
      console.log("Admin created successfully:", newAdmin);
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };

  return (
    <div className="max-w-md mx-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Create Admin</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block font-semibold">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Enter admin's username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-semibold">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Enter admin's password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="title" className="block font-semibold">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Enter admin's title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="first_name" className="block font-semibold">
            First Name
          </label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Enter admin's first name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="middle_name" className="block font-semibold">
            Middle Name
          </label>
          <input
            id="middle_name"
            name="middle_name"
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter admin's middle name"
            value={formData.middle_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block font-semibold">
            Last Name
          </label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Enter admin's last name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded py-2 mt-4"
        >
          Create Admin
        </button>
      </form>
    </div>
  );
}

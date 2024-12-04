"use client";

import { useState } from "react";
import { createPatient } from "@/utility/patient";
import { useRouter } from "next/navigation";

export default function CreatePatient() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      if (!name || !email || age === undefined) {
        throw new Error("All fields are required");
      }

      const newPatient = {
        Name: name,
        Email: email,
        Age: age,
      };

      await createPatient(newPatient);
      setSuccessMessage("Patient created successfully!");
      setName("");
      setEmail("");
      setAge(undefined);
      router.push("/");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to create patient"
      );
    }
  };

  return (
    <div className="max-w-md mx-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Create Patient</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-semibold">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter patient's name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter patient's email"
          />
        </div>
        <div>
          <label htmlFor="age" className="block font-semibold">
            Age
          </label>
          <input
            id="age"
            type="number"
            value={age || ""}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter patient's age"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded py-2 mt-4"
        >
          Create Patient
        </button>
      </form>
      {successMessage && (
        <p className="mt-4 text-green-500">{successMessage}</p>
      )}
      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
    </div>
  );
}

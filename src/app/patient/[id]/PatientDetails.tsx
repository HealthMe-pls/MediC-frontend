"use client";

import { deletePatientById, Patient } from "../../../utility/patient";
import { useRouter } from "next/navigation";

interface Props {
  patient: Patient;
}

export default function PatientDetails({ patient }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete patient: ${patient.Name}?`)) {
      try {
        await deletePatientById(patient.ID);
        alert("patient deleted successfully!");
        router.push("/"); // Redirect to the home page or patients list
      } catch (error) {
        console.error(error);
        alert("Failed to delete patient.");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Patient Details</h1>
      <p>
        <strong>ID:</strong> {patient.ID}
      </p>
      <p>
        <strong>Name:</strong> {patient.Name}
      </p>
      <p>
        <strong>Age:</strong> {patient.Age}
      </p>
      <p>
        <strong>Email:</strong> {patient.Email}
      </p>
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
      >
        Delete Patient
      </button>
    </div>
  );
}

import Link from "next/link";
import { fetchPatients, Patient } from "../utility/patient";

export default async function Home() {
  const patients: Patient[] = await fetchPatients();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Patients</h1>
      <ul className="space-y-4">
        {patients.map((patient, index) => {
          return (
            <li
              key={`${patient.ID}-${index}`}
              className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
            >
              <Link href={`/patient/${patient.ID}`}>
                <p className="text-xl font-semibold text-pink-500 hover:underline">
                  {patient.Name}
                </p>
                <p className="text-gray-700">{patient.Age}</p>
                <p className="text-gray-700">{patient.Email}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import { fetchPatientById, Patient } from "../../../utility/patient";
import PatientDetails from "./PatientDetails";
import PatientImages from "./PatientImages";

interface Props {
  params: Promise<{ id: string }>; // Dynamic route parameter
}

export default async function PatientPage({ params }: Props) {
  const patientId = Number((await params).id); // Convert id to number

  if (isNaN(patientId)) {
    return (
      <div>
        <h1>Error</h1>
        <p>Invalid patient ID: {(await params).id}</p>
      </div>
    );
  }

  try {
    const patient: Patient = await fetchPatientById(patientId);
    return (
      <>
        <div className="flex flex-row ">
          <div>
            <PatientDetails patient={patient} />
          </div>
          <div>
            <PatientImages patientID={patientId} />
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error(error);
    return (
      <div>
        <h1>Error</h1>
        <p>Failed to fetch patient with ID: {patientId}</p>
      </div>
    );
  }
}

import Link from "next/link";
import { fetchAdmins, Admin } from "../utility/admin"; // แก้ไข path ให้ถูกต้อง
import CreateAdmin from "./components/CreateAdmin";

export default async function AdminHome() {
  // ดึงข้อมูลแอดมินทั้งหมด
  const admins: Admin[] = await fetchAdmins();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admins</h1>
      <div className="flex flex-row mx-auto px-auto">
        <CreateAdmin />
        <ul className="space-y-4">
          {admins.map((admin, index) => {
            return (
              <li
                key={`${admin.username}-${index}`} // แก้ไขให้ตรงกับ interface
                className="p-4 bg-white shadow-md rounded-lg min-w-[200px] hover:shadow-lg transition-shadow"
              >
                <Link href={`/admin/${admin.username}`}>
                  <p className="text-xl font-semibold text-blue-500 hover:underline">
                    {admin.username}
                  </p>
                  <p className="text-gray-700">{admin.title}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

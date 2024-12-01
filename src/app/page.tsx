import Link from "next/link";
import { fetchUserById, fetchUsers, User } from "../utility/user";

export default async function Home() {
  const users: User[] = await fetchUsers();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Users</h1>
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.ID}
            className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
          >
            <Link href={`/user/${user.ID}`}>
              <p className="text-xl font-semibold text-pink-500 hover:underline">
                {user.Name}
              </p>
              <p className="text-gray-700">{user.Email}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

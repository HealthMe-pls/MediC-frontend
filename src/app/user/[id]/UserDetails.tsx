"use client";

import { deleteUserById, User } from "../../../utility/user";
import { useRouter } from "next/navigation";

interface Props {
  user: User;
}

export default function UserDetails({ user }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete user: ${user.Name}?`)) {
      try {
        await deleteUserById(user.ID);
        alert("User deleted successfully!");
        router.push("/"); // Redirect to the home page or users list
      } catch (error) {
        console.error(error);
        alert("Failed to delete user.");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <p>
        <strong>ID:</strong> {user.ID}
      </p>
      <p>
        <strong>Name:</strong> {user.Name}
      </p>
      <p>
        <strong>Email:</strong> {user.Email}
      </p>
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
      >
        Delete User
      </button>
    </div>
  );
}

// app/user/[id]/page.tsx
import { fetchUserById, User } from "../../../utility/user";
import UserDetails from "./UserDetails";

interface Props {
  params: { id: string }; // Dynamic route parameter
}

export default async function UserPage({ params }: Props) {
  const userId = parseInt(params.id, 10);

  if (isNaN(userId)) {
    return (
      <div>
        <h1>Error</h1>
        <p>Invalid user ID: {params.id}</p>
      </div>
    );
  }

  try {
    const user: User = await fetchUserById(userId);
    return <UserDetails user={user} />;
  } catch (error) {
    console.error(error);
    return (
      <div>
        <h1>Error</h1>
        <p>Failed to fetch user with ID: {userId}</p>
      </div>
    );
  }
}

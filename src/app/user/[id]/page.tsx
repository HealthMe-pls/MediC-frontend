import { fetchUserById, User } from "../../../utility/user";
import UserDetails from "./UserDetails";

interface Props {
  params: Promise<{ id: string }>; // Dynamic route parameter
}

export default async function UserPage({ params }: Props) {
  const userId = Number((await params).id); // Convert id to number

  if (isNaN(userId)) {
    return (
      <div>
        <h1>Error</h1>
        <p>Invalid user ID: {(await params).id}</p>
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

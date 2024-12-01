interface User {
  ID: number;
  Name: string;
  Email: string;
  Password: string;
}

export default async function Home() {
  const response = await fetch("http://localhost:8080/user", {
    cache: "no-store",
  });
  const users: User[] = await response.json();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.ID}>
            <strong>Name:</strong> {user.Name} <br />
            <strong>Email:</strong> {user.Email}
          </li>
        ))}
      </ul>
    </div>
  );
}

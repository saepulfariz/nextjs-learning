"use client";

import { useAppSelector } from "@/lib/hooks";

export default function UserManagementList() {
  const users = useAppSelector((state) => state.user.users);
  const loading = useAppSelector((state) => state.user.loading);

  return (
    <div className="mt-7">
      <h1 className="text-4xl font-bold mb-2 text-center">User Management</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li className="border border-gray-300 p-4" key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
};

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(0);
  const [editName, setEditName] = useState("");

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!name) return;

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      fetchUsers();
      setName("");
    } else {
      console.error("Failed to add user");
    }
  };

  const handleUpdateUser = async (id: number) => {
    if (!editName) return;

    const response = await fetch("/api/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name: editName }),
    });

    if (response.ok) {
      fetchUsers();
      setEditId(0);
      setEditName("");
    } else {
      console.error("Failed to update user");
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-8">
          List Users
        </h1>

        <div className="mb-5">
          <input
            type="text"
            placeholder="Input new user..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddUser}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Add User
          </button>
        </div>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-200">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    No users found
                  </td>
                </tr>
              )}
              {users.map((user: User, index) => (
                <tr key={user.id}>
                  {editId === user.id ? (
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            handleUpdateUser(user.id);
                            setEditId(0);
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => setEditId(0)}
                          className="ml-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <button
                          onClick={() => setEditId(user.id)}
                          className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none"
                        >
                          Edit
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

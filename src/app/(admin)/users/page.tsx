"use client";

import { useEffect, useState, useCallback } from "react";

import { useAppDispatch } from "@/lib/hooks";
import {
  setLoading as setLoadingGlobal,
  setUsers as setUsersGlobal,
} from "@/lib/features/userSlice";
import UserManagementList from "@/app/ui/state/UserManagementList";
import { set } from "zod/v4/mini";

type User = {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  role: {
    id: string;
    name: string;
  };
};

type Role = {
  id: string;
  name: string;
};

export default function Page() {
  const dispatch = useAppDispatch();

  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [name, setName] = useState("");
  const [roleId, setRoleId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(0);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRoleId, setEditRoleId] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editIsActive, setEditIsActive] = useState(true);
  const [loading, setLoading] = useState(true);

  // Use useCallback to memoize fetchUsers function
  const fetchUsers = useCallback(async () => {
    dispatch(setLoadingGlobal(true));
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data.data);
      setLoading(false);
      dispatch(setUsersGlobal(data.data));
      dispatch(setLoadingGlobal(false));
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
      dispatch(setLoadingGlobal(false));
    }
  }, [dispatch]);

  const fetchRoles = useCallback(async () => {
    try {
      const response = await fetch("/api/roles");
      if (!response.ok) {
        throw new Error("Failed to fetch roles");
      }
      const data = await response.json();
      setRoles(data.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [fetchUsers, fetchRoles]); // Now fetchUsers and fetchRoles are in dependency array

  const handleAddUser = async () => {
    if (!name) return;
    if (!email) return;
    if (!password) return;
    if (!roleId) return;

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role_id: roleId }),
    });

    if (response.ok) {
      // const newUser = await response.json();
      // setUsers((prevUsers) => [...prevUsers, newUser.data]);
      // dispatch(setUsersGlobal([...users, newUser.data]));

      fetchUsers();
      setName("");
      setEmail("");
      setPassword("");
      setRoleId("");
    } else {
      console.error("Failed to add user");
    }
  };

  const handleUpdateUser = async (id: number) => {
    if (!editName) return;
    if (!editEmail) return;
    if (!editRoleId) return;

    const response = await fetch("/api/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name: editName,
        email: editEmail,
        role_id: editRoleId,
        password: editPassword,
      }),
    });

    if (response.ok) {
      fetchUsers();
      setEditId(0);
      setEditName("");
      setEditEmail("");
      setEditRoleId("");
      setEditPassword("");
    } else {
      console.error("Failed to update user");
    }
  };

  const handleDeleteUser = async (id: number) => {
    const response = await fetch(`/api/users`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      fetchUsers();
    } else {
      console.error("Failed to delete user");
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
            className="w-50 mr-2 mb-2 max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Input user email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-50 mr-2 mb-2 max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          />
          <input
            type="password"
            placeholder="Input user password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-50 mr-2 mb-2 max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          />
          <select
            value={roleId}
            onChange={(e) => {
              console.log("ROle");
              setRoleId(e.target.value);
            }}
            className="w-50 mr-2 mb-2 max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          >
            <option value={""} selected>
              Select Role
            </option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddUser}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
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
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-200">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-200">
                  Is Active
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-200">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-200">
                  Updated At
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loading && (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              )}
              {!loading && users.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4">
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
                        <input
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={editRoleId}
                          onChange={(e) => setEditRoleId(e.target.value)}
                          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option disabled value="">
                            Select Role
                          </option>
                          {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                              {role.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4" colSpan={2}>
                        <input
                          type="password"
                          value={editPassword}
                          placeholder="Change password..."
                          onChange={(e) => setEditPassword(e.target.value)}
                          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>

                      <td className="px-6 py-4 flex items-center">
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
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {user.role ? user.role.name : "No Role Assigned"}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {user.is_active ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(user.created_at).toLocaleDateString() +
                          " " +
                          new Date(user.created_at).toLocaleTimeString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(user.updated_at).toLocaleDateString() +
                          " " +
                          new Date(user.updated_at).toLocaleTimeString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium flex">
                        <button
                          onClick={() => {
                            setEditId(user.id);
                            setEditName(user.name);
                            setEditEmail(user.email);
                            setEditRoleId(user.role.id || "");
                            setEditPassword(""); // Reset password field
                          }}
                          className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none"
                        >
                          Edit
                        </button>
                        <button
                          className="ml-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                          onClick={() => {
                            handleDeleteUser(user.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <UserManagementList />
      </div>
    </>
  );
}

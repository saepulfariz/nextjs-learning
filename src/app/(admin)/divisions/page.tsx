"use client";

import { useEffect, useState } from "react";

type Division = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export default function Page() {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(0);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDivisions = async () => {
    const response = await fetch("/api/divisions");
    if (!response.ok) {
      throw new Error("Failed to fetch divisions");
    }
    const data = await response.json();
    setLoading(false);
    setDivisions(data.data);
  };

  useEffect(() => {
    fetchDivisions();
  }, []);

  const handleAddDivision = async () => {
    if (!name) return;

    const response = await fetch("/api/divisions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      fetchDivisions();
      setName("");
    } else {
      console.error("Failed to add division");
    }
  };

  const handleUpdateDivision = async (id: number) => {
    if (!editName) return;

    const response = await fetch(`/api/divisions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: editName }),
    });

    if (response.ok) {
      fetchDivisions();
      setEditId(0);
      setEditName("");
    } else {
      console.error("Failed to update division");
    }
  };

  const handleDeleteDivision = async (id: number) => {
    const response = await fetch(`/api/divisions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      fetchDivisions();
    } else {
      console.error("Failed to delete division");
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-8">
          List Divisions
        </h1>

        <div className="mb-5">
          <input
            type="text"
            placeholder="Input new division..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddDivision}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none mt-2"
          >
            Add Division
          </button>
        </div>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-200">
                  No
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-200">
                  Name
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
              {!loading && divisions.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No divisions found
                  </td>
                </tr>
              )}
              {divisions.map((division: Division, index) => (
                <tr key={division.id}>
                  {editId === division.id ? (
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
                            handleUpdateDivision(division.id);
                            setEditId(0);
                          }}
                          className="px-4 py-2 mr-2 mb-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => setEditId(0)}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {division.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(division.created_at).toLocaleDateString() +
                          " " +
                          new Date(division.created_at).toLocaleTimeString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(division.updated_at).toLocaleDateString() +
                          " " +
                          new Date(division.updated_at).toLocaleTimeString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <button
                          onClick={() => {
                            setEditId(division.id);
                            setEditName(division.name);
                          }}
                          className="px-4 py-2 mr-2 mb-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none"
                        >
                          Edit
                        </button>
                        <button
                          className=" px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                          onClick={() => {
                            handleDeleteDivision(division.id);
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
      </div>
    </>
  );
}

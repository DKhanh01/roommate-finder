"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

type Account = {
  id: number;
  email: string;
  role: string;
};

export default function ManageAccounts() {
  const [activeTab, setActiveTab] = useState<"USER" | "ADMIN">("USER");
  const [data, setData] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  async function fetchData() {
    setLoading(true);

    try {
      if (activeTab === "USER") {
        const res = await api.get("/admin/users");
        setData(res.data);
      } else {
        const res = await api.get("/admin/admins");
        setData(res.data);
      }
    } finally {
      setLoading(false);
    }
  }

  async function deleteAccount(id: number) {
    const confirmDelete = confirm("Are you sure?");
    if (!confirmDelete) return;

    await api.delete(`/admin/users/${id}`);

    setData((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Accounts</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("USER")}
          className={`px-4 py-2 rounded font-medium transition ${
            activeTab === "USER"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Manage Users
        </button>

        <button
          onClick={() => setActiveTab("ADMIN")}
          className={`px-4 py-2 rounded font-medium transition ${
            activeTab === "ADMIN"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Manage Admins
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : (
          <table className="w-full text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4">ID</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3">{item.id}</td>
                  <td>{item.email}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        item.role === "ADMIN"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {item.role}
                    </span>
                  </td>
                  <td>
                    <button
                        onClick={() => deleteAccount(item.id)}
                        disabled={user?.id === item.id}
                        className={`px-4 py-1 rounded text-white ${
                            user?.id === item.id
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                        >
                        Delete
                    </button>
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
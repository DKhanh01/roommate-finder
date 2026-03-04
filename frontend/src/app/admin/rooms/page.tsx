"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdminRooms() {
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    api.get("/admin/rooms").then((res) => {
      setRooms(res.data);
    });
  }, []);

  async function toggleRoom(id: number) {
    await api.patch(`/admin/rooms/${id}/toggle`);
    setRooms(
      rooms.map((r) =>
        r.id === id ? { ...r, active: !r.active } : r
      )
    );
  }

  async function deletePermament(id: number) {
    if (!confirm("Delete permanently? Cannot undo!")) return;

    await api.delete(`room/admin/${id}`);
    setRooms((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Rooms</h1>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Action</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((room) => (
            <tr key={room.id} className="border-t text-center">
              <td className="p-2">{room.id}</td>
              <td>{room.title}</td>
              <td>
                {room.active ? (
                  <span className="text-red-600">Hidden</span>
                ) : (
                  <span className="text-green-600">Active</span>
                )}
              </td>
              <td>
                <button
                  onClick={() => toggleRoom(room.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Show/Hide
                </button>
              </td>
               <td>
                <button
                  onClick={() => deletePermament(room.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
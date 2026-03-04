"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get("/admin/stats").then(res => {
      setStats(res.data);
    });
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">
        <Card title="Users" value={stats.totalUsers} />
        <Card title="Rooms" value={stats.totalRooms} />
        <Card title="Active Rooms" value={stats.activeRooms} />
        <Card title="Hidden Rooms" value={stats.inactiveRooms} />
      </div>
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
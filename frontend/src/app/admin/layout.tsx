"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user || user.role !== "ADMIN") {
      router.replace("/");
    }
  }, [loading, user, router]);

  if (loading) {
    return null;
  }

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin</h2>

        <ul className="space-y-4">
          <li className="cursor-pointer" onClick={() => router.push("/admin")}>
            Dashboard
          </li>

          <li className="cursor-pointer" onClick={() => router.push("/admin/users")}>
            Users
          </li>

          <li className="cursor-pointer" onClick={() => router.push("/admin/rooms")}>
            Rooms
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-8 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
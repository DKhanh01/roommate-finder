"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e: any) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/auth/register", form);
      setSuccess("Tạo tài khoản thành công!");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="flex items-center justify-center relative"
      style={{
        height: "calc(100vh - 64px)",
        backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(28,26,24,0.55)" }} />

      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-8 rounded-xl shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        {success && (
          <p className="text-green-500 text-sm mb-4">{success}</p>
        )}

        <input
          name="fullName"
          placeholder="Họ và tên"
          value={form.fullName}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 p-2 border rounded"
          required
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>

        <p className="text-sm mt-4 text-center">
          Đã có tài khoản?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => router.push("/auth/login")}
          >
            Đăng nhập
          </span>
        </p>
      </form>
    </div>
  );
}
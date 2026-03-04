"use client";

import { useState } from "react";
import { login } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {

  const router = useRouter();
  const { login: setAuthUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e:any){
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e:any){
    e.preventDefault();
    setLoading(true);
    setError("");

    try {

      const res = await login(form);

      console.log(res);

      setAuthUser(res.access_token, res.refresh_token, res.user);
      router.replace("/");

    } catch (err:any){
        if (err.response?.status === 401) {
        setError("Email hoặc mật khẩu không đúng");
      } else if (err.response?.status === 404) {
        setError("Tài khoản không tồn tại");
      } else {
        setError("Có lỗi xảy ra, vui lòng thử lại");
      }
    }
    finally{  
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

        <h2 className="text-2xl font-bold mb-6 text-center">
          Đăng nhập
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

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
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <p className="text-sm mt-4 text-center">
          Chưa có tài khoản?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => router.push("/auth/register")}
          >
            Đăng ký
          </span>
        </p>

      </form>
    </div>
  );
}
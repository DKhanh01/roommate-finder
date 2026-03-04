"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function HamburgerNav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isLogin, logout, user } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center rounded hover:bg-gray-100"
        style={{ width: "36px", height: "36px" }}
      >
        <svg width="20" height="14" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect y="0" width="20" height="2" rx="1" fill="#1C1A18"/>
          <rect y="6" width="20" height="2" rx="1" fill="#1C1A18"/>
          <rect y="12" width="20" height="2" rx="1" fill="#1C1A18"/>
        </svg>
      </button>

      {open && (
        <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg w-48 p-3 flex flex-col gap-2 z-50">
          
          {isLogin && (
            <div className="font-semibold text-center border-b pb-2">
              {user?.fullName || user?.email}
            </div>
          )}

          <a href="/" className="hover:bg-gray-100 p-2 rounded">
            Trang chủ
          </a>

          {isLogin && (
            <>
              <a href="/room/my" className="hover:bg-gray-100 p-2 rounded">
                Phòng của tôi
              </a>

              <a href="/room/create" className="hover:bg-gray-100 p-2 rounded">
                Đăng phòng
              </a>

              <a href="/my-profile" className="hover:bg-gray-100 p-2 rounded">
                Hồ sơ
              </a>
            </>
          )}

          <div className="border-t my-3"></div>

          {!isLogin ? (
            <>
              <Link href="/auth/login" className="text-green-400">
                Đăng nhập
              </Link>

              <Link href="/auth/register" className="text-green-400">
                Đăng ký
              </Link>
            </>
          ) : (
            <button onClick={logout} className="text-red-400">
              Đăng xuất
            </button>
          )}
        </div>
      )}
    </div>
  );
}
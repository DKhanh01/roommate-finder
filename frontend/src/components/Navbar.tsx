"use client";

import { useEffect, useState } from "react";
import HamburgerNav from "./HamburgerNav";

export default function Navbar() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const payload = JSON.parse(atob(token.split(".")[1]));
    setRole(payload.role);
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap"
        rel="stylesheet"
      />
      <nav
        className="fixed top-0 left-0 w-full flex items-center justify-between z-50 bg-white shadow-sm"
        style={{ height: "64px", padding: "0 32px" }}
      >
        <a
          href="/"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "24px",
            fontWeight: 700,
            color: "#1C1A18",
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
        >
          Roommate Finder
        </a>

        <div className="flex items-center gap-6">
          {role === "ADMIN" && (
            <a
              href="/admin"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "16px",
                fontWeight: 700,
                color: "#1C1A18",
                textDecoration: "none",
              }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
            >
              Dashboard
            </a>
          )}
          <HamburgerNav />
        </div>
      </nav>
    </>
  );
}
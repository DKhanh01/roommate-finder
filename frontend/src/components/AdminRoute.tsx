"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("access_token");

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    try {

      const payload: any = jwtDecode(token);

      if (payload.role !== "ADMIN") {
        router.replace("/");
        return;
      }

      setAuthorized(true);

    } catch {
      router.replace("/admin/login");
    }

  }, []);

  if (!authorized) return null;

  return <>{children}</>;
}

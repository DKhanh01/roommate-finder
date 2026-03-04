"use client";

export const useAuth = () => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("access_token");
  return !!token;
};

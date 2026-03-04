import api from "@/lib/api";

export const getProfile = async () => {
  const res = await api.get("/user/profile");
  return res.data;
};

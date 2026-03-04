import api from "@/lib/api";

export const login = async (data: any) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const adminLogin = async (data:any)=>{
  const res = await api.post("/auth/admin/login", data);
  return res.data;
};
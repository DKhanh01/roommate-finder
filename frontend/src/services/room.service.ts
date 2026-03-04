import api from "@/lib/api";

export const getRooms = async () => {
  const res = await api.get("/room");
  return res.data;
};

export const getMyRooms = async () => {
  const res = await api.get("/room/my");
  return res.data;
};

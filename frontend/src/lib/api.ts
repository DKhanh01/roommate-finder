import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const refreshClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let pendingRequests: Array<(token: string) => void> = [];

function onRefreshed(token: string) {
  pendingRequests.forEach((cb) => cb(token));
  pendingRequests = [];
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      // Nếu đang refresh thì queue request lại, không gọi refresh nhiều lần
      if (isRefreshing) {
        return new Promise((resolve) => {
          pendingRequests.push((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const refresh = localStorage.getItem("refresh_token");
        console.log("[auth] access token expired, attempting refresh...");
        if (!refresh) {
          console.error("[auth] no refresh token in localStorage");
          throw new Error("No refresh token");
        }

        const res = await refreshClient.post(
          "/auth/refresh",
          {},
          { headers: { Authorization: `Bearer ${refresh}` } }
        );

        const newAccessToken = res.data.access_token;
        console.log("[auth] refresh success, new access token obtained");

        localStorage.setItem("access_token", newAccessToken);
        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        onRefreshed(newAccessToken);

        return api(originalRequest);
      } catch (err) {
        console.error("[auth] refresh failed:", err);
        localStorage.clear();
        window.location.href = "/auth/login";
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
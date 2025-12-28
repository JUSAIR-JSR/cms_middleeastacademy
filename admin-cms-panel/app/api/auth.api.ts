import api from "./axios";

/* -------------------------------
   AUTH API
-------------------------------- */

export const adminGoogleLogin = async (credential: string) => {
  const res = await api.post("/auth/google", {
    credential,
  });
  return res.data;
};

export const adminLogout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

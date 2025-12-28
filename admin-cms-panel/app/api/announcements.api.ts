import api from "./axios";

/* -------------------------------
   ANNOUNCEMENTS API (ADMIN)
-------------------------------- */

export const getAnnouncements = async () => {
  const res = await api.get("/announcements", {
    withCredentials: true,
  });
  return res.data;
};

export const getAnnouncementById = async (id: string) => {
  const res = await api.get(`/announcements/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

export const createAnnouncement = async (data: any) => {
  const res = await api.post("/announcements", data, {
    withCredentials: true,
  });
  return res.data;
};

export const updateAnnouncement = async (id: string, data: any) => {
  const res = await api.put(`/announcements/${id}`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const deleteAnnouncement = async (id: string) => {
  const res = await api.delete(`/announcements/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

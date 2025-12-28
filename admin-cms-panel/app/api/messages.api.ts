import api from "./axios";

export const getMessages = async ({
  page = 1,
  limit = 10,
  search = "",
  from,
  to,
}: {
  page?: number;
  limit?: number;
  search?: string;
  from?: string;
  to?: string;
}) => {
  const res = await api.get("/messages", {
    params: { page, limit, search, from, to },
    withCredentials: true,
  });
  return res.data;
};



export const getMessageById = async (id: string) => {
  const res = await api.get(`/messages/${id}`, { withCredentials: true });
  return res.data;
};

export const markMessageRead = async (id: string) => {
  const res = await api.put(`/messages/${id}/read`, {}, { withCredentials: true });
  return res.data;
};

export const deleteMessage = async (id: string) => {
  const res = await api.delete(`/messages/${id}`, { withCredentials: true });
  return res.data;
};

export const getUnreadCount = async () => {
  const res = await api.get("/messages/unread/count", {
    withCredentials: true,
  });
  return res.data.count;
};

export const getMessageStats = async () => {
  const res = await api.get("/messages/stats", { withCredentials: true });
  return res.data;
};

export const downloadMessages = (range: string) => {
  window.open(
    `${process.env.NEXT_PUBLIC_API_URL}/messages/export?range=${range}`,
    "_blank"
  );
};


export type Message = {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  course?: string;
  message: string;
  source: "email" | "whatsapp" | "form";
  isRead: boolean;
  replied: boolean;
  replyMessage?: string;
  createdAt: string;
};

'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminNavbar from "../../components/AdminNavbar";
import { getMessageById, markMessageRead } from "@/app/api/messages.api";
import { Message } from "../../types/message";

/* shadcn */
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default function MessageDetailPage() {
  const { id } = useParams();
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      const data = await getMessageById(id as string);
      setMessage(data);
      await markMessageRead(id as string);
    };

    load();
  }, [id]);

  if (!message) {
    return (
      <>
        <AdminNavbar />
        <main className="p-10">Loading...</main>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />

      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="max-w-3xl mx-auto space-y-6">

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {message.name}
              </CardTitle>

              <div className="text-sm text-muted-foreground space-y-1">
                <p>Email: {message.email || "—"}</p>
                <p>Phone: {message.phone || "—"}</p>
                <p>Source: {message.source}</p>
                <p>
                  Status:{" "}
                  <span
                    className={
                      message.isRead
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    {message.isRead ? "Read" : "Unread"}
                  </span>
                </p>
                <p>
                  Received:{" "}
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
            </CardHeader>

            <CardContent>
              <h4 className="font-semibold mb-2">Message</h4>
              <p className="text-gray-700 whitespace-pre-line">
                {message.message}
              </p>
            </CardContent>
          </Card>

        </div>
      </main>
    </>
  );
}

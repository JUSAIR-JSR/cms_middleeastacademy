'use client';

import Link from "next/link";
import { toast } from "sonner";
import { deleteMessage } from "@/app/api/messages.api";
import { Message } from "../types/message";

/* shadcn */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Props = {
  messages: Message[];
  refresh: () => void;
};

export default function MessageTable({ messages, refresh }: Props) {
  const handleDelete = async (id: string) => {
    await deleteMessage(id);
    toast.success("Message deleted");
    refresh();
  };

  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {messages.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                No messages found
              </TableCell>
            </TableRow>
          )}

          {messages.map((m) => (
            <TableRow key={m._id} className={!m.isRead ? "bg-green-50/40" : ""}>
              <TableCell className="font-medium">{m.name}</TableCell>
              <TableCell className="max-w-[300px] truncate">
                {m.message}
              </TableCell>
              <TableCell>{m.source}</TableCell>
              <TableCell>
                {m.isRead ? "Read" : "Unread"}
              </TableCell>
              <TableCell>
                {new Date(m.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button asChild variant="link">
                  <Link href={`/admin/messages/${m._id}`}>
                    View
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(m._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

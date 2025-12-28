"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteAnnouncement } from "@/app/api/announcements.api";
import { toast } from "sonner";

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type Announcement = {
  _id: string;
  type: string;
  title: string;
  date: string;
  color: string;
  status: string;
  createdAt: string;
};

type Props = {
  announcements: Announcement[];
  refresh: () => void;
};

export default function AnnouncementTable({ announcements, refresh }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const confirmDelete = (id: string) => {
    setSelectedId(id);
    setOpen(true);
  };

 const handleDelete = async () => {
  if (!selectedId) return;

  try {
    setLoading(true);

    await deleteAnnouncement(selectedId);

    toast.success("Announcement deleted successfully");

    refresh();
  } catch (err: any) {
    toast.error(
      err?.response?.data?.message ||
      "Failed to delete announcement"
    );
  } finally {
    setLoading(false);
    setOpen(false);
    setSelectedId(null);
  }
};


  return (
    <>
      <div className="rounded-xl border bg-white shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {announcements.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                  No announcements found
                </TableCell>
              </TableRow>
            )}

            {announcements.map((a) => (
              <TableRow key={a._id}>
                <TableCell>{a.type}</TableCell>
                <TableCell className="font-medium">{a.title}</TableCell>
                <TableCell>{a.date}</TableCell>
                <TableCell>{a.color}</TableCell>
                <TableCell>{a.status}</TableCell>
                <TableCell className="text-sm text-gray-500">
                  {new Date(a.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button asChild variant="link">
                    <Link href={`/admin/announcements/${a._id}`}>
                      Edit
                    </Link>
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => confirmDelete(a._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Announcement</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

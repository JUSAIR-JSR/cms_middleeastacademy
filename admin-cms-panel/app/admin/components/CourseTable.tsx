'use client';

import { useState } from "react";
import Link from "next/link";
import { deleteCourse } from "@/app/api/courses.api";
import { toast } from "sonner";

/* shadcn ui */
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

/* icons */
import { ICON_MAP } from "@/app/lib/iconRegistry";

type Course = {
  _id: string;
  title: string;
  description: string;
  duration: string;
  certification: string;
  placement: string;
  color: string;
  shade: string;
  icon: keyof typeof ICON_MAP;
  status: "draft" | "published";
  createdAt: string;
};


type Props = {
  courses: Course[];
  refresh: () => void;
};

export default function CourseTable({ courses, refresh }: Props) {
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

    await deleteCourse(selectedId);

    toast.success("Course deleted successfully");

    refresh();
  } catch (err: any) {
    toast.error(
      err?.response?.data?.message ||
      "Failed to delete course"
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
              <TableHead>Icon</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Certification</TableHead>
              <TableHead>Placement</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {courses.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-6 text-gray-500">
                  No courses found
                </TableCell>
              </TableRow>
            )}

            {courses.map((course) => {
              const Icon = ICON_MAP[course.icon];

              return (
                <TableRow key={course._id}>
                  {/* ICON */}
                  <TableCell>
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                      <Icon className="text-slate-600" />
                    </div>
                  </TableCell>

                  {/* TITLE */}
                  <TableCell className="font-medium">
                    {course.title}
                  </TableCell>

                  {/* DESCRIPTION */}
                  <TableCell className="max-w-[240px] truncate text-gray-600">
                    {course.description}
                  </TableCell>

                  {/* DURATION */}
                  <TableCell>{course.duration}</TableCell>

                  {/* CERTIFICATION */}
                  <TableCell>{course.certification}</TableCell>

                  {/* PLACEMENT */}
                  <TableCell>{course.placement}</TableCell>

                  {/* COLOR */}
                  <TableCell>
                    <span className="text-sm">
                      {course.color}-{course.shade}
                    </span>
                  </TableCell>

                  {/* CREATED DATE */}
                  <TableCell className="text-sm text-gray-500">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </TableCell>
                    {/* STATUS */}
                    <TableCell>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        course.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {course.status}
                    </span>
                  </TableCell>

                  {/* ACTIONS */}
                  <TableCell className="text-right space-x-2">
                    <Button asChild variant="link">
                      <Link href={`/admin/courses/${course._id}`}>
                        Edit
                      </Link>
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() => confirmDelete(course._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* DELETE CONFIRMATION */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              This action cannot be undone.  
              Are you sure you want to delete this course?
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

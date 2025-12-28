'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminNavbar from "../../components/AdminNavbar";
import CourseForm from "../../components/CourseForm";
import CoursePreviewCard from "../../components/CoursePreviewCard";
import { getCourseById, updateCourse } from "@/app/api/courses.api";
import { CourseFormState } from "../../components/CourseBuilder";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function EditCoursePage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<CourseFormState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id as string);

        setForm({
          title: data.title,
          description: data.description,
          duration: data.duration,
          certification: data.certification,
          placement: data.placement,
          color: data.color,
          shade: data.shade || "500",
          icon: data.icon,
          status: data.status || "draft",
        });

      } catch {
        toast.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    try {
      setSaving(true);

      await updateCourse(id as string, form);

      toast.success("Course updated successfully");
      router.push("/admin/courses");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to update course"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <main className="p-10">Loading...</main>
      </>
    );
  }

  if (!form) {
    return (
      <>
        <AdminNavbar />
        <main className="p-10 text-red-600">
          Course not found
        </main>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />

      <main className="p-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Edit Course</h1>
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <CourseForm
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />

          <CoursePreviewCard form={form} />
        </div>
      </main>
    </>
  );
}

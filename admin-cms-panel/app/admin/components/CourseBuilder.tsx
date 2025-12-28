'use client';

import { useState } from "react";
import { toast } from "sonner";
import { createCourse } from "@/app/api/courses.api";
import CourseForm from "./CourseForm";
import CoursePreviewCard from "./CoursePreviewCard";

export type CourseFormState = {
  title: string;
  description: string;
  duration: string;
  certification: string;
  placement: string;
  color: string;
  shade: string;
  icon: string;
  status: "draft" | "published";
};

export default function CourseBuilder() {
  const [form, setForm] = useState<CourseFormState>({
    title: "",
    description: "",
    duration: "",
    certification: "",
    placement: "Premium Placement Support",
    color: "primary",
    shade: "500",
    icon: "FaTools",
    status: "draft",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.duration.trim() ||
      !form.certification.trim() ||
      !form.placement.trim()
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await createCourse(form);

      toast.success("Course added successfully");

      setForm({
        title: "",
        description: "",
        duration: "",
        certification: "",
        placement: "Premium Placement Support",
        color: "primary",
        shade: "500",
        icon: "FaTools",
        status: "draft",
      });
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
        "Failed to create course"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <CourseForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <CoursePreviewCard form={form} />
    </div>
  );
}

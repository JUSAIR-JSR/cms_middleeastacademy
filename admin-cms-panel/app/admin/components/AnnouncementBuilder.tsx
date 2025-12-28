'use client';

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  createAnnouncement,
  getAnnouncementById,
  updateAnnouncement,
} from "@/app/api/announcements.api";
import AnnouncementForm from "./AnnouncementForm";
import AnnouncementPreviewCard from "./AnnouncementPreviewCard";

export type AnnouncementFormState = {
  type: "New Batch" | "Workshop" | "Placement";
  title: string;
  description: string;
  date: string;
  color: string;
  shade: string;
  icon: string;
  status: "draft" | "published";
};

const INITIAL_FORM_STATE: AnnouncementFormState = {
  type: "New Batch",
  title: "",
  description: "",
  date: "",
  color: "primary",
  shade: "500",
  icon: "none",
  status: "draft",
};

type Props = {
  announcementId?: string;
};

export default function AnnouncementBuilder({ announcementId }: Props) {
  const [form, setForm] = useState<AnnouncementFormState>(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEditMode = Boolean(announcementId);

  /* 🔹 LOAD EXISTING ANNOUNCEMENT (EDIT MODE) */
  useEffect(() => {
    if (!announcementId) return;

    const fetchAnnouncement = async () => {
      try {
        setLoading(true);
        const data = await getAnnouncementById(announcementId);

        setForm({
          type: data.type,
          title: data.title,
          description: data.description,
          date: data.date,
          color: data.color,
          shade: data.shade || "500",
          icon: data.icon ?? "none",
          status: data.status,
        });
      } catch {
        setError("Failed to load announcement");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, [announcementId]);

  const handleChange = (
    name: keyof AnnouncementFormState,
    value: string
  ) => {
    setForm({ ...form, [name]: value });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.title || !form.description || !form.date) {
    toast.error("All required fields must be filled");
    return;
  }

  try {
    setLoading(true);

    const payload = {
      ...form,
      icon: form.icon === "none" ? null : form.icon,
    };

    if (isEditMode && announcementId) {
      await updateAnnouncement(announcementId, payload);
      toast.success("Announcement updated successfully");
    } else {
      await createAnnouncement(payload);
      toast.success("Announcement created successfully");
      setForm(INITIAL_FORM_STATE);
    }
  } catch (err: any) {
    toast.error(
      err?.response?.data?.message ||
      "Failed to save announcement"
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div>
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 text-red-700 p-3 text-sm">
            {error}
          </div>
        )}

        <AnnouncementForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>

      <AnnouncementPreviewCard form={form} />
    </div>
  );
}

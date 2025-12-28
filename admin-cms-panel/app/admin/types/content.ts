import { ICON_MAP } from "@/app/lib/iconRegistry";

/* ----------------------------------
   SHARED TYPES (SINGLE SOURCE)
---------------------------------- */

export type IconKey = keyof typeof ICON_MAP;

/* COURSE */
export type Course = {
  _id: string;
  title: string;
  description: string;
  duration: string;
  certification: string;
  placement: string;
  color: string;
  shade: string;
  icon: IconKey; // ✅ STRICT + SAFE
};

/* ANNOUNCEMENT */
export type Announcement = {
  _id: string;
  type: "New Batch" | "Workshop" | "Placement";
  title: string;
  description: string;
  date: string;
  color: string;
  shade?: string;
  icon?: IconKey | null;
  status?: "draft" | "published";
};



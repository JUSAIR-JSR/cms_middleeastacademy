'use client';

import { motion } from "framer-motion";
import { ICON_MAP } from "@/app/lib/iconRegistry";
import { getCourseStyle } from "@/app/lib/dynamicCourseStyle";
import { AnnouncementFormState } from "./AnnouncementBuilder";
import {
  FaCalendarAlt,
  FaArrowRight,
  FaBullhorn,
} from "react-icons/fa";

/* Animation */
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

type Props = {
  form: AnnouncementFormState;
};

export default function AnnouncementPreviewCard({ form }: Props) {
  const style = getCourseStyle(form.color, form.shade);

  // ICON LOGIC
  const Icon =
    form.icon && form.icon !== "none"
      ? ICON_MAP[form.icon as keyof typeof ICON_MAP]
      : FaBullhorn;

  // CTA TEXT BASED ON TYPE
  const ctaText =
    form.type === "New Batch"
      ? "Apply Now"
      : form.type === "Workshop"
      ? "Register Now"
      : "View Details";

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="premium-card p-8 w-full max-w-[380px] mx-auto rounded-3xl border border-slate-200"
    >
      {/* ICON */}
      <div
        className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg"
        style={style.iconGradient}
      >
        <Icon className="text-white text-2xl" />
      </div>

      {/* BADGE + DATE */}
      <div className="flex items-center mb-4">
        <span
          className="px-3 py-1 rounded-full text-sm font-medium"
          style={{
            backgroundColor: `${style.iconTextStyle.color}22`,
            color: style.iconTextStyle.color,
          }}
        >
          {form.type}
        </span>

        <div className="ml-auto flex items-center text-sm text-gray-500">
          <FaCalendarAlt className="mr-1" />
          {form.date || "Date"}
        </div>
      </div>

      {/* TITLE */}
      <h3 className="text-2xl font-semibold mb-3 text-gray-900">
        {form.title || "Announcement Title"}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-gray-600 mb-6">
        {form.description || "Announcement description preview"}
      </p>

      {/* CTA */}
      <button
        className="flex items-center font-medium group"
        style={{ color: style.iconTextStyle.color }}
      >
        {ctaText}
        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}

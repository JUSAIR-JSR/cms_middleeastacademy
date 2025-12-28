'use client';

import { motion } from "framer-motion";
import { ICON_MAP } from "../../lib/iconRegistry";
import { getCourseStyle } from "../../lib/dynamicCourseStyle";
import { CourseFormState } from "./CourseBuilder";
import { FaClock, FaCertificate, FaBriefcase } from "react-icons/fa";

/* Animation (same feel as real cards) */
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
  form: CourseFormState;
};

export default function CoursePreviewCard({ form }: Props) {
  const Icon = ICON_MAP[form.icon as keyof typeof ICON_MAP];
  const style = getCourseStyle(form.color, form.shade);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="premium-card p-8 w-full max-w-[380px] mx-auto rounded-3xl border border-green-200 "
    >
      {/* ICON */}
      <div
        className="w-20 h-20 rounded-xl flex items-center justify-center mb-6 shadow-lg"
        style={style.iconGradient}
      >
        <Icon className="text-white text-3xl" />
      </div>

      {/* TITLE */}
      <h3 className="text-2xl font-semibold mb-4 text-gray-900">
        {form.title || "Course Title"}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-gray-600 mb-6">
        {form.description || "Course description preview"}
      </p>

      {/* DETAILS */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center text-gray-700">
          <FaClock className="mr-3" style={style.iconTextStyle} />
          <span>{form.duration || "Duration"}</span>
        </div>

        <div className="flex items-center text-gray-700">
          <FaCertificate className="mr-3" style={style.iconTextStyle} />
          <span>{form.certification || "Certification"}</span>
        </div>

        <div className="flex items-center text-gray-700">
          <FaBriefcase className="mr-3" style={style.iconTextStyle} />
          <span>{form.placement || "Placement Support"}</span>
        </div>
      </div>

      {/* CTA BUTTON (same as public cards) */}
      <button
        className="w-full text-center rounded-lg py-3 text-white font-medium transition-all"
        style={style.buttonStyle}
      >
        Enquire Now →
      </button>
    </motion.div>
  );
}

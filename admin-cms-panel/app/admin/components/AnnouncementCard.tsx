'use client';

import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaArrowRight,
  FaBullhorn
} from "react-icons/fa";
import { ICON_MAP } from "@/app/lib/iconRegistry";
import { getCourseStyle } from "@/app/lib/dynamicCourseStyle";

type Announcement = {
  _id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  color: string;
  shade?: string;
  icon?: keyof typeof ICON_MAP | null;
};

export default function AnnouncementCard({
  announcement,
}: {
  announcement: Announcement;
}) {
  const Icon =
    announcement.icon && ICON_MAP[announcement.icon]
      ? ICON_MAP[announcement.icon]
      : FaBullhorn;

  const style = getCourseStyle(
    announcement.color,
    announcement.shade || "500"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="premium-card p-6 hover-lift bg-white rounded-3xl shadow-md hover:border hover:border-green-400"
    >
      {/* TOP ROW */}
      <div className="flex items-center justify-between mb-4">
        {/* BADGE */}
        <span
          className="px-3 py-1 rounded-full text-sm font-medium"
          style={{
            backgroundColor: `${style.iconTextStyle.color}22`,
            color: style.iconTextStyle.color,
          }}
        >
          {announcement.type}
        </span>

        {/* DATE */}
        <span className="text-sm text-gray-500 flex items-center">
          <FaCalendarAlt className="mr-1" />
          {announcement.date}
        </span>
      </div>

      {/* ICON */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{
          background: `linear-gradient(135deg, ${style.iconTextStyle.color}22, ${style.iconTextStyle.color}44)`
        }}
      >
        <Icon
          className="text-xl"
          style={{ color: style.iconTextStyle.color }}
        />
      </div>

      {/* TITLE */}
      <h3 className="text-xl font-semibold mb-3 text-gray-900">
        {announcement.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-gray-600 mb-4">
        {announcement.description}
      </p>

      {/* CTA */}
      <button
        className="font-medium flex items-center"
        style={{ color: style.iconTextStyle.color }}
      >
        Learn More
        <FaArrowRight className="ml-2" />
      </button>
    </motion.div>
  );
}

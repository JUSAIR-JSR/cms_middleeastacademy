'use client';

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  FaClock,
  FaCertificate,
  FaBriefcase,
  FaArrowRight,
} from "react-icons/fa";
import { ICON_MAP } from "@/app/lib/iconRegistry";
import { getCourseStyle } from "@/app/lib/dynamicCourseStyle";

/* ✅ TYPESAFE ANIMATIONS */
const contentContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const contentItem: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

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
};

export default function CourseCard({ course }: { course: Course }) {
  const Icon = ICON_MAP[course.icon];
  const style = getCourseStyle(course.color, course.shade);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="premium-card p-8 hover-lift bg-white"
    >
      <motion.div variants={contentContainer}>
        {/* ICON */}
        <motion.div
          variants={contentItem}
          className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg"
          style={style.iconGradient}
        >
          <Icon className="text-white text-2xl" />
        </motion.div>

        {/* TITLE */}
        <motion.h3
          variants={contentItem}
          className="text-2xl font-semibold mb-4 text-gray-900 "
        >
          {course.title}
        </motion.h3>

        {/* DESCRIPTION */}
        <motion.p
          variants={contentItem}
          className="text-gray-600 mb-6 text-lg"
        >
          {course.description}
        </motion.p>

        {/* DETAILS */}
        <motion.div
          variants={contentContainer}
          className="space-y-3 mb-8"
        >
          <motion.div variants={contentItem} className="flex items-center">
            <FaClock className="mr-3" style={style.iconTextStyle} />
            <span>{course.duration}</span>
          </motion.div>

          <motion.div variants={contentItem} className="flex items-center">
            <FaCertificate className="mr-3" style={style.iconTextStyle} />
            <span>{course.certification}</span>
          </motion.div>

          <motion.div variants={contentItem} className="flex items-center">
            <FaBriefcase className="mr-3" style={style.iconTextStyle} />
            <span>{course.placement}</span>
          </motion.div>
        </motion.div>

        {/* BUTTON */}
        <motion.button
          variants={contentItem}
          className="btn-primary w-full flex items-center justify-center text-lg"
        >
          Enquire Now
          <FaArrowRight className="ml-2" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

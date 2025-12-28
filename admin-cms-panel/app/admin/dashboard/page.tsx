'use client';

import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

import { getCourses } from "@/app/api/courses.api";
import { getAnnouncements } from "@/app/api/announcements.api";
import { getMessageStats } from "@/app/api/messages.api";

import CourseCard from "../components/CourseCard";
import AnnouncementCard from "../components/AnnouncementCard";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { Course, Announcement } from "../types/content";

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);


const [stats, setStats] = useState<{
  total: number;
  unread: number;
} | null>(null);

useEffect(() => {
  getMessageStats().then(setStats).catch(() => {});
}, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseData, announcementData] = await Promise.all([
          getCourses(),
          getAnnouncements(),
        ]);

        setCourses(courseData);
        setAnnouncements(announcementData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <AdminNavbar />

      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="max-w-7xl mx-auto space-y-14">
          {/* HEADER */}

<div className="grid md:grid-cols-2 gap-6">
  <Card>
    <CardHeader>
      <CardTitle>Total Messages</CardTitle>
      <p className="text-3xl font-bold">{stats?.total ?? "-"}</p>
    </CardHeader>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>Unread</CardTitle>
      <p className="text-3xl font-bold text-red-600">
        {stats?.unread ?? "-"}
      </p>
    </CardHeader>
  </Card>
</div>


          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Admin Dashboard
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Live preview of courses and announcements
              </p>
            </CardHeader>
          </Card>

          {/* COURSES */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold">Recent Courses</h2>

            {loading ? (
              <div className="text-center py-10 text-gray-500">
                Loading courses...
              </div>
            ) : (
              <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.slice(0, 6).map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </motion.div>
            )}
          </section>

          {/* ANNOUNCEMENTS */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold">Latest Announcements</h2>

            {loading ? (
              <div className="text-center py-10 text-gray-500">
                Loading announcements...
              </div>
            ) : (
              <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {announcements.slice(0, 6).map((a) => (
                  <AnnouncementCard key={a._id} announcement={a} />
                ))}
              </motion.div>
            )}
          </section>

        </div>
      </main>
    </>
  );
}

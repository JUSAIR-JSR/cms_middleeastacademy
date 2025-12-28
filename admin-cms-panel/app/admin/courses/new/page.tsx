'use client';

import AdminNavbar from '../../components/AdminNavbar';
import CourseBuilder from "@/app/admin/components/CourseBuilder";

export default function AddCoursePage() {
  return (
    <>
      <AdminNavbar />
      <main className="p-10">
        <h1 className="text-3xl font-bold mb-6">Add New Course</h1>
      <CourseBuilder />
      </main>
    </>
  );
}

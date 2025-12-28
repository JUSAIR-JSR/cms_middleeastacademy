'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminNavbar from '../components/AdminNavbar';
import CourseTable from '../components/CourseTable';
import { getCourses } from '@/app/api/courses.api';

/* shadcn ui */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <AdminNavbar />

      {/* PAGE WRAPPER */}
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* HEADER CARD */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">
                  Courses
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage all professional courses available on the platform
                </p>
              </div>

              <Button asChild>
                <Link href="/admin/courses/new" className="flex items-center gap-2">
                  <Plus size={18} />
                  Add Course
                </Link>
              </Button>
            </CardHeader>
          </Card>

          {/* CONTENT */}
          <Card>
            <CardContent className="pt-6">
              {loading ? (
                <div className="text-center py-10 text-gray-500">
                  Loading courses...
                </div>
              ) : (
                <CourseTable courses={courses} refresh={fetchCourses} />
              )}
            </CardContent>
          </Card>

        </div>
      </main>
    </>
  );
}

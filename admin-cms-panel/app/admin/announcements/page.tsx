"use client";

import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { getAnnouncements } from "@/app/api/announcements.api";
import AnnouncementTable from "../components/AnnouncementTable";

/* shadcn */
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAnnouncements = async () => {
    try {
      const data = await getAnnouncements();
      setAnnouncements(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <>
      <AdminNavbar />

      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="max-w-7xl mx-auto space-y-8">

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold">
                Announcements
              </CardTitle>

              <Button asChild>
                <Link href="/admin/announcements/new" className="flex items-center gap-2">
                  <Plus size={18} />
                  Add Announcement
                </Link>
              </Button>
            </CardHeader>
          </Card>

          <Card>
            <CardContent className="pt-6">
              {loading ? (
                <div className="text-center py-10 text-gray-500">
                  Loading announcements...
                </div>
              ) : (
                <AnnouncementTable
                  announcements={announcements}
                  refresh={fetchAnnouncements}
                />
              )}
            </CardContent>
          </Card>

        </div>
      </main>
    </>
  );
}

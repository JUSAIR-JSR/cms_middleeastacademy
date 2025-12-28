'use client';

import { useParams, useRouter } from "next/navigation";
import AdminNavbar from "../../components/AdminNavbar";
import AnnouncementBuilder from "../../components/AnnouncementBuilder";
import { Button } from "@/components/ui/button";

export default function EditAnnouncementPage() {
  const { id } = useParams();
  const router = useRouter();

  if (!id || typeof id !== "string") {
    return null;
  }

  return (
    <>
      <AdminNavbar />

      <main className="p-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">
            Edit Announcement
          </h1>

          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
        </div>

        <AnnouncementBuilder announcementId={id} />
      </main>
    </>
  );
}

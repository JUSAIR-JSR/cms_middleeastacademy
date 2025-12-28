"use client";

import AdminNavbar from "../../components/AdminNavbar";
import AnnouncementBuilder from "../../components/AnnouncementBuilder";

export default function AddAnnouncementPage() {
  return (
    <>
      <AdminNavbar />
      <main className="p-10">
        <h1 className="text-3xl font-bold mb-6">Add Announcement</h1>
        <AnnouncementBuilder />
      </main>
    </>
  );
}

'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Megaphone,
  Mail,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";

import { getUnreadCount } from "@/app/api/messages.api";
import { Button } from "@/components/ui/button";
import { adminLogout } from "@/app/api/auth.api";

export default function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    getUnreadCount().then(setUnread).catch(() => {});
  }, []);

  const handleLogout = async () => {
    await adminLogout();
    router.replace("/");
  };

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
            A
          </div>
          <span className="font-semibold text-lg text-gray-900">
            Admin Panel
          </span>
        </Link>

        {/* NAV */}
        <nav className="flex items-center gap-2">
          <Button asChild variant={isActive("/admin/dashboard") ? "secondary" : "ghost"}>
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
          </Button>

          <Button asChild variant={isActive("/admin/courses") ? "secondary" : "ghost"}>
            <Link href="/admin/courses" className="flex items-center gap-2">
              <BookOpen size={18} />
              Courses
            </Link>
          </Button>

          <Button asChild variant={isActive("/admin/announcements") ? "secondary" : "ghost"}>
            <Link href="/admin/announcements" className="flex items-center gap-2">
              <Megaphone size={18} />
              Announcements
            </Link>
          </Button>

          {/* ✅ MESSAGES + BADGE */}
          <Button asChild variant={isActive("/admin/messages") ? "secondary" : "ghost"}>
            <Link href="/admin/messages" className="relative flex items-center gap-2">
              <Mail size={18} />
              Messages
              {unread > 0 && (
                <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full px-1.5">
                  {unread}
                </span>
              )}
            </Link>
          </Button>

          <Button
            variant="destructive"
            onClick={handleLogout}
            className="ml-2 flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </nav>
      </div>
    </header>
  );
}

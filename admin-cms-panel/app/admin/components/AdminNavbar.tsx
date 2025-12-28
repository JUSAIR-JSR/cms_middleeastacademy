'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Megaphone,
  Mail,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { getUnreadCount } from "@/app/api/messages.api";
import { Button } from "@/components/ui/button";
import { adminLogout } from "@/app/api/auth.api";

export default function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getUnreadCount().then(setUnread).catch(() => {});
  }, []);

  const handleLogout = async () => {
    await adminLogout();
    router.replace("/");
  };

  const isActive = (path: string) => pathname.startsWith(path);

  const NavItem = ({
    href,
    icon: Icon,
    label,
    badge,
  }: {
    href: string;
    icon: any;
    label: string;
    badge?: number;
  }) => (
    <Button
      asChild
      variant={isActive(href) ? "secondary" : "ghost"}
      className="justify-start"
      onClick={() => setOpen(false)}
    >
      <Link href={href} className="relative flex items-center gap-2">
        <Icon size={18} />
        <span className="hidden sm:inline">{label}</span>

        {badge && badge > 0 && (
          <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full px-1.5">
            {badge}
          </span>
        )}
      </Link>
    </Button>
  );

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
            A
          </div>
          <span className="font-semibold text-lg text-gray-900 hidden sm:inline">
            Admin Panel
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-2">
          <NavItem href="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem href="/admin/courses" icon={BookOpen} label="Courses" />
          <NavItem href="/admin/announcements" icon={Megaphone} label="Announcements" />
          <NavItem
            href="/admin/messages"
            icon={Mail}
            label="Messages"
            badge={unread}
          />

          <Button
            variant="destructive"
            onClick={handleLogout}
            className="ml-2 flex items-center gap-2"
          >
            <LogOut size={18} />
            <span className="hidden lg:inline">Logout</span>
          </Button>
        </nav>

        {/* MOBILE TOGGLE */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </Button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-2">
          <NavItem href="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem href="/admin/courses" icon={BookOpen} label="Courses" />
          <NavItem href="/admin/announcements" icon={Megaphone} label="Announcements" />
          <NavItem
            href="/admin/messages"
            icon={Mail}
            label="Messages"
            badge={unread}
          />

          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 justify-start"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      )}
    </header>
  );
}

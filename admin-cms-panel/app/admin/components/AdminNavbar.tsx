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
  ChevronDown,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

import { getUnreadCount } from "@/app/api/messages.api";
import { Button } from "@/components/ui/button";
import { adminLogout } from "@/app/api/auth.api";
import { cn } from "@/lib/utils";

export default function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [unread, setUnread] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    getUnreadCount().then(setUnread).catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      variant="ghost"
      className={cn(
        "justify-start h-10 px-4 transition-all duration-200 hover:bg-primary/10 hover:text-primary",
        isActive(href) && "bg-primary/10 text-primary font-semibold"
      )}
      onClick={() => setIsOpen(false)}
    >
      <Link href={href} className="relative flex items-center gap-3 group">
        <Icon size={20} className="transition-transform group-hover:scale-110" />
        <span className="text-sm font-medium">{label}</span>
        {badge && badge > 0 && (
          <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {badge}
          </span>
        )}
      </Link>
    </Button>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-lg border-b shadow-sm"
          : "bg-white border-b"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* LOGO */}
          <div className="flex items-center gap-2 lg:gap-3">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 lg:gap-3 group"
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold shadow-lg transition-transform group-hover:scale-105">
                <span className="text-lg">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg lg:text-xl text-gray-900 leading-tight">
                  Admin Panel
                </span>
                <span className="text-xs text-gray-500 hidden lg:block">
                  Management Dashboard
                </span>
              </div>
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavItem href="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavItem href="/admin/courses" icon={BookOpen} label="Courses" />
            <NavItem href="/admin/announcements" icon={Megaphone} label="Announcements" />
            <NavItem
              href="/admin/messages"
              icon={Mail}
              label="Messages"
              badge={unread}
            />
          </nav>

          {/* DESKTOP USER ACTIONS */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center gap-2 rounded-full px-3 py-2 hover:bg-gray-100"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <User size={18} className="text-primary" />
                </div>
                <ChevronDown size={16} className={cn(
                  "transition-transform",
                  userDropdownOpen && "rotate-180"
                )} />
              </Button>
              
              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 animate-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold text-sm">Admin User</p>
                    <p className="text-xs text-gray-500">admin@example.com</p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-none"
                  >
                    <LogOut size={18} className="mr-3" />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="flex lg:hidden items-center gap-2">
            {unread > 0 && (
              <div className="relative">
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="relative"
                >
                  <Link href="/admin/messages">
                    <Mail size={20} />
                    <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                      {unread}
                    </span>
                  </Link>
                </Button>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "transition-all duration-200",
                isOpen && "bg-gray-100"
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </Button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="lg:hidden border-t bg-white animate-in slide-in-from-top">
            <div className="py-4 space-y-1">
              <NavItem href="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
              <NavItem href="/admin/courses" icon={BookOpen} label="Courses" />
              <NavItem href="/admin/announcements" icon={Megaphone} label="Announcements" />
              <NavItem
                href="/admin/messages"
                icon={Mail}
                label="Messages"
                badge={unread}
              />
            </div>
            
            <div className="border-t pt-4 pb-2 px-1">
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <User size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Admin User</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
              </div>
              
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="w-full justify-center gap-3 py-3 font-medium"
              >
                <LogOut size={18} />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
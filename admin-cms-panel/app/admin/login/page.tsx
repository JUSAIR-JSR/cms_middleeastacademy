"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/* shadcn ui */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminGoogleLogin } from "@/app/api/auth.api";

declare global {
  interface Window {
    google: any;
  }
}

export default function AdminLogin() {
  const router = useRouter();

  useEffect(() => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: handleLogin,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-login-btn"),
      {
        theme: "outline",
        size: "large",
        width: 300,
      }
    );
  }, []);

  const handleLogin = async (response: any) => {
    try {
      await adminGoogleLogin(response.credential);
      router.push("/admin/dashboard");
    } catch {
      alert("Unauthorized admin account");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
      <Card className="w-[420px] shadow-2xl border-emerald-100/60 bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-4 pb-8 pt-10">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center border border-emerald-100">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl font-bold tracking-tight text-emerald-900">
            Admin Portal
          </CardTitle>
          <p className="text-center text-sm text-emerald-600/80 font-medium">
            Secure administrative access
          </p>
        </CardHeader>

        <CardContent className="pb-10">
          <div
            id="google-login-btn"
            className="flex justify-center rounded-lg p-1 hover:bg-emerald-50/50 transition-colors duration-300"
          />
        </CardContent>
      </Card>
    </div>
  );
}
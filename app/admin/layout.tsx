"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import { useAuth } from "@/lib/auth-context";
import { Loader2, ShieldCheck, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || profile?.role !== "ADMIN") {
        router.push("/");
      }
    }
  }, [user, profile, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse font-medium">Vérification des autorisations...</p>
        </div>
      </div>
    );
  }

  if (!user || profile?.role !== "ADMIN") {
    return null; // Will redirect via useEffect
  }

  const initials = profile?.full_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "AD";

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950">
        <AdminSidebar />
        <SidebarInset className="flex flex-col">
          {/* Admin Header Bar */}
          <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-white/80 dark:bg-slate-900/80 px-4 backdrop-blur shadow-sm transition-all md:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <h1 className="text-sm font-bold tracking-tight md:text-base">Espace Administrateur</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden text-right md:block">
                <p className="text-xs font-bold leading-none">{profile?.full_name}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Status: SuperAdmin</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground font-bold shadow-md border-2 border-white dark:border-slate-800">
                {initials}
              </div>
            </div>
          </header>
          
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 container-xl mx-auto max-w-7xl">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

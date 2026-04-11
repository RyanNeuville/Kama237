"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { 
  Users, 
  Home, 
  Clock, 
  MessageSquare, 
  TrendingUp,
  Activity,
  ArrowUpRight,
  Plus
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    properties: 0,
    pendingProperties: 0,
    unreadContacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      
      const [
        { count: userCount },
        { count: propertyCount },
        { count: pendingCount },
        { count: contactCount }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('properties').select('*', { count: 'exact', head: true }),
        supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'EN_ATTENTE'),
        supabase.from('site_contacts').select('*', { count: 'exact', head: true }).eq('is_read', false),
      ]);

      setStats({
        users: userCount || 0,
        properties: propertyCount || 0,
        pendingProperties: pendingCount || 0,
        unreadContacts: contactCount || 0,
      });
      setLoading(false);
    }

    fetchStats();
  }, []);

  const statItems = [
    {
      title: "Utilisateurs",
      value: stats.users,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      description: "Membres inscrits au total",
      href: "/admin/users"
    },
    {
      title: "Annonces Totales",
      value: stats.properties,
      icon: Home,
      color: "text-emerald-600",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      description: "Tous types et statuts confondus",
      href: "/admin/properties"
    },
    {
      title: "En Attente",
      value: stats.pendingProperties,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-100 dark:bg-amber-900/30",
      description: "Nécessitent une validation",
      href: "/admin/properties"
    },
    {
      title: "Messages Site",
      value: stats.unreadContacts,
      icon: MessageSquare,
      color: "text-purple-600",
      bg: "bg-purple-100 dark:bg-purple-900/30",
      description: "Nouveaux formulaires de contact",
      href: "/admin/contacts"
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-l-4 border-primary pl-4 py-2 bg-gradient-to-r from-primary/5 to-transparent rounded-r-lg">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Tableau de Bord</h2>
          <p className="text-muted-foreground font-medium italic">Surveillez l&apos;activité de Home237 en temps réel.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="px-3 py-1 bg-white dark:bg-slate-900 shadow-sm flex gap-2">
            <Activity className="h-4 w-4 text-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider">Mises à jour actives</span>
          </Badge>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statItems.map((item, index) => (
          <Link href={item.href} key={index} className="group">
            <Card className="hover:shadow-xl transition-all duration-300 border-border group-hover:border-primary/40 overflow-hidden relative">
              <div className={`absolute top-0 right-0 p-1 rounded-bl-xl ${item.bg}`}>
                 <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${item.bg}`}>
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                {loading ? (
                  <Skeleton className="h-10 w-20" />
                ) : (
                  <div className="text-4xl font-black tracking-tighter transition-transform group-hover:scale-110 origin-left duration-300">
                    {item.value}
                  </div>
                )}
                <p className="text-[10px] text-muted-foreground mt-4 font-bold uppercase tracking-tight opacity-70 group-hover:opacity-100 transition-opacity">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="grid gap-8 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-border shadow-md">
          <CardHeader className="border-b bg-muted/20">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                   <TrendingUp className="h-5 w-5 text-primary" /> Tendances
                </CardTitle>
                <CardDescription>Aperçu de la croissance hebdomadaire</CardDescription>
              </div>
              <Button size="sm" variant="ghost" className="text-xs font-bold">
                 Voir détails <ArrowUpRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-8 flex flex-col items-center justify-center min-h-[350px] bg-linear-to-b from-transparent to-primary/5">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
              <TrendingUp className="h-10 w-10 text-primary" />
            </div>
            <p className="text-muted-foreground font-medium text-center max-w-sm italic leading-relaxed">
              Les rapports détaillés de croissance et les graphiques d&apos;activité seront disponibles dès que la base de données aura accumulé plus de données historiques.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-md">
               <div className="p-4 rounded-xl border bg-white dark:bg-slate-900 text-center shadow-sm">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">Nouveaux ce mois</p>
                  <p className="text-2xl font-black text-primary mt-1">+12%</p>
               </div>
               <div className="p-4 rounded-xl border bg-white dark:bg-slate-900 text-center shadow-sm">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">Revenus Est.</p>
                  <p className="text-2xl font-black text-emerald-600 mt-1">CFA --</p>
               </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-border shadow-md overflow-hidden bg-slate-900 text-white dark:border-primary/20">
           <CardHeader className="bg-primary/90 text-white">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                 <Activity className="h-5 w-5" /> Actions Rapides
              </CardTitle>
              <CardDescription className="text-white/70">Gestion directe immédiate</CardDescription>
           </CardHeader>
           <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                 <Link href="/admin/properties">
                    <Button className="w-full justify-between h-14 bg-white/10 hover:bg-white/20 text-white border-none group px-6 text-base font-bold transition-all hover:translate-x-1" variant="outline">
                       Valider les annonces en attente
                       <Badge className="bg-amber-500 text-white border-none group-hover:scale-110 transition-transform">{stats.pendingProperties}</Badge>
                    </Button>
                 </Link>
                 <Link href="/admin/users">
                    <Button className="w-full justify-between h-14 bg-white/10 hover:bg-white/20 text-white border-none group px-6 text-base font-bold transition-all hover:translate-x-1" variant="outline">
                       Gérer les comptes utilisateurs
                       <Users className="h-5 w-5 opacity-50" />
                    </Button>
                 </Link>
                 <Link href="/admin/contacts">
                    <Button className="w-full justify-between h-14 bg-white/10 hover:bg-white/20 text-white border-none group px-6 text-base font-bold transition-all hover:translate-x-1" variant="outline">
                       Répondre aux contacts
                       <Badge className="bg-purple-500 text-white border-none group-hover:scale-110 transition-transform">{stats.unreadContacts}</Badge>
                    </Button>
                 </Link>
              </div>
              
              <div className="pt-6 border-t border-white/10">
                 <div className="p-5 rounded-2xl bg-linear-to-br from-primary/30 to-accent/30 border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="p-2 rounded-lg bg-white/10">
                          <Plus className="h-5 w-5 text-primary" />
                       </div>
                       <div>
                          <p className="text-sm font-black uppercase tracking-widest">Guide Rapide</p>
                          <p className="text-[11px] text-white/50">Astuces d&apos;administration</p>
                       </div>
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed font-medium italic">
                      &quot;N&apos;oubliez pas de vérifier régulièrement les annonces en attente pour garantir la qualité du contenu sur Home237.&quot;
                    </p>
                 </div>
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}

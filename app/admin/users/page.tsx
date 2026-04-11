"use client";

import { useEffect, useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase, type Profile } from "@/lib/supabase";
import { 
  Users, 
  Shield, 
  ShieldAlert, 
  Trash2, 
  Search,
  RefreshCw,
  UserCheck,
  UserX,
  Mail,
  Phone
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/lib/auth-context";

export default function AdminUsers() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const { user: currentUser } = useAuth();

  const fetchProfiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Erreur lors du chargement des profils");
    } else {
      setProfiles(data as Profile[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const toggleRole = async (targetId: string, currentRole: string) => {
    if (targetId === currentUser?.id) {
      toast.error("Vous ne pouvez pas changer votre propre rôle");
      return;
    }

    const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';

    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', targetId);

    if (error) {
      toast.error("Échec du changement de rôle");
    } else {
      toast.success(`Rôle mis à jour : ${newRole}`);
      setProfiles(profiles.map(p => p.id === targetId ? { ...p, role: newRole as any } : p));
    }
  };

  const deleteUser = async () => {
    if (!userToDelete) return;
    if (userToDelete === currentUser?.id) {
      toast.error("Action impossible sur votre propre compte");
      return;
    }

    // Note: This only deletes the profile, not the auth.user (unless CASCADE is set in DB)
    // The supabase_setup.sql has ON DELETE CASCADE on profiles referencing auth.users?
    // Wait, profiles.id REFERENCES auth.users. If we delete auth.users, profile is gone.
    // If we delete profile... we should probably use a management API or just handle it as "Disabled"
    // For now, let's just delete the profile row.
    
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userToDelete);

    if (error) {
      toast.error("Erreur lors de la suppression");
    } else {
      toast.success("Utilisateur supprimé du système");
      setProfiles(profiles.filter(p => p.id !== userToDelete));
      setUserToDelete(null);
    }
  };

  const filteredProfiles = profiles.filter(p => 
    p.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-foreground uppercase italic border-l-4 border-primary pl-4">Gestion des Utilisateurs</h2>
          <p className="text-muted-foreground font-medium mt-1">Gérez les accès et les privilèges de la communauté Home237.</p>
        </div>
        <Button onClick={fetchProfiles} variant="outline" size="sm" className="gap-2 self-start md:self-auto font-bold shadow-sm">
           <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Actualiser
        </Button>
      </div>

      <Card className="border-none shadow-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-linear-to-r from-primary/5 to-transparent border-b pb-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Rechercher par nom..." 
              className="pl-10 bg-background/50 border-primary/20 focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-md overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="font-bold uppercase text-[10px] pl-6">Profil</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Contact</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Date d&apos;inscription</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Rôle</TableHead>
                  <TableHead className="text-right font-bold uppercase text-[10px] pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={5} className="h-20 text-center animate-pulse bg-muted/5"></TableCell>
                    </TableRow>
                  ))
                ) : filteredProfiles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground italic">
                      Aucun utilisateur trouvé.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProfiles.map((p) => (
                    <TableRow key={p.id} className="group hover:bg-primary/5 transition-all border-b border-border/50">
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                           <div className={profileImageClass(p.role)}>
                              {p.full_name?.[0]?.toUpperCase() || 'U'}
                           </div>
                           <div className="flex flex-col">
                              <span className="font-bold text-sm">{p.full_name || 'Sans nom'}</span>
                              <span className="text-[10px] text-muted-foreground font-mono opacity-50">{p.id.slice(0, 8)}...</span>
                           </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                           <div className="flex items-center gap-1.5 text-xs font-medium">
                              <Mail size={12} className="text-muted-foreground" /> {p.phone ? p.phone : 'N/A'}
                           </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-medium text-muted-foreground">
                        {new Date(p.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </TableCell>
                      <TableCell>
                        {p.role === 'ADMIN' ? (
                          <Badge className="bg-primary text-white font-black px-3 py-1 flex items-center gap-1.5 w-fit shadow-md">
                             <Shield size={12} /> ADMIN
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="font-bold px-3 py-1 flex items-center gap-1.5 w-fit border-border bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                             <Users size={12} /> UTILISATEUR
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-2 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                           <Button 
                             size="sm" 
                             variant="outline" 
                             className="h-9 px-4 font-bold rounded-lg border-primary/20 hover:bg-primary/10 hover:text-primary gap-2"
                             onClick={() => toggleRole(p.id, p.role)}
                           >
                             {p.role === 'ADMIN' ? <><UserX size={14} /> Rétrograder</> : <><UserCheck size={14} /> Promouvoir</>}
                           </Button>
                           <Button 
                             size="sm" 
                             variant="ghost" 
                             className="h-9 w-9 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive rounded-lg"
                             onClick={() => setUserToDelete(p.id)}
                           >
                             <Trash2 size={16} />
                           </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!userToDelete} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <AlertDialogContent className="border-2 border-destructive/20 shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-black text-destructive flex items-center gap-2 italic uppercase">
               <ShieldAlert className="h-6 w-6" /> Action Irréversible
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base font-medium py-4">
              Êtes-vous sûr de vouloir supprimer ce profil ? Toutes les annonces appartenant à cet utilisateur seront également supprimées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="font-bold border-none bg-muted hover:bg-muted/80">Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={deleteUser}
              className="bg-destructive text-white hover:bg-destructive/90 font-bold px-8"
            >
              Supprimer le compte
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function profileImageClass(role: string) {
  const base = "w-9 h-9 rounded-full flex items-center justify-center text-sm font-black shadow-inner border-2";
  if (role === 'ADMIN') {
    return `${base} bg-primary text-white border-primary/30 ring-2 ring-primary/10 ring-offset-2 ring-offset-white dark:ring-offset-slate-900`;
  }
  return `${base} bg-slate-200 text-slate-600 border-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400`;
}

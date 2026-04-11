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
import { supabase, type DbProperty } from "@/lib/supabase";
import { 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Eye, 
  Filter,
  MoreHorizontal,
  Archive,
  RefreshCw,
  Search
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import Image from "next/image";

export default function AdminProperties() {
  const [properties, setProperties] = useState<DbProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

  const fetchProperties = async () => {
    setLoading(true);
    let query = supabase
      .from('properties')
      .select('*, profiles(*)')
      .order('created_at', { ascending: false });

    if (statusFilter !== "ALL") {
      query = query.eq('status', statusFilter);
    }

    const { data, error } = await query;

    if (error) {
      toast.error("Erreur lors du chargement des annonces");
    } else {
      setProperties(data as DbProperty[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, [statusFilter]);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('properties')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      toast.error("Échec de la mise à jour");
    } else {
      toast.success(`Statut mis à jour : ${newStatus}`);
      setProperties(properties.map(p => p.id === id ? { ...p, status: newStatus as any } : p));
    }
  };

  const deleteProperty = async () => {
    if (!propertyToDelete) return;

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', propertyToDelete);

    if (error) {
      toast.error("Erreur lors de la suppression");
    } else {
      toast.success("Annonce supprimée définitivement");
      setProperties(properties.filter(p => p.id !== propertyToDelete));
      setPropertyToDelete(null);
    }
  };

  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PUBLIE': return <Badge className="bg-emerald-500 hover:bg-emerald-600 font-bold px-3">Publié</Badge>;
      case 'EN_ATTENTE': return <Badge variant="outline" className="text-amber-500 border-amber-500 font-bold px-3 bg-amber-500/10">En Attente</Badge>;
      case 'ARCHIVE': return <Badge variant="secondary" className="font-bold px-3">Archivé</Badge>;
      default: return <Badge variant="ghost">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-foreground uppercase italic border-l-4 border-primary pl-4">Gestion des Annonces</h2>
          <p className="text-muted-foreground font-medium mt-1">Approuvez, archivez ou modérez les publications immobilières.</p>
        </div>
        <Button onClick={fetchProperties} variant="outline" size="sm" className="gap-2 self-start md:self-auto font-bold">
           <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Actualiser
        </Button>
      </div>

      <Card className="border-none shadow-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-linear-to-r from-primary/5 to-transparent border-b pb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher par titre ou propriétaire..." 
                className="pl-10 bg-background/50 border-primary/20 focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
               <Filter className="h-4 w-4 text-primary" />
               <select 
                 className="bg-background/50 border border-primary/20 rounded-md text-sm p-2 outline-hidden focus:ring-2 focus:ring-primary/20"
                 value={statusFilter}
                 onChange={(e) => setStatusFilter(e.target.value)}
               >
                 <option value="ALL">Tous les statuts</option>
                 <option value="PUBLIE">Publiés</option>
                 <option value="EN_ATTENTE">En Attente</option>
                 <option value="ARCHIVE">Archivés</option>
               </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-md overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[100px] font-bold uppercase text-[10px]">Aperçu</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Titre & Details</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Propriétaire</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Prix</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Statut</TableHead>
                  <TableHead className="text-right font-bold uppercase text-[10px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={6} className="h-20 text-center animate-pulse bg-muted/5"></TableCell>
                    </TableRow>
                  ))
                ) : filteredProperties.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground italic">
                      Aucune annonce trouvée.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProperties.map((property) => (
                    <TableRow key={property.id} className="group hover:bg-primary/5 transition-colors border-b border-border/50">
                      <TableCell>
                        <div className="relative h-12 w-16 rounded-lg overflow-hidden border border-border shadow-sm">
                          <Image
                            src={property.images?.[0] || '/placeholder.jpg'}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm line-clamp-1">{property.title}</span>
                          <span className="text-[10px] text-muted-foreground flex gap-2">
                             {property.property_type} • {property.city}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                           <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold">
                              {property.profiles?.full_name?.[0] || 'U'}
                           </div>
                           <span className="text-sm font-medium">{property.profiles?.full_name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-black text-sm">{property.price.toLocaleString()} CFA</TableCell>
                      <TableCell>{getStatusBadge(property.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-primary/10">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 p-2 font-medium">
                            <DropdownMenuLabel className="text-[10px] uppercase font-black text-muted-foreground px-2 py-1.5 opacity-50 tracking-widest">Contrôles Admin</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                               <a href={`/annonces/${property.id}`} target="_blank" className="flex items-center gap-2 cursor-pointer font-bold">
                                  <Eye className="h-4 w-4 text-blue-500" /> Voir sur le site
                               </a>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {property.status !== 'PUBLIE' && (
                              <DropdownMenuItem 
                                onClick={() => updateStatus(property.id, 'PUBLIE')}
                                className="text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50 cursor-pointer font-bold"
                              >
                                <CheckCircle className="mr-2 h-4 w-4" /> Publier
                              </DropdownMenuItem>
                            )}
                            {property.status !== 'ARCHIVE' && (
                              <DropdownMenuItem 
                                onClick={() => updateStatus(property.id, 'ARCHIVE')}
                                className="text-amber-600 focus:text-amber-600 focus:bg-amber-50 cursor-pointer font-bold"
                              >
                                <Archive className="mr-2 h-4 w-4" /> Archiver
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              onClick={() => setPropertyToDelete(property.id)}
                              className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer font-bold"
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!propertyToDelete} onOpenChange={(open) => !open && setPropertyToDelete(null)}>
        <AlertDialogContent className="border-2 border-destructive/20 shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-black text-destructive flex items-center gap-2 italic uppercase">
               <Trash2 className="h-6 w-6" /> Suppression Critique
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base font-medium py-4">
              Cette action est irréversible. L&apos;annonce ainsi que tous les messages associés seront définitivement effacés de la base de données.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="font-bold border-none bg-muted hover:bg-muted/80">Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={deleteProperty}
              className="bg-destructive text-white hover:bg-destructive/90 font-bold px-8"
            >
              Confirmer la suppression
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

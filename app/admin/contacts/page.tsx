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
import { supabase, type SiteContact } from "@/lib/supabase";
import { 
  Mail, 
  Phone, 
  Contact, 
  CheckCircle, 
  Trash2,
  Eye,
  Search,
  RefreshCw,
  Tag,
  AtSign
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AdminContacts() {
  const [contacts, setContacts] = useState<SiteContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<SiteContact | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('site_contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Erreur lors du chargement des contacts");
    } else {
      setContacts(data as SiteContact[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('site_contacts')
      .update({ is_read: true })
      .eq('id', id);

    if (error) {
      toast.error("Échec de la mise à jour");
    } else {
      setContacts(contacts.map(c => c.id === id ? { ...c, is_read: true } : c));
    }
  };

  const deleteContact = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const { error } = await supabase
      .from('site_contacts')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("Erreur lors de la suppression");
    } else {
      toast.success("Contact supprimé");
      setContacts(contacts.filter(c => c.id !== id));
      if (selectedContact?.id === id) setSelectedContact(null);
    }
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-foreground uppercase italic border-l-4 border-primary pl-4">Contacts Généraux</h2>
          <p className="text-muted-foreground font-medium mt-1">Gérez les demandes issues du formulaire de contact global du site.</p>
        </div>
        <Button onClick={fetchContacts} variant="outline" size="sm" className="gap-2 self-start md:self-auto font-bold shadow-sm">
           <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Actualiser
        </Button>
      </div>

      <Card className="border-none shadow-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-linear-to-r from-primary/5 to-transparent border-b pb-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Rechercher par nom, email ou sujet..." 
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
                  <TableHead className="font-bold uppercase text-[10px] pl-6 w-[200px]">Visiteur</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Sujet</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Message</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Reçu le</TableHead>
                  <TableHead className="text-right font-bold uppercase text-[10px] pr-6">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={5} className="h-20 text-center animate-pulse bg-muted/5"></TableCell>
                    </TableRow>
                  ))
                ) : filteredContacts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground italic">
                      Aucun formulaire de contact reçu.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContacts.map((c) => (
                    <TableRow 
                      key={c.id} 
                      className={`group hover:bg-primary/5 transition-all border-b border-border/50 cursor-pointer ${!c.is_read ? 'bg-primary/[0.03]' : ''}`}
                      onClick={() => {
                        setSelectedContact(c);
                        if (!c.is_read) markAsRead(c.id);
                      }}
                    >
                      <TableCell className="pl-6 py-4">
                        <div className="flex flex-col">
                           <span className={`text-sm ${!c.is_read ? 'font-black' : 'font-medium'}`}>{c.name}</span>
                           <span className="text-[10px] text-muted-foreground truncate max-w-[150px]">{c.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-tighter">
                           <Tag size={12} className="text-primary" />
                           <span className="line-clamp-1">{c.subject}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[300px]">
                        <p className={`text-xs truncate ${!c.is_read ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                           {c.message}
                        </p>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(c.created_at).toLocaleDateString('fr-FR')}
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-3">
                           {!c.is_read && (
                             <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                           )}
                           <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-primary hover:bg-primary/10 transition-transform active:scale-95">
                                 <Eye size={16} />
                              </Button>
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-8 w-8 text-destructive hover:bg-destructive/10 transition-transform active:scale-95"
                                onClick={(e) => deleteContact(c.id, e)}
                              >
                                 <Trash2 size={16} />
                              </Button>
                           </div>
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

      {/* Contact View Dialog */}
      <Dialog open={!!selectedContact} onOpenChange={(open) => !open && setSelectedContact(null)}>
        <DialogContent className="max-w-xl p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
          <div className="bg-slate-900 dark:bg-black p-8 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
             <div className="flex items-center gap-5 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-3xl font-black shadow-lg transform rotate-3">
                   {selectedContact?.name[0].toUpperCase()}
                </div>
                <div>
                   <DialogTitle className="text-3xl font-black italic uppercase tracking-tighter leading-none mb-1">Formulaire de Contact</DialogTitle>
                   <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">{selectedContact && new Date(selectedContact.created_at).toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'short' })}</p>
                </div>
             </div>
             <Contact className="absolute right-8 bottom-4 h-20 w-20 text-white/[0.03] -rotate-12" />
          </div>
          
          <div className="p-10 space-y-10 bg-white dark:bg-slate-950">
             <div className="flex flex-wrap gap-10 border-b border-border pb-10">
                <div className="space-y-2">
                   <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Expéditeur</p>
                   <p className="text-xl font-black">{selectedContact?.name}</p>
                </div>
                <div className="space-y-2">
                   <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Contact Direct</p>
                   <div className="flex flex-col gap-2">
                      <a href={`mailto:${selectedContact?.email}`} className="text-sm font-bold flex items-center gap-2 hover:text-primary transition-colors">
                         <AtSign size={14} className="text-primary" /> {selectedContact?.email}
                      </a>
                      {selectedContact?.phone && (
                        <a href={`tel:${selectedContact.phone}`} className="text-sm font-bold flex items-center gap-2 hover:text-primary transition-colors">
                           <Phone size={14} className="text-primary" /> {selectedContact.phone}
                        </a>
                      )}
                   </div>
                </div>
             </div>

             <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <Badge className="bg-primary/10 text-primary border-primary/20 font-black uppercase tracking-widest text-[10px] px-3 py-1">SUJET</Badge>
                   <p className="text-xl font-black italic">{selectedContact?.subject}</p>
                </div>
                
                <div className="relative pt-6">
                   <div className="absolute top-0 left-0 text-primary/10 text-6xl font-serif">&quot;</div>
                   <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-border italic text-lg leading-relaxed text-foreground font-medium relative z-10 shadow-inner">
                      {selectedContact?.message}
                   </div>
                </div>
             </div>
             
             <div className="flex justify-between items-center pt-6">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">
                   <CheckCircle className="h-4 w-4 text-emerald-500" /> Lu par l&apos;administration
                </div>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] text-[10px] px-12 h-14 rounded-2xl shadow-xl hover:shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95" onClick={() => setSelectedContact(null)}>
                   Fermer la vue
                </Button>
             </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

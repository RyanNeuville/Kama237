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
import { supabase, type Message } from "@/lib/supabase";
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  Trash2,
  Eye,
  Search,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('messages')
      .select('*, properties(id, title)')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Erreur lors du chargement des messages");
    } else {
      setMessages(data as Message[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('id', id);

    if (error) {
      toast.error("Échec de la mise à jour");
    } else {
      setMessages(messages.map(m => m.id === id ? { ...m, is_read: true } : m));
    }
  };

  const deleteMessage = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("Erreur lors de la suppression");
    } else {
      toast.success("Message supprimé");
      setMessages(messages.filter(m => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    }
  };

  const filteredMessages = messages.filter(m => 
    m.sender_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.sender_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.properties?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-foreground uppercase italic border-l-4 border-primary pl-4">Demandes d&apos;Annonces</h2>
          <p className="text-muted-foreground font-medium mt-1">Gérez les demandes directes envoyées aux propriétaires.</p>
        </div>
        <Button onClick={fetchMessages} variant="outline" size="sm" className="gap-2 self-start md:self-auto font-bold shadow-sm">
           <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Actualiser
        </Button>
      </div>

      <Card className="border-none shadow-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-linear-to-r from-primary/5 to-transparent border-b pb-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Rechercher par expéditeur ou annonce..." 
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
                  <TableHead className="font-bold uppercase text-[10px] pl-6 w-[200px]">Expéditeur</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Concerne l&apos;annonce</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Aperçu du message</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Date</TableHead>
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
                ) : filteredMessages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground italic">
                      Aucun message trouvé.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMessages.map((m) => (
                    <TableRow 
                      key={m.id} 
                      className={`group hover:bg-primary/5 transition-all border-b border-border/50 cursor-pointer ${!m.is_read ? 'bg-primary/[0.03]' : ''}`}
                      onClick={() => {
                        setSelectedMessage(m);
                        if (!m.is_read) markAsRead(m.id);
                      }}
                    >
                      <TableCell className="pl-6 py-4">
                        <div className="flex flex-col">
                           <span className={`text-sm ${!m.is_read ? 'font-black' : 'font-medium'}`}>{m.sender_name}</span>
                           <span className="text-[10px] text-muted-foreground truncate max-w-[150px]">{m.sender_email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                           <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 font-bold uppercase text-[10px] px-2">
                             Annonce
                           </Badge>
                           <span className="text-xs font-bold line-clamp-1">{m.properties?.title || 'Annonce supprimée'}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[300px]">
                        <p className={`text-xs truncate ${!m.is_read ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                           {m.content}
                        </p>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(m.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-3">
                           {!m.is_read && (
                             <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                           )}
                           <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-primary hover:bg-primary/10">
                                 <Eye size={16} />
                              </Button>
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                onClick={(e) => deleteMessage(m.id, e)}
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

      {/* Message View Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        <DialogContent className="max-w-xl p-0 overflow-hidden border-none shadow-2xl">
          <div className="bg-primary p-6 text-white relative">
             <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-black">
                   {selectedMessage?.sender_name[0].toUpperCase()}
                </div>
                <div>
                   <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter">Détails du Message</DialogTitle>
                   <p className="text-white/70 text-sm font-medium">Reçu le {selectedMessage && new Date(selectedMessage.created_at).toLocaleString('fr-FR')}</p>
                </div>
             </div>
             <MessageSquare className="absolute right-6 top-6 h-12 w-12 text-white/10" />
          </div>
          
          <div className="p-8 space-y-8 bg-slate-50 dark:bg-slate-900">
             <div className="grid grid-cols-2 gap-8 pt-2">
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-primary uppercase tracking-widest">De</p>
                   <p className="text-base font-bold flex items-center gap-2">
                      {selectedMessage?.sender_name}
                   </p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-primary uppercase tracking-widest">Contact</p>
                   <div className="flex flex-col gap-1">
                      <a href={`mailto:${selectedMessage?.sender_email}`} className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors">
                         <Mail size={14} /> {selectedMessage?.sender_email}
                      </a>
                      {selectedMessage?.sender_phone && (
                        <a href={`tel:${selectedMessage.sender_phone}`} className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors">
                           <Phone size={14} /> {selectedMessage.sender_phone}
                        </a>
                      )}
                   </div>
                </div>
             </div>

             <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-border shadow-sm">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-3">Concernant l&apos;annonce</p>
                <div className="flex items-center justify-between">
                   <p className="text-lg font-black italic">{selectedMessage?.properties?.title || 'Annonce Supprimée'}</p>
                   <Button size="sm" variant="ghost" asChild className="text-primary font-black uppercase text-[10px]">
                      <a href={`/annonces/${selectedMessage?.property_id}`} target="_blank">Voir l&apos;annonce <Eye className="ml-2 h-3 w-3" /></a>
                   </Button>
                </div>
             </div>

             <div className="space-y-3">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                   <MessageSquare className="h-3 w-3" /> Message
                </p>
                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 italic leading-relaxed text-foreground font-medium">
                   &quot;{selectedMessage?.content}&quot;
                </div>
             </div>
             
             <div className="flex justify-end pt-4 border-t border-border">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs px-10 rounded-xl" onClick={() => setSelectedMessage(null)}>
                   Fermer
                </Button>
             </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

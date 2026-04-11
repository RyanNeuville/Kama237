"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, loading, signOut } = useAuth();

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Annonces", href: "/annonces" },
    { name: "Publier", href: "/publier" },
    { name: "À propos", href: "/a-propos" },
    { name: "Contact", href: "/contact" },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
    router.refresh();
  };

  const displayName = profile?.full_name || user?.email?.split('@')[0] || '';
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center text-3xl justify-center font-bold">
              <Image
                src="/h237.png"
                alt="H237 Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-foreground tracking-tight font-extrabold mt-1">
                237
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = link.href === "/" 
                ? pathname === "/" 
                : pathname.startsWith(link.href);
              
              return isActive ? (
                <Button
                  key={link.name}
                  variant="default"
                  asChild
                  className="bg-primary hover:bg-black/90 text-white cursor-pointer"
                >
                  <Link href={link.href}>{link.name}</Link>
                </Button>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-foreground hover:text-primary transition font-medium"
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {loading ? (
              <div className="w-24 h-9 bg-secondary animate-pulse rounded-md" />
            ) : user ? (
              <>
                <Link href="/profil" className="flex items-center gap-2 hover:opacity-80 transition">
                  <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-sm font-semibold text-primary">
                    {initials || <User size={16} />}
                  </div>
                  <span className="text-sm font-medium text-foreground max-w-[120px] truncate">
                    {displayName}
                  </span>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="gap-1"
                >
                  <LogOut size={16} />
                  <span className="hidden lg:inline">Déconnexion</span>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/auth/signin">Connexion</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/auth/signup">S&apos;inscrire</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <div className="flex flex-col gap-4 pt-4 px-4">
              {navLinks.map((link) => {
                const isActive = link.href === "/" 
                  ? pathname === "/" 
                  : pathname.startsWith(link.href);
                return (
                   <Link
                    key={link.name}
                    href={link.href}
                    className={`text-foreground hover:text-primary transition font-medium ${
                      isActive ? "text-primary font-bold" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-2 mt-4">
                {loading ? (
                  <div className="h-10 bg-secondary animate-pulse rounded-md" />
                ) : user ? (
                  <>
                    {profile?.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-3 py-2 text-primary font-bold"
                        onClick={() => setIsOpen(false)}
                      >
                        <ShieldCheck size={18} />
                        Dashboard Admin
                      </Link>
                    )}
                    <Link
                      href="/profil"
                      className="flex items-center gap-3 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-sm font-semibold text-primary">
                        {initials || <User size={16} />}
                      </div>
                      <span className="font-medium text-foreground">{displayName}</span>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut size={16} />
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                        Connexion
                      </Link>
                    </Button>
                    <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                      <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                        S&apos;inscrire
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary dark:bg-slate-950 text-white mt-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center text-3xl font-bold mb-4">
              <Image
                src="/h237.png"
                alt="Home237 Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-white tracking-tight font-extrabold mt-1">
                237
              </span>
            </div>
            <p className="text-sm text-gray-200">
              Trouve ta maison au 237 – Facile, rapide, sérieux
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Liens</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-200 hover:text-white transition"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/annonces"
                  className="text-gray-200 hover:text-white transition"
                >
                  Annonces
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-200 hover:text-white transition"
                >
                  Publier
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-gray-200 hover:text-white transition"
                >
                  CGU
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-200 hover:text-white transition"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-200 hover:text-white transition"
                >
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Nous suivre</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-200 hover:text-white transition"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-200 hover:text-white transition"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-200 hover:text-white transition"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-200 hover:text-white transition"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-400 pt-8 text-center text-sm text-gray-200">
          <p>Home237 © {currentYear}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

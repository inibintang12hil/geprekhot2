import React, { useState, useEffect } from "react";
import { Flame, Mail, Instagram, Facebook, ArrowUp, Phone, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { fetchSettings, DbSettings } from "../lib/supabase";

const FOOTER_NAV = [
  { href: "#home", label: "Home" },
  { href: "#tentang", label: "Tentang Kami" },
  { href: "#menu", label: "Menu Produk" },
  { href: "#keunggulan", label: "Keunggulan" },
  { href: "#testimoni", label: "Testimoni" },
  { href: "#faq", label: "FAQ" },
  { href: "#lokasi", label: "Lokasi & Kontak" },
];

export default function Footer() {
  const [settings, setSettings] = useState<DbSettings>({
    id: 1,
    logo: "GeprekHot",
    no_wa: "6287864802104",
    email: "halo@geprekhot.com",
    alamat: "Jl. Merapi Membara No. 88, Yogyakarta, Indonesia",
    jam_layanan: "Setiap Hari, 10:00 - 21:00 WIB",
    maps_embed: ""
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await fetchSettings();
        setSettings(data);
      } catch (err) {
        console.error("Failed loading footer settings:", err);
      }
    }
    loadSettings();
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.slice(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const cleanWaNumber = settings.no_wa.replace(/[^0-9]/g, "");
  const formattedWaDisplay = settings.no_wa.startsWith("62") 
    ? "0" + settings.no_wa.substring(2)
    : settings.no_wa;

  return (
    <footer className="bg-white text-gray-600 pt-20 pb-8 relative overflow-hidden border-t border-red-50" id="footer">
      
      {/* Decorative red glowing circle in background */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-brand-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-red-50">
          
          {/* Logo & Brand Pitch (Column 1-4) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, "#home")}
              className="flex items-center gap-2 font-display text-2xl font-black tracking-tight text-gray-900 mb-6"
              id="footer-logo"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-primary text-white shadow-md">
                <Flame className="w-6 h-6 fill-current" />
              </span>
              <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                {settings.logo}
              </span>
            </a>
            <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed mb-6">
              Landing page premium UMKM Ayam Geprek dengan cita rasa pedas membara yang selalu diracik fresh-to-order setiap hari. Nikmati kepuasan crispy dan pedas hakiki!
            </p>
            {/* Social handles */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-red-50 hover:bg-brand-primary text-brand-primary hover:text-white flex items-center justify-center border border-red-100 transition-all hover:scale-105"
                title="Instagram"
                id="footer-social-ig"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-red-50 hover:bg-brand-primary text-brand-primary hover:text-white flex items-center justify-center border border-red-100 transition-all hover:scale-105"
                title="Facebook"
                id="footer-social-fb"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${cleanWaNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-green-50 hover:bg-green-600 text-green-600 hover:text-white flex items-center justify-center border border-green-100 transition-all hover:scale-105"
                title="WhatsApp"
                id="footer-social-wa"
              >
                <Phone className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Quick Navigation (Column 5-8) */}
          <div className="lg:col-span-3 lg:col-start-6">
            <h4 className="font-display text-sm font-black text-gray-900 uppercase tracking-wider mb-6">
              Navigasi Menu
            </h4>
            <ul className="space-y-3.5 text-sm" id="footer-nav-list">
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-gray-500 hover:text-brand-primary transition-colors inline-block py-1 font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Summary (Column 9-12) */}
          <div className="lg:col-span-4 lg:col-start-9">
            <h4 className="font-display text-sm font-black text-gray-900 uppercase tracking-wider mb-6">
              Hubungi Outlet
            </h4>
            <ul className="space-y-4 text-xs sm:text-sm text-gray-500" id="footer-contact-list">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider">Pemesanan WhatsApp</span>
                  <a
                    href={`https://wa.me/${cleanWaNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-primary font-bold text-gray-900 transition-colors"
                  >
                    {formattedWaDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider">Alamat Resto</span>
                  <span className="text-gray-900 font-medium">
                    {settings.alamat}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider">Email Admin</span>
                  <a href={`mailto:${settings.email}`} className="hover:text-brand-primary text-gray-900 font-medium transition-colors">
                    {settings.email}
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Copyright text */}
          <p className="font-sans text-xs text-gray-400 text-center sm:text-left">
            Copyright © {new Date().getFullYear()} <span className="text-gray-700 font-semibold">{settings.logo}</span>. All rights reserved. Made for premium Indonesian culinary experience.
          </p>

          {/* Scroll to Top Button */}
          <button
            onClick={handleScrollToTop}
            className="group flex items-center justify-center w-10 h-10 rounded-full bg-red-50 hover:bg-brand-primary border border-red-100 text-brand-primary hover:text-white transition-all shadow-md hover:-translate-y-1"
            title="Kembali ke atas"
            id="footer-scroll-top-btn"
          >
            <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
          </button>

        </div>

      </div>
    </footer>
  );
}

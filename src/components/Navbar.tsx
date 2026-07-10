import React, { useState, useEffect } from "react";
import { Menu, X, Flame } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { fetchSettings } from "../lib/supabase";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#tentang", label: "Tentang Kami" },
  { href: "#menu", label: "Menu" },
  { href: "#keunggulan", label: "Keunggulan" },
  { href: "#testimoni", label: "Testimoni" },
  { href: "#faq", label: "FAQ" },
  { href: "#lokasi", label: "Lokasi" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [logoName, setLogoName] = useState("GeprekHot");

  // Track scrolling to add glassmorphism effect
  useEffect(() => {
    async function loadLogoName() {
      try {
        const data = await fetchSettings();
        if (data && data.logo) {
          setLogoName(data.logo);
        }
      } catch (err) {
        console.error("Failed loading logo in Navbar:", err);
      }
    }
    loadLogoName();

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section based on scroll position
      const sections = NAV_LINKS.map((link) => link.href.slice(1));
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.slice(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsOpen(false);
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-red-100 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight"
            id="nav-logo"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-primary text-white shadow-md shadow-brand-primary/20">
              <Flame className="w-6 h-6 animate-pulse" />
            </span>
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              {logoName}
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`font-sans text-sm font-medium transition-colors hover:text-brand-primary relative py-1 ${
                    activeSection === link.href.slice(1)
                      ? "text-brand-primary"
                      : "text-gray-600"
                  }`}
                  id={`nav-link-${link.href.slice(1)}`}
                >
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-brand-primary hover:bg-red-50 transition-colors"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 h-screen w-screen bg-white/98 backdrop-blur-xl z-[100] flex flex-col md:hidden"
            id="mobile-nav-container"
          >
            {/* Overlay Header */}
            <div className="flex justify-between items-center px-4 py-4 border-b border-red-50/80">
              {/* Logo */}
              <a
                href="#home"
                onClick={(e) => handleLinkClick(e, "#home")}
                className="flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-primary text-white shadow-md shadow-brand-primary/20">
                  <Flame className="w-6 h-6" />
                </span>
                <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                  {logoName}
                </span>
              </a>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-gray-600 hover:text-brand-primary hover:bg-red-50 transition-colors"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Overlay Links */}
            <div className="flex-1 flex flex-col justify-start items-start px-6 pt-3 pb-8 space-y-4 w-full">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.04, duration: 0.3 }}
                  className={`text-lg sm:text-xl font-semibold tracking-wide transition-colors py-2 text-left w-full block border-b border-dashed border-red-100 last:border-none ${
                    activeSection === link.href.slice(1)
                      ? "text-brand-primary"
                      : "text-gray-700 hover:text-brand-primary"
                  }`}
                  id={`mobile-nav-link-${link.href.slice(1)}`}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>


          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

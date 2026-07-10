import React from "react";
import { Flame, Star, ShoppingCart, ChevronRight, MessageSquare, Award, Clock } from "lucide-react";
import { motion } from "motion/react";
import { HERO_IMAGE } from "../data";

export default function Hero() {
  const handleScrollToMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById("menu");
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

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden bg-white"
    >
      {/* Decorative Ornaments (Orbit rings & patterned shapes) */}
      <div className="absolute top-20 right-[-10%] w-[50vw] h-[50vw] rounded-full border border-red-100 pointer-events-none hidden lg:block" />
      <div className="absolute top-40 right-[5%] w-[35vw] h-[35vw] rounded-full border-2 border-dashed border-red-200/50 pointer-events-none hidden lg:block animate-[spin_120s_linear_infinite]" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
            
            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-brand-primary font-bold text-xs self-center lg:self-start mb-6"
              id="hero-badge"
            >
              <Flame className="w-4 h-4 fill-brand-primary text-brand-primary animate-pulse" />
              <span>Ayam Geprek Terlezat di Indonesia</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-gray-900"
              id="hero-title"
            >
              Ayam Geprek <span className="text-brand-primary relative">Pedas</span> yang Bikin <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">Ketagihan</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 font-sans text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              id="hero-subtitle"
            >
              Crispy di luar, juicy di dalam, dengan sambal ulek khas premium yang diracik segar setiap hari. Pilih sendiri level pedas favoritmu!
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start items-center"
              id="hero-actions"
            >
              <a
                href="https://wa.me/6287864802104"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-8 py-4 rounded-full bg-brand-primary hover:bg-brand-hover text-white font-bold tracking-wide shadow-xl shadow-brand-primary/20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                id="hero-btn-primary"
              >
                <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
                Pesan Sekarang
              </a>
              <button
                onClick={handleScrollToMenu}
                className="group flex items-center gap-1 px-8 py-4 rounded-full bg-white hover:bg-red-50 text-gray-800 hover:text-brand-primary font-bold border border-gray-200 hover:border-red-100 shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
                id="hero-btn-secondary"
              >
                Lihat Menu
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-brand-primary group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Quick trust metrics below hero text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 grid grid-cols-3 gap-4 border-t border-red-50 pt-8 max-w-md mx-auto lg:mx-0"
              id="hero-trust-metrics"
            >
              <div className="text-center lg:text-left">
                <span className="block font-display text-2xl font-black text-gray-900">100%</span>
                <span className="block text-xs font-medium text-gray-500 mt-0.5">Bahan Halal</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block font-display text-2xl font-black text-gray-900">1–10</span>
                <span className="block text-xs font-medium text-gray-500 mt-0.5">Level Pedas</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block font-display text-2xl font-black text-gray-900">4.9★</span>
                <span className="block text-xs font-medium text-gray-500 mt-0.5">Rating Google</span>
              </div>
            </motion.div>

          </div>

          {/* Hero Right Visuals */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Background design accents similar to Foodi design */}
            <div className="absolute w-[80%] h-[80%] bg-gradient-to-tr from-brand-secondary/10 to-brand-accent/5 rounded-full blur-2xl pointer-events-none" />
            
            {/* Orange diagonal-striped circle from reference */}
            <div className="absolute right-[5%] top-[10%] w-24 h-24 rounded-full bg-brand-secondary/10 flex items-center justify-center pointer-events-none hidden md:flex">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-secondary to-brand-accent opacity-20" />
            </div>

            {/* Main Interactive Floating Food Plate Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-72 sm:w-96 lg:w-[420px] aspect-square"
              id="hero-food-container"
            >
              <div className="w-full h-full relative animate-float-smooth">
                {/* Subtle outer glowing border */}
                <div className="absolute inset-0 rounded-full bg-brand-primary/10 blur-xl animate-pulse" />

                {/* The Chicken Plate Image */}
                <img
                  src={HERO_IMAGE}
                  alt="Ayam Geprek Crispy Premium dengan Sambal Merah"
                  className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white relative z-10"
                  referrerPolicy="no-referrer"
                  id="hero-main-image"
                />

                {/* Floating Rating Card Overlay (modeling the design reference exactly) */}
                <motion.div
                  initial={{ opacity: 0, x: -30, y: 30 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute bottom-6 left-[-10%] sm:left-[-5%] bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-red-50 flex items-center gap-3 z-20"
                  id="hero-floating-rating"
                >
                  <div className="flex -space-x-2">
                    <img
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80&h=80"
                      alt="User avatar"
                      referrerPolicy="no-referrer"
                    />
                    <img
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80&h=80"
                      alt="User avatar"
                      referrerPolicy="no-referrer"
                    />
                    <img
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=80&h=80"
                      alt="User avatar"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-display text-xs font-bold text-gray-800">Ulasan Pelanggan</h4>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="flex text-yellow-400">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span className="font-sans text-xs font-black text-gray-800">4.9</span>
                      <span className="font-sans text-[10px] text-gray-400">(10k+ Ulasan)</span>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Fast Delivery Overlay */}
                <motion.div
                  initial={{ opacity: 0, x: 30, y: -30 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute top-10 right-[-5%] bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-red-50 flex items-center gap-3 z-20 hidden sm:flex"
                  id="hero-floating-speed"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-brand-secondary shadow-inner">
                    <Clock className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-display text-xs font-bold text-gray-800">Fresh & Cepat</h4>
                    <span className="font-sans text-[10px] text-gray-500">10-15 Menit Jadi</span>
                  </div>
                </motion.div>

              </div>
            </motion.div>

          </div>

        </div>
      </div>

      {/* Styled vertical bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}

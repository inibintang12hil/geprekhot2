import { useState, useEffect } from "react";
import { Flame } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TentangKami from "./components/TentangKami";
import MenuSection from "./components/MenuSection";
import Keunggulan from "./components/Keunggulan";
import Testimoni from "./components/Testimoni";
import FAQSection from "./components/FAQSection";
import LokasiDanKontak from "./components/LokasiDanKontak";
import Footer from "./components/Footer";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Simulated smooth loading progress
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center p-4"
            id="page-loader"
          >
            <div className="flex flex-col items-center max-w-sm w-full">
              {/* Spinning / Pulsing Glow Logo Container */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-20 h-20 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-2xl shadow-brand-primary/30 mb-6 relative"
              >
                <div className="absolute inset-0 rounded-full bg-brand-primary/20 animate-ping" />
                <Flame className="w-10 h-10 animate-pulse fill-current" />
              </motion.div>

              {/* Brand Title */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="font-display text-3xl font-black tracking-tight text-gray-900 mb-2 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent"
              >
                GeprekHot
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="font-sans text-xs text-gray-400 font-bold uppercase tracking-widest mb-8 text-center"
              >
                Cita Rasa Pedas Membara
              </motion.p>

              {/* Custom Elegant Progress Bar */}
              <div className="w-48 h-1 bg-red-50 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative min-h-screen overflow-x-hidden bg-brand-bg font-sans selection:bg-brand-primary selection:text-white">
        {/* Premium Sticky Header */}
        <Navbar />

        <main>
          {/* Home / Hero Section with float and orbits */}
          <Hero />

          {/* Tentang Kami Section detailing core kitchen story */}
          <TentangKami />

          {/* Interactive Menu / Produk Section with dynamic level selectors */}
          <MenuSection />

          {/* Keunggulan Bento Grid showcasing 6 features */}
          <Keunggulan />

          {/* Testimonial Section showcasing 6 organic reviews */}
          <Testimoni />

          {/* Animated Accordion FAQ Section */}
          <FAQSection />

          {/* Google Maps and Contact cards side-by-side */}
          <LokasiDanKontak />
        </main>

        {/* Premium Footing Section */}
        <Footer />
      </div>
    </>
  );
}

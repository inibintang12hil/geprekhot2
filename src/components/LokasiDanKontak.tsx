import { useState, useEffect } from "react";
import { MapPin, Phone, Clock, Mail, Instagram, Facebook, Youtube, Share2 } from "lucide-react";
import { motion } from "motion/react";
import { fetchSettings, DbSettings } from "../lib/supabase";

function getEmbedUrl(embedStr: string): string {
  if (!embedStr) return "";
  if (embedStr.trim().startsWith("<iframe")) {
    const match = embedStr.match(/src=["']([^"']+)["']/i);
    if (match && match[1]) {
      return match[1].replace(/&amp;/g, "&");
    }
  }
  return embedStr;
}

export default function LokasiDanKontak() {
  const [settings, setSettings] = useState<DbSettings>({
    id: 1,
    logo: "GeprekHot",
    no_wa: "6287864802104",
    email: "halo@geprekhot.com",
    alamat: "Jl. Merapi Membara No. 88, Yogyakarta, Indonesia",
    jam_layanan: "Setiap Hari, 10:00 - 21:00 WIB",
    maps_embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.037148565158!2d110.3758362!3d-7.7858971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a599bd3bd0b13%3A0x643cf7097c55209c!2sYogyakarta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        setIsLoading(true);
        const data = await fetchSettings();
        setSettings(data);
      } catch (err) {
        console.error("Failed loading settings:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, []);

  const cleanWaNumber = settings.no_wa.replace(/[^0-9]/g, "");
  const formattedWaDisplay = settings.no_wa.startsWith("62") 
    ? "0" + settings.no_wa.substring(2)
    : settings.no_wa;

  return (
    <section
      id="lokasi"
      className="py-24 relative overflow-hidden bg-white"
    >
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-8 bg-brand-primary rounded-full" />
            <span className="text-brand-primary text-xs font-black uppercase tracking-widest">Kunjungi Kami</span>
            <div className="h-1 w-8 bg-brand-primary rounded-full" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Lokasi & <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">Kontak Hubung</span>
          </h2>
          <p className="mt-4 font-sans text-sm text-gray-600">
            Temukan kami di google maps atau hubungi langsung layanan customer service online kami untuk pemesanan cepat dan katering acara.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch" id="lokasi-grid-container">
          
          {/* Contact details card (Left Side - 5 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-white rounded-[32px] p-8 border border-red-50 shadow-xl flex flex-col justify-between"
            id="kontak-info-card"
          >
            <div>
              <h3 className="font-display text-xl font-extrabold text-gray-900 mb-2">
                Kontak {settings.logo}
              </h3>
              <p className="font-sans text-xs text-gray-500 mb-8 leading-relaxed">
                Kami siap melayani kebutuhan perut Anda setiap hari. Hubungi kontak resmi kami di bawah ini untuk respon kilat.
              </p>

              {/* Contact Icons List */}
              <div className="space-y-8 mt-4">
                
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${cleanWaNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-green-50/20 hover:bg-green-50/60 border border-green-50/50 hover:border-green-100 transition-all duration-200 shadow-sm"
                  id="kontak-whatsapp"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center border border-green-100 group-hover:scale-105 transition-transform shadow-sm">
                    <Phone className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-display text-[10px] font-black text-green-700 uppercase tracking-widest">Pemesanan WhatsApp</h4>
                    <span className="block font-sans text-base font-extrabold text-gray-900 mt-1 group-hover:text-green-600 transition-colors">
                      {formattedWaDisplay}
                    </span>
                  </div>
                </a>

                {/* Operational Hours */}
                <div 
                  className="flex items-start gap-4 p-4 rounded-2xl bg-red-50/20 border border-red-50/50 shadow-sm" 
                  id="kontak-hours"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-red-50 text-brand-primary flex items-center justify-center border border-red-100 shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-[10px] font-black text-brand-primary uppercase tracking-widest">Jam Operasional</h4>
                    <span className="block font-sans text-sm font-bold text-gray-900 mt-1">
                      {settings.jam_layanan}
                    </span>
                  </div>
                </div>

                {/* Address */}
                <div 
                  className="flex items-start gap-4 p-4 rounded-2xl bg-orange-50/20 border border-orange-50/50 shadow-sm" 
                  id="kontak-address"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-orange-50 text-brand-secondary flex items-center justify-center border border-orange-100 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-[10px] font-black text-brand-secondary uppercase tracking-widest">Alamat Resto</h4>
                    <span className="block font-sans text-sm font-bold text-gray-900 mt-1 leading-relaxed">
                      {settings.alamat}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <a
                  href={`mailto:${settings.email}`}
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-yellow-50/20 hover:bg-yellow-50/50 border border-yellow-50/50 hover:border-yellow-100 transition-all duration-200 shadow-sm"
                  id="kontak-email"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center border border-yellow-100 group-hover:scale-105 transition-transform shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-[10px] font-black text-yellow-700 uppercase tracking-widest">Email Layanan</h4>
                    <span className="block font-sans text-sm font-bold text-gray-900 mt-1 group-hover:text-brand-primary transition-colors">
                      {settings.email}
                    </span>
                  </div>
                </a>

              </div>
            </div>

            {/* Social Media Row */}
            <div className="mt-10 pt-6 border-t border-red-50">
              <h4 className="font-display text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" />
                Ikuti Media Sosial Kami
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-red-50 hover:bg-brand-primary text-brand-primary hover:text-white flex items-center justify-center border border-red-100 transition-all hover:scale-110 active:scale-95"
                  title="Instagram"
                  id="contact-social-ig"
                >
                  <Instagram className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-red-50 hover:bg-brand-primary text-brand-primary hover:text-white flex items-center justify-center border border-red-100 transition-all hover:scale-110 active:scale-95"
                  title="Facebook"
                  id="contact-social-fb"
                >
                  <Facebook className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-red-50 hover:bg-brand-primary text-brand-primary hover:text-white flex items-center justify-center border border-red-100 transition-all hover:scale-110 active:scale-95"
                  title="YouTube"
                  id="contact-social-yt"
                >
                  <Youtube className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>

          </motion.div>

          {/* Google Maps Card (Right Side - 7 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white rounded-[32px] p-4 border border-red-50 shadow-xl flex flex-col"
            id="lokasi-maps-card"
          >
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <h3 className="font-display text-sm font-black uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-primary animate-ping" />
                Lokasi {settings.logo}
              </h3>
              <span className="text-[10px] text-gray-400 font-bold">Buka • {settings.jam_layanan}</span>
            </div>
            
            {/* Elegant Map container with hidden scroll overflow */}
            <div className="relative flex-grow rounded-2xl overflow-hidden border border-red-50 shadow-inner h-80 lg:h-full min-h-[340px] mt-2">
              <iframe
                title={`Lokasi ${settings.logo} Google Maps`}
                src={getEmbedUrl(settings.maps_embed)}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                id="maps-iframe"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

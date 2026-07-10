import { Award, ShieldCheck, Soup, Star } from "lucide-react";
import { motion } from "motion/react";

export default function TentangKami() {
  return (
    <section
      id="tentang"
      className="py-24 relative overflow-hidden bg-white"
    >
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-red-50/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-orange-50/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Showcase on the Left */}
          <div className="lg:col-span-5 grid grid-cols-12 gap-4 relative">
            
            {/* Main Picture Frame */}
            <div className="col-span-8 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4]"
              >
                <img
                  src="/assets/images/geprekhot_original_1783685856615.jpg"
                  alt="Ayam Geprek Pedas Premium"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>

            {/* Overlapping secondary frame */}
            <div className="col-span-4 flex flex-col justify-end">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-2xl overflow-hidden shadow-xl border-2 border-white aspect-square mb-4"
              >
                <img
                  src="/assets/images/geprekhot_matah_1783685886582.jpg"
                  alt="Ayam Geprek Sambal Matah Pedas Segar"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Decorative Counter Widget */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-brand-primary text-white rounded-2xl p-4 shadow-lg text-center"
              >
                <span className="block font-display text-2xl font-black">100%</span>
                <span className="block text-[10px] uppercase font-bold tracking-wider mt-0.5 opacity-90">Fresh-to-Order</span>
              </motion.div>
            </div>

            {/* Corner floating element */}
            <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center pointer-events-none hidden sm:flex">
              <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center text-white shadow-lg">
                <Soup className="w-5 h-5" />
              </div>
            </div>

          </div>

          {/* Copy Writing on the Right */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Section Tag */}
            <div className="flex items-center gap-2 mb-4 self-start">
              <div className="h-1 w-8 bg-brand-primary rounded-full" />
              <span className="text-brand-primary text-xs font-black uppercase tracking-widest">Tentang Kami</span>
            </div>

            {/* Section Title */}
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Kisah di Balik <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">GeprekHot</span> Membara
            </h2>

            {/* Story Paragraphs */}
            <p className="mt-6 font-sans text-base text-gray-600 leading-relaxed text-justify">
              GeprekHot lahir dari kecintaan kami terhadap cita rasa kuliner tradisional Indonesia yang kaya rempah dan membangkitkan selera. Kami percaya bahwa Ayam Geprek yang sempurna tidak hanya sekadar pedas, melainkan harmoni sempurna antara kerenyahan kulit luar, kelembutan daging di dalam, dan kesegaran sambal yang diulek secara dadakan.
            </p>

            <p className="mt-4 font-sans text-base text-gray-600 leading-relaxed text-justify">
              Kualitas adalah komitmen utama kami. Setiap potongan ayam diperoleh dari pemasok lokal tepercaya yang menjamin ayam segar harian (bukan ayam beku berhari-hari). Sambal kami diracik dengan cabai rawit merah segar pilihan, bawang putih murni, dan minyak kelapa panas aromatik tanpa pengawet buatan apa pun.
            </p>

            {/* Highlighted core pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6" id="about-pillars">
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-brand-primary border border-red-100 shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-gray-900">Bahan Premium & Halal</h4>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                    Ayam segar harian bersertifikat Halal dengan bumbu rempah melimpah meresap sempurna.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-brand-secondary border border-orange-100 shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-gray-900">Sambal Racikan Khas</h4>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                    Ulekan dadakan segar dengan resep rahasia yang menghasilkan sensasi pedas gurih nagih.
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom mini-banner */}
            <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 border border-red-100/30 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex text-yellow-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-sans text-xs font-semibold text-gray-700 text-center sm:text-left leading-normal">
                "Kami berkomitmen memberikan pengalaman bersantap Ayam Geprek naik kelas dengan cita rasa restoran premium."
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "motion/react";
import { fetchTestimonials, DbTestimonial } from "../lib/supabase";

export default function Testimoni() {
  const [testimonials, setTestimonials] = useState<DbTestimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        setIsLoading(true);
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (err) {
        console.error("Failed loading testimonials:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadTestimonials();
  }, []);

  return (
    <section
      id="testimoni"
      className="py-24 relative overflow-hidden bg-white"
    >
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-8 bg-brand-primary rounded-full" />
            <span className="text-brand-primary text-xs font-black uppercase tracking-widest">Testimoni Pelanggan</span>
            <div className="h-1 w-8 bg-brand-primary rounded-full" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Apa Kata <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">Pecinta Pedas</span> Kami?
          </h2>
          <p className="mt-4 font-sans text-base text-gray-600">
            Dengarkan langsung ulasan jujur dari pelanggan setia kami yang telah merasakan dahsyatnya kelezatan Ayam Geprek GeprekHot.
          </p>
        </div>

        {/* 3-Column Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="testimoni-grid">
          {isLoading ? (
            // Testimonials Skeletal Animation
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`testi-skeleton-${index}`}
                className="bg-white rounded-[32px] p-8 border border-red-50/50 shadow-md flex flex-col gap-4 animate-pulse h-64"
                id={`testi-skeleton-${index}`}
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-gray-100 rounded-full" />
                  ))}
                </div>
                <div className="h-4 bg-gray-100 rounded-md w-full" />
                <div className="h-4 bg-gray-100 rounded-md w-5/6" />
                <div className="mt-auto flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full" />
                  <div className="flex flex-col gap-2 flex-grow">
                    <div className="h-4 bg-gray-100 rounded-md w-1/2" />
                    <div className="h-3 bg-gray-100 rounded-md w-1/3" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            testimonials.map((testi, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={`testi-${testi.id}`}
                className="group relative bg-white rounded-[32px] p-8 border border-red-50 hover:border-red-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
                id={`testimoni-card-${testi.id}`}
              >
                {/* Giant quote decorator */}
                <div className="absolute top-6 right-8 text-red-100/60 group-hover:text-brand-primary/10 transition-colors duration-300 pointer-events-none">
                  <Quote className="w-12 h-12 transform rotate-180 fill-current" />
                </div>

                {/* Card Body */}
                <div className="relative z-10">
                  {/* Rating Stars */}
                  <div className="flex text-yellow-400 gap-0.5 mb-5" id={`testi-stars-${testi.id}`}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testi.rating ? "fill-current" : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment Text */}
                  <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed italic mb-8">
                    "{testi.pesan}"
                  </p>
                </div>

                {/* User Profile Footer */}
                <div className="relative z-10 flex items-center gap-4 pt-5 border-t border-red-50" id={`testi-user-${testi.id}`}>
                  {/* Rounded Avatar with double borders */}
                  <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-brand-primary to-brand-secondary">
                    <img
                      src={testi.foto}
                      alt={testi.nama}
                      className="w-full h-full object-cover rounded-full border border-white"
                      referrerPolicy="no-referrer"
                      id={`testi-avatar-img-${testi.id}`}
                    />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-extrabold text-gray-900 group-hover:text-brand-primary transition-colors duration-300">
                      {testi.nama}
                    </h4>
                    {testi.kategori && (
                      <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                        {testi.kategori}
                      </span>
                    )}
                  </div>
                </div>

              </motion.div>
            ))
          )}
        </div>

        {/* Bottom review prompt CTA */}
        <div className="mt-16 text-center" id="testimoni-prompt">
          <p className="font-sans text-xs text-gray-500">
            Sudah mencoba kelezatan GeprekHot? Bagikan ulasan terbaikmu di Google Maps kami!
          </p>
        </div>

      </div>
    </section>
  );
}

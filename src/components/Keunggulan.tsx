import { ShieldCheck, Flame, Sparkles, DollarSign, Zap, Sparkle } from "lucide-react";
import { motion } from "motion/react";
import { KEUNGGULAN_ITEMS } from "../data";

// Type-safe map of Lucide Icons used in Keunggulan data
const IconMap: Record<string, any> = {
  ShieldCheck: ShieldCheck,
  Flame: Flame,
  Sparkles: Sparkles,
  DollarSign: DollarSign,
  Zap: Zap,
  Sparkle: Sparkle,
};

export default function Keunggulan() {
  return (
    <section
      id="keunggulan"
      className="py-24 relative overflow-hidden bg-white"
    >
      {/* Background blobs for premium depth */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-red-50/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-orange-50/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-8 bg-brand-primary rounded-full" />
            <span className="text-brand-primary text-xs font-black uppercase tracking-widest">Keunggulan Kami</span>
            <div className="h-1 w-8 bg-brand-primary rounded-full" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Mengapa Memilih <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">GeprekHot</span>?
          </h2>
          <p className="mt-4 font-sans text-base text-gray-600">
            Kami menjaga komitmen rasa dan kualitas di setiap sajian ayam geprek agar Anda mendapatkan kelezatan orisinil yang memuaskan.
          </p>
        </div>

        {/* Features Bento-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="keunggulan-grid">
          {KEUNGGULAN_ITEMS.map((item, index) => {
            const IconComponent = IconMap[item.iconName] || Flame;
            
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={item.id}
                className="group relative bg-white rounded-3xl p-8 border border-red-50 hover:border-red-100 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                id={`keunggulan-card-${item.id}`}
              >
                {/* Glowing subtle hover layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Icon wrapper */}
                <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-red-50 group-hover:bg-brand-primary text-brand-primary group-hover:text-white transition-all duration-300 mb-6 shadow-sm">
                  <IconComponent className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Text Content */}
                <div className="relative z-10">
                  <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-brand-primary transition-colors duration-300 mb-3">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Decorative border line on hover */}
                <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-t-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />

              </motion.div>
            );
          })}
        </div>

        {/* Bottom Trust Stat Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-xl shadow-brand-primary/10 relative overflow-hidden"
          id="keunggulan-trust-bar"
        >
          {/* Wave background details */}
          <div className="absolute top-0 right-0 w-80 h-full bg-white/5 skew-x-12 transform origin-top-right pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-0 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/20 w-full">
            <div className="py-4 sm:py-6 px-4 flex flex-col items-center justify-center w-full">
              <span className="block font-display text-3xl sm:text-4xl font-black">100k+</span>
              <span className="block text-xs font-bold uppercase tracking-wider mt-1 text-red-100">Porsi Terjual</span>
            </div>
            <div className="py-4 sm:py-6 px-4 flex flex-col items-center justify-center w-full">
              <span className="block font-display text-3xl sm:text-4xl font-black">50+</span>
              <span className="block text-xs font-bold uppercase tracking-wider mt-1 text-red-100">Testimoni</span>
            </div>
            <div className="py-4 sm:py-6 px-4 flex flex-col items-center justify-center w-full">
              <span className="block font-display text-3xl sm:text-4xl font-black">10+</span>
              <span className="block text-xs font-bold uppercase tracking-wider mt-1 text-red-100">Mitra Driver Online</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

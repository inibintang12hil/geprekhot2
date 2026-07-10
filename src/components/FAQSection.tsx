import { useState, useEffect } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { fetchFAQ, DbFAQ } from "../lib/supabase";

export default function FAQSection() {
  const [faqs, setFaqs] = useState<DbFAQ[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFaqs() {
      try {
        setIsLoading(true);
        const data = await fetchFAQ();
        setFaqs(data);
        if (data.length > 0) {
          setOpenId(`faq-${data[0].id}`);
        }
      } catch (err) {
        console.error("Failed loading FAQs:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadFaqs();
  }, []);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="py-24 relative overflow-hidden bg-white"
    >
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-50/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-8 bg-brand-primary rounded-full" />
            <span className="text-brand-primary text-xs font-black uppercase tracking-widest">Tanya Jawab</span>
            <div className="h-1 w-8 bg-brand-primary rounded-full" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Pertanyaan yang <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">Sering Diajukan</span>
          </h2>
          <p className="mt-4 font-sans text-sm text-gray-600">
            Berikut adalah jawaban dari pertanyaan-pertanyaan umum yang sering ditanyakan oleh pelanggan setia kami mengenai GeprekHot.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4" id="faq-accordion-list">
          {isLoading ? (
            // FAQ Loading Skeletal Items
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`faq-skeleton-${index}`}
                className="rounded-[24px] border border-gray-100 bg-white p-6 animate-pulse flex flex-col gap-2"
              >
                <div className="h-6 bg-gray-100 rounded w-2/3" />
                <div className="h-4 bg-gray-100 rounded w-full mt-2" />
              </div>
            ))
          ) : (
            faqs.map((faq) => {
              const itemId = `faq-${faq.id}`;
              const isOpen = openId === itemId;
              
              return (
                <div
                  key={faq.id}
                  className={`rounded-[24px] border transition-all duration-300 ${
                    isOpen
                      ? "border-brand-primary/40 bg-red-50/20 shadow-md"
                      : "border-gray-100 bg-white hover:border-red-200 shadow-sm"
                  }`}
                  id={`faq-item-${faq.id}`}
                >
                  {/* Accordion Header Button */}
                  <button
                    onClick={() => toggleFAQ(itemId)}
                    className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
                    aria-expanded={isOpen}
                    id={`faq-trigger-${faq.id}`}
                  >
                    <div className="flex items-center gap-4 pr-4">
                      <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isOpen ? "bg-brand-primary text-white" : "bg-red-50 text-brand-primary"
                      }`}>
                        <HelpCircle className="w-4.5 h-4.5" />
                      </span>
                      <span className="font-display text-sm sm:text-base font-bold text-gray-900">
                        {faq.pertanyaan}
                      </span>
                    </div>
                    
                    {/* Rotating Chevron Icon */}
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border border-gray-100 bg-white text-gray-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-brand-primary border-brand-primary/20" : ""
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {/* Accordion Content Panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                        id={`faq-content-${faq.id}`}
                      >
                        <div className="px-6 pb-6 pt-1 border-t border-red-100/30 font-sans text-xs sm:text-sm text-gray-600 leading-relaxed pl-18">
                          {faq.jawaban}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}

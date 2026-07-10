import { useState, useEffect } from "react";
import { Flame, ShoppingCart, Info, Search, Smile, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MenuItem } from "../types";
import { fetchCategories, fetchProducts, fetchSettings } from "../lib/supabase";
import { getProductImage } from "../lib/images";

function parsePedasRange(levelStr: string | number | undefined): { min: number; max: number } {
  if (levelStr === undefined || levelStr === null) {
    return { min: 1, max: 10 };
  }
  const str = String(levelStr);
  const numbers = str.match(/\d+/g);
  if (numbers && numbers.length >= 2) {
    return {
      min: parseInt(numbers[0], 10),
      max: parseInt(numbers[1], 10)
    };
  } else if (numbers && numbers.length === 1) {
    return {
      min: 1,
      max: parseInt(numbers[0], 10)
    };
  }
  return { min: 1, max: 10 };
}

export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const [categories, setCategories] = useState<string[]>(["Semua", "Ayam Geprek", "Paket Hemat"]);
  const [products, setProducts] = useState<MenuItem[]>([]);
  const [waNumber, setWaNumber] = useState<string>("6287864802104");
  const [isLoading, setIsLoading] = useState(true);

  // State for tracking custom selected level pedas for each menu card
  const [selectedLevels, setSelectedLevels] = useState<Record<string, number>>({});

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [cats, prods, settings] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
          fetchSettings()
        ]);
        
        // Map categories dynamically
        const uniqueCats = Array.from(new Set(["Semua", ...cats.map(c => c.nama)]));
        setCategories(uniqueCats);
        setWaNumber(settings.no_wa);

        // Map database products to the MenuItem shape expected by the frontend
        const mappedProducts: MenuItem[] = prods
          .filter(p => p.status) // Only available items
          .map(p => {
            const cat = cats.find(c => c.id === p.kategori_id);
            const categoryName = cat ? cat.nama : "Lainnya";
            const { min, max } = parsePedasRange(p.level_pedas);

            // Normalize image path using our ESM resolution utility for absolute Vercel compatibility
            const imgPath = getProductImage(p.gambar);

            return {
              id: `prod-${p.id}`,
              name: p.nama_produk,
              price: `Rp ${p.harga.toLocaleString("id-ID")}`,
              rating: 4.9, // Aesthetic rating
              description: p.deskripsi,
              image: imgPath,
              tag: max >= 8 ? "Terlaris" : undefined,
              level_pedas: p.level_pedas,
              min_pedas: min,
              max_pedas: max,
              // Keep categoryName for filtering
              categoryName: categoryName
            } as any;
          });

        setProducts(mappedProducts);

        // Initialize default levels for products based on database value
        const defaultLevels: Record<string, number> = {};
        mappedProducts.forEach(item => {
          const min = (item as any).min_pedas ?? 1;
          const max = (item as any).max_pedas ?? 10;
          defaultLevels[item.id] = Math.max(min, Math.min(5, max));
        });
        setSelectedLevels(defaultLevels);
      } catch (err) {
        console.error("Failed loading menu data from Supabase:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleLevelChange = (id: string, value: number) => {
    setSelectedLevels((prev) => ({ ...prev, [id]: value }));
  };

  const getWhatsAppLink = (item: MenuItem) => {
    const min = (item as any).min_pedas ?? 1;
    const max = (item as any).max_pedas ?? 10;
    const level = selectedLevels[item.id] !== undefined ? selectedLevels[item.id] : Math.max(min, Math.min(5, max));
    const message = `Halo GeprekHot, saya ingin memesan menu *${item.name}* dengan *Tingkat Pedas: Level ${level}*. Mohon proses pesanan saya ya. Terima kasih!`;
    const cleanWa = waNumber.replace(/[^0-9]/g, "");
    return `https://wa.me/${cleanWa}?text=${encodeURIComponent(message)}`;
  };

  // Helper for dynamic level badge styling without raw emojis
  const getLevelBadge = (level: number) => {
    if (level >= 8) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 text-brand-primary text-[10px] font-black uppercase tracking-wider animate-pulse">
          <Flame className="w-3 h-3 fill-current" />
          Membara
        </span>
      );
    } else if (level >= 5) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-100 text-brand-secondary text-[10px] font-black uppercase tracking-wider">
          <Zap className="w-3 h-3 fill-current" />
          Pedas
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-100 text-green-600 text-[10px] font-black uppercase tracking-wider">
          <Smile className="w-3 h-3" />
          Sedang
        </span>
      );
    }
  };

  // Filter items
  const filteredItems = products.filter((item) => {
    const itemCat = (item as any).categoryName || "Lainnya";
    const matchesCategory =
      selectedCategory === "Semua" ||
      itemCat === selectedCategory;

    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="menu"
      className="py-24 relative bg-white"
    >
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-8 bg-brand-primary rounded-full" />
            <span className="text-brand-primary text-xs font-black uppercase tracking-widest">Menu Andalan</span>
            <div className="h-1 w-8 bg-brand-primary rounded-full" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Sensasi Pedas <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">GeprekHot</span> Terfavorit
          </h2>
          <p className="mt-4 font-sans text-base text-gray-600">
            Dibuat fresh dadakan dengan bumbu khas meresap, ayam crispy gurih, dan siraman sambal ulek yang pedasnya menggoyang lidah.
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-red-100/50 pb-8" id="menu-controls">
          
          {/* Categories Tab selector */}
          <div className="grid grid-cols-3 md:flex items-center gap-1.5 p-1 bg-red-50 rounded-full w-full md:w-auto overflow-x-auto scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-2 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wide transition-all text-center ${
                  selectedCategory === category
                    ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20"
                    : "text-gray-600 hover:text-brand-primary hover:bg-red-100/50"
                }`}
                id={`category-btn-${category.replace(/\s+/g, "-").toLowerCase()}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Clean Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Cari geprek favoritmu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-red-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all shadow-sm text-gray-800 placeholder-gray-400 font-medium"
              id="menu-search-input"
            />
            <Search className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

        </div>

        {/* Products Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          id="menu-grid"
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              // 3-card elegant loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="bg-white rounded-[32px] overflow-hidden border border-red-50/50 shadow-md p-6 flex flex-col gap-4 animate-pulse"
                  id={`menu-skeleton-${index}`}
                >
                  <div className="w-full aspect-square bg-gray-100 rounded-2xl" />
                  <div className="h-6 bg-gray-100 rounded-md w-3/4" />
                  <div className="h-4 bg-gray-100 rounded-md w-1/2" />
                  <div className="h-12 bg-gray-100 rounded-2xl w-full mt-4" />
                  <div className="h-10 bg-gray-100 rounded-2xl w-full mt-2" />
                </div>
              ))
            ) : (
              filteredItems.map((item) => {
                const min = (item as any).min_pedas ?? 1;
                const max = (item as any).max_pedas ?? 10;
                const currentLevel = selectedLevels[item.id] !== undefined ? selectedLevels[item.id] : Math.max(min, Math.min(5, max));
                
                return (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    key={item.id}
                    className="bg-white rounded-[32px] overflow-hidden border border-red-50 hover:border-red-100/70 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group h-full relative"
                    onMouseEnter={() => setHoveredCard(item.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    id={`menu-card-${item.id}`}
                  >
                    {/* Image Holder with hover zoom */}
                    <div className="relative aspect-square overflow-hidden bg-red-50/20">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        id={`menu-img-${item.id}`}
                      />
                      
                      {/* Shadow overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>

                    {/* Card Content Area */}
                    <div className="p-6 flex flex-col flex-grow">
                      
                      {/* Title and Price */}
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h3 className="font-display text-lg font-extrabold text-gray-900 leading-snug group-hover:text-brand-primary transition-colors">
                          {item.name}
                        </h3>
                        <span className="font-display text-lg font-black text-brand-primary whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="font-sans text-xs text-gray-500 leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {/* Interactive Level Pedas Selector widget - highly premium detail! */}
                      <div className="mt-auto bg-gray-50 hover:bg-red-50/30 border border-gray-100 hover:border-red-100/50 rounded-2xl p-4 mb-5 transition-all duration-200">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 fill-brand-primary text-brand-primary animate-pulse" />
                            Pedas Level {currentLevel}
                          </span>
                          {getLevelBadge(currentLevel)}
                        </div>
                        
                        <div className="relative pt-1">
                          <input
                            type="range"
                            min={min}
                            max={max}
                            value={currentLevel}
                            onChange={(e) => handleLevelChange(item.id, parseInt(e.target.value))}
                            className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-brand-primary bg-gray-200 transition-all"
                            style={{
                              background: `linear-gradient(to right, #D50000 0%, #D50000 ${
                                max > min 
                                  ? ((currentLevel - min) / (max - min)) * 100 
                                  : 100
                              }%, #e5e7eb ${
                                max > min 
                                  ? ((currentLevel - min) / (max - min)) * 100 
                                  : 100
                              }%, #e5e7eb 100%)`
                            }}
                            id={`pedas-slider-${item.id}`}
                          />
                        </div>
                        
                        <div className="flex justify-between text-[9px] text-gray-400 font-bold mt-2 px-0.5">
                          <span className="hover:text-brand-primary transition-colors cursor-pointer" onClick={() => handleLevelChange(item.id, min)}>Level {min}</span>
                          {max > min + 1 && (
                            <span className="hover:text-brand-primary transition-colors cursor-pointer" onClick={() => handleLevelChange(item.id, Math.ceil((min + max) / 2))}>
                              Level {Math.ceil((min + max) / 2)}
                            </span>
                          )}
                          {max > min && (
                            <span className="hover:text-brand-primary transition-colors cursor-pointer" onClick={() => handleLevelChange(item.id, max)}>
                              Level {max}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* WhatsApp Action Button */}
                      <a
                        href={getWhatsAppLink(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-brand-primary/10 transition-all duration-200 hover:scale-[1.02] active:scale-98"
                        id={`menu-order-btn-${item.id}`}
                      >
                        <ShoppingCart className="w-4 h-4 transition-transform group-hover/btn:-translate-y-0.5" />
                        Pesan Sekarang
                      </a>

                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Empty state when search has no results */}
        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-16" id="menu-empty-state">
            <Info className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-display text-lg font-bold text-gray-700">Menu tidak ditemukan</h3>
            <p className="text-xs text-gray-400 mt-1">Coba gunakan kata kunci pencarian yang lain.</p>
          </div>
        )}

      </div>
    </section>
  );
}

import { MenuItem, TestimonialItem, FAQItem, KeunggulanItem } from "./types";

// Explicit paths to our generated premium food assets
export const HERO_IMAGE = "/assets/images/geprekhot_hero_1783685841231.jpg";

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "menu-1",
    name: "Ayam Geprek Original",
    price: "Rp 15.000",
    rating: 4.9,
    description: "Ayam goreng tepung super crispy digeprek dengan sambal korek khas GeprekHot. Pedasnya nampol!",
    image: "/assets/images/geprekhot_original_1783685856615.jpg",
    tag: "Terlaris"
  },
  {
    id: "menu-2",
    name: "Ayam Geprek Keju",
    price: "Rp 19.000",
    rating: 4.8,
    description: "Kombinasi ayam geprek pedas gurih dengan taburan keju cheddar parut tebal yang melimpah.",
    image: "/assets/images/geprekhot_keju_1783685902743.jpg"
  },
  {
    id: "menu-3",
    name: "Ayam Geprek Mozzarella",
    price: "Rp 23.000",
    rating: 4.9,
    description: "Ayam geprek berbalut keju mozzarella premium yang dilelehkan dan ditorched sempurna hingga mulur gurih.",
    image: "/assets/images/geprekhot_mozzarella_1783685872713.jpg",
    tag: "Rekomendasi"
  },
  {
    id: "menu-4",
    name: "Ayam Geprek Sambal Matah",
    price: "Rp 18.000",
    rating: 4.8,
    description: "Sensasi segar Ayam Geprek dengan siraman Sambal Matah khas Bali yang kaya akan irisan bawang, sereh, dan jeruk nipis.",
    image: "/assets/images/geprekhot_matah_1783685886582.jpg"
  },
  {
    id: "menu-5",
    name: "Paket Hemat Geprek",
    price: "Rp 21.000",
    rating: 4.9,
    description: "Paket komplit kenyang! Nasi putih hangat pulen, Ayam Geprek Original (bebas pilih level), es teh manis, dan lalapan segar.",
    image: "/assets/images/geprekhot_paket_1783685916823.jpg",
    tag: "Hemat"
  }
];

export const KEUNGGULAN_ITEMS: KeunggulanItem[] = [
  {
    id: "k-1",
    title: "Ayam Selalu Fresh",
    description: "Kami hanya menggunakan daging ayam segar berkualitas tinggi yang dipasok langsung setiap pagi, tanpa pembekuan lama.",
    iconName: "ShieldCheck"
  },
  {
    id: "k-2",
    title: "Sambal Racikan Khas",
    description: "Sambal korek dadakan yang diracik langsung dari cabai rawit merah dan bawang pilihan. Rasanya otentik dan segar!",
    iconName: "Flame"
  },
  {
    id: "k-3",
    title: "Level Pedas 1–10",
    description: "Bebas tentukan tantangan pedasmu! Dari level 1 yang santai hingga level 10 membara yang sanggup menguji nyali Anda.",
    iconName: "Sparkles"
  },
  {
    id: "k-4",
    title: "Harga Terjangkau",
    description: "Cita rasa masakan bintang lima dengan harga bersahabat ramah kantong mahasiswa maupun keluarga.",
    iconName: "DollarSign"
  },
  {
    id: "k-5",
    title: "Pengiriman Cepat",
    description: "Dikemas dengan seal rapat tahan panas untuk menjaga kehangatan dan kerenyahan hingga di depan pintu rumah Anda.",
    iconName: "Zap"
  },
  {
    id: "k-6",
    title: "Higienis & Berkualitas",
    description: "Diproses secara higienis dengan standar kebersihan ketat demi menyajikan hidangan sehat bagi keluarga tercinta.",
    iconName: "Sparkle"
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t-1",
    name: "Aditya Pratama",
    role: "Pecinta Kuliner Pedas",
    rating: 5,
    comment: "Sumpah ini ayam geprek tergokil yang pernah saya coba! Luarnya super garing tapi daging di dalamnya masih sangat juicy. Sambal level 8-nya benar-benar membakar lidah tapi bikin nagih parah!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "t-2",
    name: "Siti Rahma",
    role: "Ibu Rumah Tangga",
    rating: 5,
    comment: "Ayam Geprek Mozzarella-nya juara! Kejunya tebal dan meleleh melimpah, dipadu sama sambal khas GeprekHot rasanya jadi gurih-pedas seimbang. Anak-anak juga suka yang level 1.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "t-3",
    name: "Dewi Lestari",
    role: "Karyawan Swasta",
    rating: 5,
    comment: "Sambal Matah-nya segar banget! Rasa kecombrang dan serehnya terasa premium sekali, seperti makan di kafe bintang lima tapi harga kaki lima. Sangat direkomendasikan untuk makan siang!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "t-4",
    name: "Budi Santoso",
    role: "Mahasiswa",
    rating: 4,
    comment: "Paket Hemat Geprek benar-benar penolong di akhir bulan. Porsinya bikin kenyang banget, nasinya pulen, ayamnya besar, lengkap dengan timun segar dan es teh manis. Mantap!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "t-5",
    name: "Rian Hidayat",
    role: "Freelancer",
    rating: 5,
    comment: "Sebagai penikmat pedas akut, level 10 GeprekHot sukses bikin keringat bercucuran tapi rasa bumbunya tetap gurih meresap sampai ke tulang. Sambalnya asli ulekan cabai rawit segar!",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "t-6",
    name: "Amalia Siregar",
    role: "Food Blogger",
    rating: 5,
    comment: "Pelayanannya ramah banget dan pengiriman cepat. Kemasan rapi dengan segel higienis, menjaga ayam tetap renyah saat tiba di rumah. Porsi sambalnya juga royal tidak pelit!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Apakah bisa memilih level pedas?",
    answer: "Ya, tentu saja! Kami menyediakan pilihan tingkat kepedasan dari level 1 hingga level 10 untuk menyesuaikan toleransi pedas favorit Anda. Anda juga bisa memesan tanpa cabai sama sekali."
  },
  {
    id: "faq-2",
    question: "Apakah tersedia di GoFood, GrabFood, dan ShopeeFood?",
    answer: "Betul! GeprekHot sudah tersedia di seluruh aplikasi layanan pesan-antar makanan online terkemuka. Cari saja outlet terdekat kami dengan kata kunci 'GeprekHot' di aplikasi favoritmu."
  },
  {
    id: "faq-3",
    question: "Jam berapa operasional outlet GeprekHot?",
    answer: "Kami melayani pelanggan setiap hari dari pukul 10:00 pagi hingga pukul 21:00 malam WIB, baik untuk dine-in, take-away, maupun pemesanan online."
  },
  {
    id: "faq-4",
    question: "Apakah menerima pesanan dalam jumlah besar untuk acara?",
    answer: "Ya, kami menerima pesanan katering partai besar untuk acara syukuran, ulang tahun, rapat kantor, gathering, dll. Kami sarankan menghubungi kami via WhatsApp minimal H-2 acara."
  },
  {
    id: "faq-5",
    question: "Apakah hidangan GeprekHot dijamin halal?",
    answer: "Kami menjamin 100% Halal. Semua bahan ayam, minyak goreng, bumbu, hingga proses pengolahan kami bersertifikat halal resmi dan diproses dengan standar kebersihan prima."
  },
  {
    id: "faq-6",
    question: "Berapa lama proses pembuatan makanan saat dipesan?",
    answer: "Setiap hidangan dibuat secara fresh-to-order (dadakan) untuk menjaga kegaringan kulit ayam maksimal. Waktu pengerjaan berkisar 10-15 menit tergantung antrean pesanan Anda."
  }
];

import { MenuItem, TestimonialItem, FAQItem } from "../types";
import { MENU_ITEMS, TESTIMONIALS, FAQ_ITEMS } from "../data";

/**
 * KONFIGURASI SUPABASE DATABASE REST API
 * 
 * Kami menggunakan koneksi REST API langsung ke Supabase yang super cepat, ringan,
 * dan aman untuk lingkungan browser modern. Mendukung fallback otomatis ke data lokal
 * jika koneksi database gagal atau tabel belum terisi data.
 */
const SUPABASE_URL = "https://cryszxtjzajelblkotux.supabase.co/rest/v1";
const SUPABASE_ANON_KEY = "sb_publishable_1bg-gupiTwQkJeKQaetICw_rtnfEcY2";

const HEADERS = {
  "apikey": SUPABASE_ANON_KEY,
  "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json"
};

export interface DbSettings {
  id: number;
  logo: string;
  no_wa: string;
  email: string;
  alamat: string;
  jam_layanan: string;
  maps_embed: string;
}

export interface DbCategory {
  id: number;
  nama: string;
}

export interface DbProduct {
  id: number;
  level_pedas: number;
  kategori_id: number;
  nama_produk: string;
  deskripsi: string;
  harga: number;
  gambar: string;
  status: boolean;
}

export interface DbTestimonial {
  id: number;
  nama: string;
  kategori: string;
  foto: string;
  pesan: string;
  rating: number;
}

export interface DbFAQ {
  id: number;
  pertanyaan: string;
  jawaban: string;
  urutan: number;
}

/**
 * Melakukan pemanggilan ke REST API Supabase dengan proteksi Error handling
 */
async function safeFetch<T>(endpoint: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${SUPABASE_URL}/${endpoint}`, {
      method: "GET",
      headers: HEADERS,
    });
    if (!response.ok) {
      console.warn(`Supabase fetch failed for /${endpoint}: Status ${response.status}`);
      return fallback;
    }
    const data = await response.json();
    // Jika data array kosong, gunakan fallback agar tampilan tidak kosong
    if (Array.isArray(data) && data.length === 0) {
      return fallback;
    }
    return data as T;
  } catch (error) {
    console.error(`Error connecting to Supabase endpoint /${endpoint}:`, error);
    return fallback;
  }
}

/**
 * Mengambil informasi pengaturan website (Logo, WA, Email, Alamat, Jam Layanan, Peta)
 */
export async function fetchSettings(): Promise<DbSettings> {
  const fallback: DbSettings = {
    id: 1,
    logo: "GeprekHot",
    no_wa: "6287864802104",
    email: "halo@geprekhot.com",
    alamat: "Jl. Merapi Membara No. 88, Yogyakarta, Indonesia",
    jam_layanan: "Setiap Hari, 10:00 - 21:00 WIB",
    maps_embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.037148565158!2d110.3758362!3d-7.7858971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a599bd3bd0b13%3A0x643cf7097c55209c!2sYogyakarta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
  };
  const list = await safeFetch<DbSettings[]>("settings?limit=1", [fallback]);
  return list[0] || fallback;
}

/**
 * Mengambil kategori produk
 */
export async function fetchCategories(): Promise<DbCategory[]> {
  const fallback: DbCategory[] = [
    { id: 1, nama: "Semua" },
    { id: 2, nama: "Ayam Geprek" },
    { id: 3, nama: "Paket Hemat" }
  ];
  return safeFetch<DbCategory[]>("categories?order=id.asc", fallback);
}

/**
 * Mengambil daftar produk GeprekHot
 */
export async function fetchProducts(): Promise<DbProduct[]> {
  const fallback: DbProduct[] = MENU_ITEMS.map((item, idx) => ({
    id: idx + 1,
    level_pedas: 5,
    kategori_id: item.id === "menu-5" ? 3 : 2,
    nama_produk: item.name,
    deskripsi: item.description,
    harga: parseInt(item.price.replace(/[^0-9]/g, "")) || 15000,
    gambar: item.image,
    status: true
  }));
  const rawList = await safeFetch<any[]>("products?order=id.asc", fallback);
  return rawList.map(p => ({
    id: p.id,
    level_pedas: p.level_pedas !== undefined ? p.level_pedas : p["Level pedas"] !== undefined ? p["Level pedas"] : 5,
    kategori_id: p.kategori_id,
    nama_produk: p.nama_produk,
    deskripsi: p.deskripsi,
    harga: p.harga,
    gambar: p.gambar,
    status: p.status === true || p.status === "true" || p.status === 1 || p.status === undefined
  }));
}

/**
 * Mengambil testimoni dari para pelanggan
 */
export async function fetchTestimonials(): Promise<DbTestimonial[]> {
  const fallback: DbTestimonial[] = TESTIMONIALS.map((t, idx) => ({
    id: idx + 1,
    nama: t.name,
    kategori: t.role || "Pecinta Kuliner",
    foto: t.avatar,
    pesan: t.comment,
    rating: t.rating
  }));
  return safeFetch<DbTestimonial[]>("testimonials?order=id.asc", fallback);
}

/**
 * Mengambil data Tanya Jawab / FAQ
 */
export async function fetchFAQ(): Promise<DbFAQ[]> {
  const fallback: DbFAQ[] = FAQ_ITEMS.map((f, idx) => ({
    id: idx + 1,
    pertanyaan: f.question,
    jawaban: f.answer,
    urutan: idx + 1
  }));
  return safeFetch<DbFAQ[]>("faq?order=urutan.asc", fallback);
}

import heroImage from "../assets/images/geprekhot_hero_1783685841231.jpg";
import kejuImage from "../assets/images/geprekhot_keju_1783685902743.jpg";
import matahImage from "../assets/images/geprekhot_matah_1783685886582.jpg";
import mozzarellaImage from "../assets/images/geprekhot_mozzarella_1783685872713.jpg";
import originalImage from "../assets/images/geprekhot_original_1783685856615.jpg";
import paketImage from "../assets/images/geprekhot_paket_1783685916823.jpg";

export const IMAGE_MAP: Record<string, string> = {
  "geprekhot_hero_1783685841231.jpg": heroImage,
  "geprekhot_keju_1783685902743.jpg": kejuImage,
  "geprekhot_matah_1783685886582.jpg": matahImage,
  "geprekhot_mozzarella_1783685872713.jpg": mozzarellaImage,
  "geprekhot_original_1783685856615.jpg": originalImage,
  "geprekhot_paket_1783685916823.jpg": paketImage,
};

export function getProductImage(dbUrl: string | undefined | null): string {
  if (!dbUrl) return originalImage;
  
  // Extract filename from the URL path (e.g. geprekhot_original_1783685856615.jpg)
  const filename = dbUrl.split("/").pop();
  if (filename && IMAGE_MAP[filename]) {
    return IMAGE_MAP[filename];
  }
  
  return dbUrl; // Fallback to raw database URL
}

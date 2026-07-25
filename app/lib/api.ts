// app/lib/api.ts
import { TorobProduct, SearchResponse } from "../types";

const BASE_URL = "https://api.torob.com/v4/base-product";

function resolveImageUrl(image?: string): string {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  if (image.startsWith("//")) return `https:${image}`;
  if (image.startsWith("/")) return `https://api.torob.com${image}`;
  return `https://api.torob.com/${image}`;
}

export async function searchProducts(
  query: string,
  category?: string,
  page: number = 0,
  size: number = 24,
): Promise<SearchResponse> {
  const params = new URLSearchParams({
    q: query,
    page: page.toString(),
    size: size.toString(),
  });
  if (category && category !== "all") {
    params.append("category", category);
  }

  const url = `${BASE_URL}/search/?${params.toString()}`;
  console.log("🚀 درخواست به:", url);

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; YourApp/1.0)",
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ خطای سرور:", errorText);
      throw new Error(
        `خطا در دریافت داده‌ها: ${response.status} - ${errorText}`,
      );
    }

    const data = await response.json();
    console.log(
      "📦 داده‌های دریافتی:",
      JSON.stringify(data).slice(0, 200) + "...",
    );

    // ✅ کلید اصلی results است، نه products
    if (!data.results || !Array.isArray(data.results)) {
      console.warn("⚠️ ساختار داده نامعتبر است:", data);
      return { results: [], total: 0, page: 0 };
    }

    const results: TorobProduct[] = data.results.map((item: any) => ({
      id: item.product_id || item.id || Math.random().toString(),
      name: item.name1 || item.name2 || item.title || "بدون نام",
      price: item.price || item.selling_price || 0,
      image: resolveImageUrl(item.images?.primary?.url || item.thumbnail || item.image),
      link: item.url || `https://torob.com/p/${item.product_id || item.id}`,
      description:
        item.description ||
        item.short_description ||
        item.more_info ||
        "توضیحاتی موجود نیست.",
      category: item.category_name || item.category || category || "متفرقه",
    }));

    return {
      results,
      total: data.count || data.total || results.length,
      page: data.page || page,
    };
  } catch (error) {
    console.error("🔥 خطای شبکه:", error);
    return { results: [], total: 0, page: 0 };
  }
}

export async function getProductById(id: string): Promise<TorobProduct | null> {
  const url = `${BASE_URL}/product/${id}/`;
  try {
    const response = await fetch(url, { next: { revalidate: 60 } });
    if (!response.ok) return null;
    const item = await response.json();
    return {
      id: item.id || item.product_id,
      name: item.name1 || item.name2 || item.title || "بدون نام",
      price: item.price || item.selling_price || 0,
      image: resolveImageUrl(item.images?.primary?.url || item.thumbnail || item.image),
      link: item.url || `https://torob.com/p/${item.id || item.product_id}`,
      description: item.description || item.more_info || "توضیحاتی موجود نیست.",
      category: item.category_name || item.category,
    };
  } catch {
    return null;
  }
}

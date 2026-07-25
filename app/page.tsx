import { searchProducts } from "@/app/lib/api";
import ProductCard from "@/app/components/ProductCard";
import SearchBar from "@/app/components/SearchBar";
import CategoryFilter from "@/app/components/CategoryFilter";
import { TorobProduct } from "@/app/types";

interface HomeProps {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || "کامپیوتر";
  const category = resolvedSearchParams.category || "all";
  const page = parseInt(resolvedSearchParams.page || "0");

  let products: TorobProduct[] = [];
  let total = 0;
  try {
    const result = await searchProducts(
      query,
      category === "all" ? undefined : category,
      page,
      24,
    );
    products = result.results;
    total = result.total;
  } catch (error) {
    console.error("خطا در دریافت محصولات:", error);
  }

  const displayedProducts = products.slice(0, 12);

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-2">
        🖥️ قطعات کامپیوتر
      </h1>
      <p className="text-center text-gray-500 mb-6">
        بر اساس داده‌های{" "}
        <span className="text-blue-600 font-semibold">ترب</span> — پروژه‌ی
        آزمایشی
      </p>

      <SearchBar initialQuery={query} />
      <CategoryFilter selected={category} />

      {displayedProducts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl">هیچ محصولی یافت نشد.</p>
          <p className="text-sm">
            سعی کنید عبارت دیگری جستجو کنید یا دسته‌بندی را تغییر دهید.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {total > 12 && (
            <p className="text-center text-gray-400 text-sm mt-4">
              {total} محصول یافت شد — فقط ۱۲ مورد نمایش داده شده است.
            </p>
          )}
        </>
      )}
    </div>
  );
}

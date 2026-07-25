"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface SearchBarProps {
  initialQuery: string;
}

export default function SearchBar({ initialQuery }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery || "");

  // همگام‌سازی با تغییرات searchParams
  useEffect(() => {
    const q = searchParams.get("q") || "";
    if (q !== query) {
      setQuery(q);
    }
  }, [searchParams]); // وابستگی به searchParams

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجوی قطعه (مثلاً RTX 4060)..."
          className="w-full px-5 py-3 pr-12 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700"
          dir="rtl"
        />
        <button
          type="submit"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
        >
          <MagnifyingGlassIcon className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}

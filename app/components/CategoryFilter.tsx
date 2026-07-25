"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const CATEGORIES = [
  { label: "همه", value: "all" },
  { label: "CPU", value: "cpu" },
  { label: "RAM", value: "ram" },
  { label: "GPU", value: "gpu" },
  { label: "مادربرد", value: "motherboard" },
  { label: "کیس", value: "case" },
  { label: "HDD", value: "hdd" },
  { label: "SSD", value: "ssd" },
];

interface CategoryFilterProps {
  selected: string;
}

export default function CategoryFilter({ selected }: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 my-4">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => handleChange(cat.value)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selected === cat.value
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

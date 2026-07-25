"use client";

import Link from "next/link";
import { TorobProduct } from "../types";

interface ProductCardProps {
  product: TorobProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300 h-full flex flex-col">
        <div className="relative pt-[75%] bg-gray-100">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="absolute top-0 left-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              بدون تصویر
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-lg font-bold text-blue-700 mt-auto">
            {product.price ? product.price.toLocaleString() : "?"} تومان
          </p>
          {product.category && (
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full self-start mt-2">
              {product.category}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

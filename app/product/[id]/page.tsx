import { getProductById } from "../../lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 p-4 transition-colors"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        بازگشت به صفحه اصلی
      </Link>

      <div className="md:flex p-6 gap-8">
        <div className="md:w-1/2 flex justify-center items-center bg-gray-50 rounded-xl p-4">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="max-h-80 object-contain"
            />
          ) : (
            <div className="text-gray-400">تصویر موجود نیست</div>
          )}
        </div>

        <div className="md:w-1/2 mt-6 md:mt-0 flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          {product.category && (
            <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full self-start mt-2">
              {product.category}
            </span>
          )}
          <div className="mt-4 text-3xl font-bold text-green-700">
            {product.price ? product.price.toLocaleString() : "نامشخص"} تومان
          </div>

          <div className="mt-6 border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-700">توضیحات</h2>
            <p className="text-gray-600 mt-2 leading-relaxed">
              {product.description || "توضیحاتی برای این محصول ثبت نشده است."}
            </p>
          </div>

          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl text-center transition-colors shadow-md hover:shadow-lg"
          >
            مشاهده در سایت اصلی (ترب)
          </a>
        </div>
      </div>
    </div>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import Footer from "./components/Footer";

const vazir = Vazirmatn({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "نمایشگاه قطعات کامپیوتر - برگرفته از ترب",
  description:
    "مشاهده و جستجوی قطعات کامپیوتر با استفاده از API ترب - پروژه آزمایشی",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${vazir.className} bg-gray-50 min-h-screen flex flex-col`}
      >
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

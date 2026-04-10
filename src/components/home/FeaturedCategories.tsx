"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Tranh Thêu Phong Cảnh",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80",
    href: "/san-pham?category=phong-canh",
    size: "large",
  },
  {
    id: 2,
    name: "Tranh Thêu Hoa Điểu",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
    href: "/san-pham?category=hoa-dieu",
    size: "small",
  },
  {
    id: 3,
    name: "Phụ Kiện Thêu",
    image: "https://images.unsplash.com/photo-1606293926075-69a00febf281?w=800&q=80",
    href: "/phu-kien",
    size: "small",
  },
  {
    id: 4,
    name: "Khóa Học Thêu",
    image: "https://images.unsplash.com/photo-1459749411177-047381bb3ece?w=800&q=80",
    href: "/khoa-hoc",
    size: "medium",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-16 bg-[#fffbf5]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-serif text-[#1c1917] mb-3">
            Danh Mục Nổi Bật
          </h2>
          <p className="text-sm text-[#57534e] max-w-md mx-auto">
            Khám phá các bộ sưu tập được yêu thích nhất
          </p>
        </motion.div>

        {/* Masonry Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Large Item */}
          <Link href={categories[0].href} className="group relative col-span-2 row-span-2 aspect-square overflow-hidden">
            <Image
              src={categories[0].image}
              alt={categories[0].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl md:text-2xl font-serif text-white mb-2">{categories[0].name}</h3>
              <span className="inline-block text-sm text-white/80 border-b border-white/40 pb-1 group-hover:border-white transition-colors">
                Xem bộ sưu tập
              </span>
            </div>
          </Link>

          {/* Small Items */}
          {categories.slice(1, 3).map((category) => (
            <Link key={category.id} href={category.href} className="group relative aspect-square overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-base md:text-lg font-serif text-white">{category.name}</h3>
              </div>
            </Link>
          ))}

          {/* Medium Item */}
          <Link href={categories[3].href} className="group relative col-span-2 aspect-[2/1] overflow-hidden">
            <Image
              src={categories[3].image}
              alt={categories[3].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl md:text-2xl font-serif text-white mb-2">{categories[3].name}</h3>
              <span className="inline-block text-sm text-white/80 border-b border-white/40 pb-1 group-hover:border-white transition-colors">
                Đăng ký ngay
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

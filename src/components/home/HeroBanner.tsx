"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1920&q=80",
    title: "Nghệ Thuật Thêu Tay",
    subtitle: "Truyền thống Việt Nam",
    description: "Mỗi đường kim mũi chỉ đều mang theo tâm huyết và kỹ nghệ được truyền lại qua nhiều thế hệ.",
    cta: "Khám phá bộ sưu tập",
    href: "/san-pham",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1920&q=80",
    title: "Khóa Học Thêu Online",
    subtitle: "Học từ cơ bản đến nâng cao",
    description: "Trải nghiệm nghệ thuật thêu tay với các khóa học được thiết kế bài bản.",
    cta: "Đăng ký ngay",
    href: "/khoa-hoc",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=1920&q=80",
    title: "Phụ Kiện Thêu Cao Cấp",
    subtitle: "Khung, chỉ, kim chất lượng",
    description: "Tất cả dụng cụ bạn cần để bắt đầu hành trình thêu tay.",
    cta: "Mua ngay",
    href: "/phu-kien",
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl"
          >
            <p className="text-sm md:text-base tracking-[0.3em] text-white/80 uppercase mb-4">
              {slides[currentSlide].subtitle}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-base md:text-lg text-white/90 mb-8 max-w-xl mx-auto">
              {slides[currentSlide].description}
            </p>
            <Link
              href={slides[currentSlide].href}
              className="inline-block bg-white text-[#1c1917] px-8 py-4 text-sm font-medium tracking-wide hover:bg-[#b45309] hover:text-white transition-all duration-300"
            >
              {slides[currentSlide].cta}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 text-white/70 hover:text-white transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 text-white/70 hover:text-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={32} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

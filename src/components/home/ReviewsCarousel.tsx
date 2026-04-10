"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    id: "1",
    name: "Nguyễn Thị Minh",
    location: "Hà Nội",
    rating: 5,
    text: "My husband bought me my Tranh Hoa Sen embroidery and I love it! The design is so beautiful and the details are so delicate that it instantly elevates my home decor. From traditional to modern style — it just works with everything.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    id: "2",
    name: "Trần Văn Hùng",
    location: "TP. Hồ Chí Minh",
    rating: 5,
    text: "I bought quite a few embroidery artworks from Hoa Thượng over the years. My wife loves them and displays them often. She says that she loves both the unique designs as well as how well the pieces are crafted.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    id: "3",
    name: "Lê Thị Hương",
    location: "Đà Nẵng",
    rating: 5,
    text: "I got my embroidery frame from the Premium Collection. So happy with it! Looks stylish, is designed for the everyday practicality of a busy artist, and the wood is luxuriously soft to the touch!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
];

export default function ReviewsCarousel() {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <section className="bg-[#fffbf5] py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-serif text-[#1c1917]">
            Khách Hàng Nói Gì
          </h2>
        </motion.div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-sm relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 left-4">
                <div className="w-10 h-10 bg-[#b45309]/10 rounded-full flex items-center justify-center">
                  <Quote className="h-5 w-5 text-[#b45309]" />
                </div>
              </div>

              <div className="pt-8">
                {/* Review Text */}
                <p className="text-[#1c1917] mb-6 leading-relaxed">
                  {review.text}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-[#1c1917]">—{review.name}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <button className="p-2 text-[#57534e] hover:text-[#b45309] transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            <button className="w-2 h-2 rounded-full bg-[#1c1917]" />
            <button className="w-2 h-2 rounded-full bg-[#e7e5e4] hover:bg-[#b45309]/50" />
          </div>
          <button className="p-2 text-[#57534e] hover:text-[#b45309] transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

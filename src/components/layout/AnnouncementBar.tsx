"use client";

import { motion } from "framer-motion";

export default function AnnouncementBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black text-white py-2 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="mx-8 text-xs font-medium uppercase tracking-wider">
            Miễn phí vận chuyển cho đơn hàng từ 500.000đ • Giảm 10% cho học viên khóa học thêu • Đặt hàng ngay hôm nay
          </span>
        ))}
      </motion.div>
    </div>
  );
}

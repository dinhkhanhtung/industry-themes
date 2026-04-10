"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const footerLinks = {
  shop: [
    { name: "Tranh Thêu Tay", href: "/san-pham" },
    { name: "Phụ Kiện Thêu", href: "/phu-kien" },
    { name: "Khóa Học Online", href: "/khoa-hoc" },
    { name: "Khung Tranh", href: "/phu-kien" },
  ],
  support: [
    { name: "Hướng Dẫn Mua Hàng", href: "#" },
    { name: "Chính Sách Đổi Trả", href: "#" },
    { name: "Vận Chuyển & Giao Hàng", href: "#" },
    { name: "Câu Hỏi Thường Gặp", href: "#" },
  ],
  company: [
    { name: "Về Chúng Tôi", href: "/gioi-thieu" },
    { name: "Câu Chuyện Thương Hiệu", href: "/gioi-thieu" },
    { name: "Liên Hệ", href: "/lien-he" },
    { name: "Tuyển Dụng", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1c1917] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h3 className="text-xl font-serif mb-2">Đăng Ký Nhận Tin</h3>
              <p className="text-sm text-white/60">Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt</p>
            </div>
            <div className="flex gap-3 max-w-md w-full lg:w-auto">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#b45309]"
              />
              <button className="px-6 py-3 bg-white text-[#1c1917] text-sm font-medium hover:bg-[#b45309] hover:text-white transition-colors">
                Đăng Ký
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-center lg:text-left">
              <div className="text-xl font-serif text-white tracking-wide">
                TRANH THÊU TAY
              </div>
              <div className="text-[10px] tracking-[0.3em] text-white/60 uppercase">
                Hoa Thượng
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              Kế thừa tinh hoa nghề thêu truyền thống, mang đến những tác phẩm nghệ thuật độc đáo và ý nghĩa. Mỗi đường kim mũi chỉ đều chứa đựng tâm huyết và kỹ nghệ.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-[#b45309] hover:text-[#b45309] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-[#b45309] hover:text-[#b45309] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="mb-5 text-xs font-medium tracking-[0.2em] uppercase text-white/80">
              Cửa Hàng
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-[#b45309] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="mb-5 text-xs font-medium tracking-[0.2em] uppercase text-white/80">
              Hỗ Trợ
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-[#b45309] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-xs font-medium tracking-[0.2em] uppercase text-white/80">
              Liên Hệ
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#b45309] mt-0.5" />
                <span className="text-sm text-white/60">0982 581 222</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#b45309] mt-0.5" />
                <span className="text-sm text-white/60">info@hoathuong.vn</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-[#b45309] mt-0.5" />
                <span className="text-sm text-white/60">
                  Cũ Văn, Thái Nguyên, Việt Nam
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              © 2024 Tranh Thêu Tay Hoa Thượng. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-xs text-white/40 hover:text-white/60 transition-colors">
                Chính sách bảo mật
              </Link>
              <Link href="#" className="text-xs text-white/40 hover:text-white/60 transition-colors">
                Điều khoản sử dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

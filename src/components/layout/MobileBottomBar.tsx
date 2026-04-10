"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, ShoppingBag, Phone, Menu, X, Search, User } from "lucide-react";

const menuItems = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/san-pham", label: "Sản phẩm", icon: Search },
  { href: "/gio-hang", label: "Giỏ hàng", icon: ShoppingBag, badge: true },
  { href: "/lien-he", label: "Liên hệ", icon: Phone },
];

export default function MobileBottomBar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [cartCount, setCartCount] = useState(2); // Mock cart count
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only show on mobile devices
    const checkMobile = () => {
      setIsVisible(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) return null;

  // Don't show on admin pages
  if (pathname?.startsWith("/admin")) return null;

  if (!isVisible) return null;

  return (
    <>
      {/* Main Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e7e5e4] z-50 lg:hidden">
        <div className="flex items-center justify-around h-16 safe-area-pb">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center flex-1 h-full relative"
              >
                <div className="relative">
                  <Icon 
                    size={22} 
                    className={`transition-colors ${isActive ? "text-[#b45309]" : "text-[#57534e]"}`}
                  />
                  {/* Cart Badge */}
                  {item.badge && cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#b45309] text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] mt-1 font-medium ${isActive ? "text-[#b45309]" : "text-[#57534e]"}`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#b45309] rounded-full"
                  />
                )}
              </Link>
            );
          })}
          
          {/* Menu Button */}
          <button
            onClick={() => setShowMenu(true)}
            className="flex flex-col items-center justify-center flex-1 h-full"
          >
            <Menu size={22} className="text-[#57534e]" />
            <span className="text-[10px] mt-1 font-medium text-[#57534e]">Menu</span>
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      {showMenu && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
          onClick={() => setShowMenu(false)}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-[#e7e5e4] rounded-full" />
            </div>
            
            {/* Close Button */}
            <div className="flex items-center justify-between px-4 pb-4 border-b border-[#e7e5e4]">
              <h3 className="font-medium text-[#1c1917]">Menu</h3>
              <button 
                onClick={() => setShowMenu(false)}
                className="p-2 hover:bg-[#f5f5f4] rounded-lg transition-colors"
              >
                <X size={20} className="text-[#57534e]" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="p-4 space-y-1">
              <Link
                href="/"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f5f5f4] transition-colors"
              >
                <Home size={20} className="text-[#b45309]" />
                <span className="text-[#1c1917]">Trang chủ</span>
              </Link>
              <Link
                href="/san-pham"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f5f5f4] transition-colors"
              >
                <ShoppingBag size={20} className="text-[#b45309]" />
                <span className="text-[#1c1917]">Sản phẩm</span>
              </Link>
              <Link
                href="/bai-viet"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f5f5f4] transition-colors"
              >
                <svg className="w-5 h-5 text-[#b45309]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 01-2-2V9a2 2 0 012-2h.01M15 13h.01M9 13h.01M9 17h.01M15 17h.01" />
                </svg>
                <span className="text-[#1c1917]">Blog / Tin tức</span>
              </Link>
              <Link
                href="/gio-hang"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f5f5f4] transition-colors"
              >
                <ShoppingBag size={20} className="text-[#b45309]" />
                <span className="text-[#1c1917]">Giỏ hàng</span>
                {cartCount > 0 && (
                  <span className="ml-auto w-5 h-5 bg-[#b45309] text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                href="/lien-he"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f5f5f4] transition-colors"
              >
                <Phone size={20} className="text-[#b45309]" />
                <span className="text-[#1c1917]">Liên hệ</span>
              </Link>
            </div>

            {/* Contact Buttons */}
            <div className="p-4 border-t border-[#e7e5e4]">
              <p className="text-sm text-[#57534e] mb-3">Liên hệ ngay</p>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:0982581222"
                  className="flex items-center justify-center gap-2 p-3 bg-green-500 text-white rounded-lg text-sm font-medium"
                >
                  <Phone size={18} />
                  Gọi điện
                </a>
                <a
                  href="https://zalo.me/0982581222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 bg-[#0068FF] text-white rounded-lg text-sm font-medium"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                  Chat Zalo
                </a>
              </div>
            </div>

            {/* User Account */}
            <div className="p-4 border-t border-[#e7e5e4]">
              <Link
                href="/tai-khoan"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f5f5f4] transition-colors"
              >
                <User size={20} className="text-[#57534e]" />
                <span className="text-[#1c1917]">Tài khoản</span>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Safe area padding for iOS */}
      <style jsx global>{`
        .safe-area-pb {
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
      `}</style>
    </>
  );
}

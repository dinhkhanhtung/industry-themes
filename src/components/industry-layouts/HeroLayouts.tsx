/**
 * HERO LAYOUTS - Giai đoạn 3
 * Mỗi ngành có Hero section khác nhau
 */

import { IndustryType } from "@/lib/industry-themes";
import { Play, ArrowRight, Sparkles, TreePine, Shirt, Coffee, BookOpen, Heart, Plane } from "lucide-react";

interface HeroLayoutProps {
  brandName: string;
  slogan: string;
  theme: any;
  onCtaClick?: () => void;
}

// ============================================
// 1. TRANGH THÊU: Slider nghệ thuật, tinh tế
// ============================================
export function ArtHero({ brandName, slogan, theme, onCtaClick }: HeroLayoutProps) {
  return (
    <div className="relative min-h-[600px] flex items-center overflow-hidden" style={{ backgroundColor: theme.colors.background }}>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-amber-200 to-orange-100 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-gradient-to-br from-yellow-100 to-amber-200 blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: theme.colors.surface, color: theme.colors.primary }}>
            <Sparkles size={16} />
            <span>Nghệ thuật thủ công</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: theme.colors.text.primary, fontFamily: theme.typography.headingFont }}>
            {brandName}
          </h1>
          <p className="text-xl" style={{ color: theme.colors.text.secondary }}>
            {slogan}
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onCtaClick}
              className="px-8 py-4 rounded-xl font-bold text-white flex items-center gap-2 transition-transform hover:scale-105"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Khám phá ngay <ArrowRight size={20} />
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800" 
              alt="Sản phẩm nghệ thuật"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
            <p className="text-sm font-medium" style={{ color: theme.colors.primary }}>100+ tác phẩm</p>
            <p className="text-xs text-gray-500">Handmade unique</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 2. ĐỒ GỖ: Grid sản phẩm, mạnh mẽ
// ============================================
export function WoodHero({ brandName, slogan, theme, onCtaClick }: HeroLayoutProps) {
  return (
    <div className="relative min-h-[500px] flex items-center" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1 space-y-6">
            <TreePine size={48} style={{ color: theme.colors.primary }} />
            <h1 className="text-4xl font-bold" style={{ color: theme.colors.text.primary, fontFamily: theme.typography.headingFont }}>
              {brandName}
            </h1>
            <p className="text-lg" style={{ color: theme.colors.text.secondary }}>
              {slogan}
            </p>
            <button 
              onClick={onCtaClick}
              className="px-6 py-3 rounded font-bold text-white"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Xem bộ sưu tập
            </button>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" alt="Sofa gỗ" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400" alt="Bàn gỗ" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400" alt="Tủ gỗ" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400" alt="Kệ gỗ" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 3. THỜI TRANG: Split screen, trendy
// ============================================
export function FashionHero({ brandName, slogan, theme, onCtaClick }: HeroLayoutProps) {
  return (
    <div className="relative min-h-[600px] flex" style={{ backgroundColor: theme.colors.background }}>
      <div className="flex-1 flex items-center">
        <div className="max-w-xl mx-auto px-8 space-y-6">
          <div className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: theme.colors.primary }}>
            <Shirt size={20} />
            <span>Bộ sưu tập mới</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-none" style={{ color: theme.colors.text.primary, fontFamily: theme.typography.headingFont }}>
            {brandName}
          </h1>
          <p className="text-xl" style={{ color: theme.colors.text.secondary }}>
            {slogan}
          </p>
          <button 
            onClick={onCtaClick}
            className="px-8 py-4 rounded-full font-bold text-white flex items-center gap-2"
            style={{ backgroundColor: theme.colors.primary }}
          >
            Mua sắm ngay <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <div className="hidden md:block flex-1 relative">
        <img 
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800" 
          alt="Fashion model"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
      </div>
    </div>
  );
}

// ============================================
// 4. MỸ PHẨM: Elegant, luxury
// ============================================
export function BeautyHero({ brandName, slogan, theme, onCtaClick }: HeroLayoutProps) {
  return (
    <div className="relative min-h-[500px] flex items-center justify-center overflow-hidden" style={{ backgroundColor: theme.colors.background }}>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-pink-100 blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-purple-100 blur-3xl opacity-50" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 text-center space-y-8">
        <Heart size={48} className="mx-auto" style={{ color: theme.colors.primary }} />
        <h1 className="text-5xl md:text-6xl font-bold" style={{ color: theme.colors.text.primary, fontFamily: theme.typography.headingFont }}>
          {brandName}
        </h1>
        <p className="text-2xl" style={{ color: theme.colors.text.secondary }}>
          {slogan}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={onCtaClick}
            className="px-8 py-4 rounded-full font-bold text-white"
            style={{ backgroundColor: theme.colors.primary }}
          >
            Khám phá bộ sưu tập
          </button>
          <button 
            className="px-8 py-4 rounded-full font-bold border-2 flex items-center gap-2"
            style={{ borderColor: theme.colors.primary, color: theme.colors.primary }}
          >
            <Play size={20} /> Xem video
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 5. ẨM THỰC: Warm, appetizing
// ============================================
export function FoodHero({ brandName, slogan, theme, onCtaClick }: HeroLayoutProps) {
  return (
    <div className="relative min-h-[500px]" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400" alt="Món ăn" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400" alt="Salad" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400" alt="Pizza" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400" alt="Bánh" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Coffee size={48} style={{ color: theme.colors.primary }} />
            <h1 className="text-4xl md:text-5xl font-bold" style={{ color: theme.colors.text.primary, fontFamily: theme.typography.headingFont }}>
              {brandName}
            </h1>
            <p className="text-xl" style={{ color: theme.colors.text.secondary }}>
              {slogan}
            </p>
            <button 
              onClick={onCtaClick}
              className="px-8 py-4 rounded-xl font-bold text-white"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Đặt món ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 6. CÔNG NGHỆ: Modern, clean
// ============================================
export function TechHero({ brandName, slogan, theme, onCtaClick }: HeroLayoutProps) {
  return (
    <div className="relative min-h-[500px] flex items-center" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-7xl mx-auto px-4 w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-block px-4 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: theme.colors.surface, color: theme.colors.primary }}>
            New Arrival 2024
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: theme.colors.text.primary, fontFamily: theme.typography.headingFont }}>
            {brandName}
          </h1>
          <p className="text-lg" style={{ color: theme.colors.text.secondary }}>
            {slogan}
          </p>
          <div className="flex gap-4">
            <button 
              onClick={onCtaClick}
              className="px-6 py-3 rounded-lg font-bold text-white"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Mua ngay
            </button>
            <button 
              className="px-6 py-3 rounded-lg font-bold border"
              style={{ borderColor: theme.colors.border, color: theme.colors.text.primary }}
            >
              Tìm hiểu thêm
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600" 
              alt="Tech product"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 7. DU LỊCH: Adventure, spacious
// ============================================
export function TravelHero({ brandName, slogan, theme, onCtaClick }: HeroLayoutProps) {
  return (
    <div className="relative min-h-[600px] flex items-center justify-center">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600" 
          alt="Travel destination"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 text-center text-white space-y-6">
        <Plane size={48} className="mx-auto" />
        <h1 className="text-5xl md:text-6xl font-bold" style={{ fontFamily: theme.typography.headingFont }}>
          {brandName}
        </h1>
        <p className="text-2xl text-white/90">
          {slogan}
        </p>
        <button 
          onClick={onCtaClick}
          className="px-8 py-4 rounded-full font-bold text-white bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
        >
          Khám phá điểm đến
        </button>
      </div>
    </div>
  );
}

// ============================================
// 8. SÁCH: Knowledge, cozy
// ============================================
export function BookHero({ brandName, slogan, theme, onCtaClick }: HeroLayoutProps) {
  return (
    <div className="relative min-h-[500px] flex items-center" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="space-y-6">
            <BookOpen size={48} style={{ color: theme.colors.primary }} />
            <h1 className="text-4xl font-bold" style={{ color: theme.colors.text.primary, fontFamily: theme.typography.headingFont }}>
              {brandName}
            </h1>
            <p className="text-lg" style={{ color: theme.colors.text.secondary }}>
              {slogan}
            </p>
            <button 
              onClick={onCtaClick}
              className="px-6 py-3 rounded-lg font-bold text-white"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Xem thư viện
            </button>
          </div>
          <div className="md:col-span-2 grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={`https://images.unsplash.com/photo-${i % 2 === 0 ? '1544947950-fa07a98d237f' : '1512820790803-83ca734da794'}?w=300`}
                  alt={`Book ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// HERO SELECTOR - Chọn layout theo ngành
// ============================================
export function IndustryHero({ industry, ...props }: HeroLayoutProps & { industry: IndustryType }) {
  switch (industry) {
    case "tranh-theu":
    case "gom-su":
    case "trang-suc":
      return <ArtHero {...props} />;
    
    case "do-go":
      return <WoodHero {...props} />;
    
    case "thoi-trang":
    case "giay-dep":
      return <FashionHero {...props} />;
    
    case "my-pham":
      return <BeautyHero {...props} />;
    
    case "am-thuc":
    case "do-uong":
      return <FoodHero {...props} />;
    
    case "do-dien-tu":
    case "phu-kien-cong-nghe":
    case "do-gia-dung":
    case "noi-that":
    case "den-trang-tri":
      return <TechHero {...props} />;
    
    case "du-lich":
      return <TravelHero {...props} />;
    
    case "sach-vpp":
    case "giao-duc":
      return <BookHero {...props} />;
    
    default:
      return <TechHero {...props} />;
  }
}

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const metadata: Metadata = {
  title: "Phụ Kiện Thêu - Tranh Thêu Tay Hoa Thượng",
  description: "Khung tranh, kim chỉ, vải canvas và các phụ kiện thêu tay cao cấp.",
};

const accessories = [
  {
    id: "1",
    name: "Khung thêu gỗ sồi cao cấp 40x50cm",
    price: 450000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    category: "Khung tranh",
  },
  {
    id: "2",
    name: "Khung thêu nhôm điều chỉnh 30x40cm",
    price: 280000,
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&q=80",
    category: "Khung tranh",
  },
  {
    id: "3",
    name: "Bộ chỉ thêu 100 màu cao cấp",
    price: 280000,
    image: "https://images.unsplash.com/photo-1606293926075-69a00febf281?w=600&q=80",
    category: "Chỉ thêu",
  },
  {
    id: "4",
    name: "Kim thêu vàng Nhật Bản (set 12 cây)",
    price: 180000,
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&q=80",
    category: "Kim thêu",
  },
  {
    id: "5",
    name: "Vải canvas Aida 14ct - 50x70cm",
    price: 85000,
    image: "https://images.unsplash.com/photo-1623947038525-8c973b2c0616?w=600&q=80",
    category: "Vải thêu",
  },
  {
    id: "6",
    name: "Hộp đựng kim chỉ 3 tầng",
    price: 150000,
    image: "https://images.unsplash.com/photo-1606293926075-69a00febf281?w=600&q=80",
    category: "Dụng cụ",
  },
];

export default function AccessoriesPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-[#fffbf5] py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-serif text-[#1c1917] mb-4">
            Phụ Kiện Thêu Tay
          </h1>
          <p className="text-[#57534e] max-w-2xl mx-auto">
            Khung tranh, kim chỉ, vải canvas và các dụng cụ thêu tay cao cấp để bạn thỏa sức sáng tạo
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {accessories.map((product) => (
            <Link key={product.id} href={`/san-pham/${product.id}`} className="group">
              <div className="relative aspect-square overflow-hidden bg-[#f5f5f4] mb-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="text-center">
                <p className="text-xs text-[#57534e] mb-1">{product.category}</p>
                <h3 className="text-sm text-[#1c1917] mb-1 line-clamp-2 min-h-[40px]">
                  {product.name}
                </h3>
                <p className="text-sm font-medium text-[#b45309]">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import MobileBottomBar from "@/components/layout/MobileBottomBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tranh Thêu Tay Hoa Thượng - Nghệ thuật thêu truyền thống",
  description: "Kế thừa tinh hoa nghề thêu truyền thống, mang đến những tác phẩm nghệ thuật độc đáo và ý nghĩa. Tranh thêu tay, phụ kiện thêu, khóa học thêu online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <BackToTop />
        <MobileBottomBar />
      </body>
    </html>
  );
}

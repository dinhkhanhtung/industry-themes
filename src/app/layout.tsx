import type { Metadata } from "next";
import { Be_Vietnam_Pro, Noto_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import ClientLayout from "@/components/ClientLayout";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam",
});

const notoSans = Noto_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  title: "Website Bán Hàng | Giải Pháp E-commerce",
  description: "Nền tảng website bán hàng đa ngành nghề với 19 theme chuyên biệt. Hỗ trợ cửa hàng, khóa học online và quản lý đơn hàng.",
  keywords: "website bán hàng, e-commerce, cửa hàng online, khóa học online, quản lý đơn hàng",
  authors: [{ name: "Industry Themes" }],
  creator: "Industry Themes",
  publisher: "Industry Themes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://localhost:3000"),
  openGraph: {
    title: "Website Bán Hàng | Giải Pháp E-commerce",
    description: "Nền tảng website bán hàng đa ngành nghề với 19 theme chuyên biệt.",
    url: process.env.NEXTAUTH_URL || "https://localhost:3000",
    siteName: "Industry Themes",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tranh Thêu Tay - Nghệ Thuật Truyền Thống",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tranh Thêu Tay | Khóa Học Thêu & Phụ Kiện",
    description: "Chuyên tranh thêu tay thủ công tinh xảo, khóa học thêu và phụ kiện thêu cao cấp.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${beVietnamPro.variable} ${notoSans.variable} font-sans antialiased`} suppressHydrationWarning>
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}

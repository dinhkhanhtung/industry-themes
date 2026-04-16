# 📋 Project Documentation
## E-commerce & E-learning Platform Template

**Version:** 2.0  
**Last Updated:** April 10, 2026  
**Tech Stack:** Next.js 14 + TypeScript + TailwindCSS + Firebase Firestore + ImgBB + Framer Motion + shadcn/ui

---

## 🎯 Tổng quan dự án

Website bán tranh thêu tay và các sản phẩm thêu truyền thống với:
- **Frontend:** Website chính (homepage, shop, blog, courses)
- **Backend:** Admin Dashboard (quản lý nội dung, sản phẩm, orders)
- **Database:** Firebase Firestore
- **Image Hosting:** ImgBB API
- **Deploy:** Vercel

**Tên thương hiệu:** [Tên của bạn]
**Lĩnh vực:** [Lĩnh vực kinh doanh của bạn]
**SĐT:** [Số điện thoại]
**Địa chỉ:** [Địa chỉ của bạn]
**Website:** [URL website của bạn]

---

## 🎯 Mục tiêu
1. Website thương mại điện tử bán tranh thêu tay, túi thêu, cặp tóc thêu
2. Blog chia sẻ kiến thức thêu truyền thống
3. Khóa học thêu online
4. Admin Dashboard quản lý toàn bộ nội dung

---

## 🎨 Design System

### Color Palette
```css
--primary: #b45309;      /* Bronze Brown - Màu chính */
--bg-primary: #fffbf5;   /* Off-white - Nền chính */
--text-primary: #1c1917;  /* Stone-900 - Text chính */
--text-secondary: #57534e;/* Stone-600 - Text phụ */
--border: #e7e5e4;        /* Stone-200 - Viền */
--success: #22c55e;
--warning: #f59e0b;
--error: #ef4444;
```

### Typography
```css
--font-family: 'Inter', sans-serif;
--font-serif: font-serif cho tiêu đề chính;
--font-size-base: 16px;
--h1-size: 48px (desktop), 36px (mobile);
--h2-size: 30px (desktop), 24px (mobile);
--tracking-wider: 0.2em uppercase cho labels;
--tracking-[0.3em]: 0.3em uppercase cho brand;
```

### Spacing
```css
--spacing-unit: 4px;
--container-max-width: 1400px;
--border-radius: 8px;
```

### Components
- **Buttons:** Bronze primary, outline secondary, với hover effects
- **Cards:** Rounded-lg, shadow-sm → shadow-xl on hover
- **Inputs:** Border-[#e7e5e4], focus:border-[#b45309]
- **Badges:** Gradient bronze, rounded-full

### Animations
- **Framer Motion** cho page transitions, hover effects
- **Duration:** 300ms (fast), 500ms (normal), 700ms (slow)
- **Easing:** ease-out cho hầu hết transitions

---

## 🏗️ Kiến trúc hệ thống

### Database Schema (Firestore) (CHƯA KẾT NỐI - HIỆN DÙNG MOCK DATA)

**NOTE:** Hiện tại DÙNG MOCK DATA trong components. Chưa kết nối Firebase.

```typescript
// Collections (sẽ kết nối sau)
posts/{postId}           // Bài viết blog
products/{productId}     // Sản phẩm
categories/{categoryId}  // Danh mục
contacts/{contactId}     // Liên hệ khách hàng
admins/{adminId}         // Người dùng admin
settings/{settingId}     // Cấu hình site
banners/{bannerId}       // Banner/Slider
media/{mediaId}          // Thư viện ảnh
orders/{orderId}         // Đơn hàng
```

### Data Models

```typescript
// Post (Bài viết)
interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;           // HTML content
  excerpt: string;         // Tóm tắt 200 chars
  thumbnail: string;       // URL ảnh từ ImgBB
  images: string[];      // Gallery ảnh
  category: string;        // Reference to category
  tags: string[];
  author: string;
  status: 'draft' | 'published' | 'archived';
  views: number;
  likes: number;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt: Timestamp | null;
}

// Product (Sản phẩm)
interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  thumbnail: string;
  category: string;
  colors: string[];        // Hex codes
  sizes: string[];
  stock: number;
  sku: string;
  badge?: 'new' | 'sale' | 'bestseller';
  status: 'active' | 'inactive' | 'out_of_stock';
  seo: SEO;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Category (Danh mục)
interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parent?: string;         // Parent category ID
  order: number;          // Display order
  type: 'product' | 'post';
  isActive: boolean;
}

// Contact (Liên hệ)
interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'spam';
  createdAt: Timestamp;
  repliedAt?: Timestamp;
  notes?: string;
}

// Admin User
interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'editor';
  permissions: string[];
  isActive: boolean;
  lastLoginAt: Timestamp;
  createdAt: Timestamp;
}

// Site Settings
interface SiteSettings {
  id: 'default';
  siteName: string;
  tagline: string;
  logo: string;
  favicon: string;
  contact: {
    phone: string;
    email: string;
    address: string;
    zalo?: string;
    facebook?: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    ogImage: string;
  };
  features: {
    enableBlog: boolean;
    enableCart: boolean;
    enableReviews: boolean;
    enableContactForm: boolean;
  };
}

// Banner/Slider
interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  position: 'hero' | 'promo' | 'sidebar';
  order: number;
  isActive: boolean;
  startDate?: Timestamp;
  endDate?: Timestamp;
}
```

---

## 📁 Cấu trúc thư mục hiện tại

```
my-app/
├── src/
│   ├── app/                          # Next.js 14 App Router
│   │   ├── (admin)/                  # Admin routes group
│   │   │   ├── admin/
│   │   │   │   ├── login/page.tsx    # Admin login
│   │   │   │   ├── page.tsx         # Admin dashboard
│   │   │   │   └── layout.tsx       # Admin layout (không có header chính)
│   │   │   └── layout.tsx           # Admin group layout
│   │   ├── admin/                   # Admin dashboard routes (legacy)
│   │   │   ├── page.tsx             # Dashboard
│   │   │   ├── login/page.tsx       # Login
│   │   │   └── posts/               # Posts management
│   │   ├── bai-viet/                # Blog posts
│   │   │   ├── page.tsx             # Blog listing (with skeleton loading)
│   │   │   ├── [id]/page.tsx        # Blog detail
│   │   │   └── layout.tsx           # Blog layout (metadata)
│   │   ├── gioi-thieu/page.tsx      # About page
│   │   ├── khoa-hoc/page.tsx        # Courses page
│   │   ├── lien-he/page.tsx         # Contact page
│   │   ├── phu-kien/page.tsx        # Accessories page
│   │   ├── san-pham/
│   │   │   ├── page.tsx             # Shop listing
│   │   │   └── [id]/page.tsx        # Product detail
│   │   ├── globals.css              # Global styles
│   │   └── layout.tsx               # Root layout
│   ├── components/
│   │   ├── blog/
│   │   │   └── BlogSkeleton.tsx     # Loading skeleton for blog
│   │   ├── home/
│   │   │   ├── HeroBanner.tsx       # Slider with 3 images
│   │   │   ├── ProductGrid.tsx      # Product grid with tabs (New/Bestsellers)
│   │   │   ├── FeaturedCategories.tsx # Masonry grid categories
│   │   │   ├── OurValues.tsx        # Values section
│   │   │   ├── BlogSection.tsx      # Blog preview on home
│   │   │   └── ReviewsCarousel.tsx  # Customer reviews
│   │   ├── layout/
│   │   │   ├── Header.tsx           # Main header (fixed top-[32px])
│   │   │   ├── Footer.tsx           # Footer
│   │   │   ├── AnnouncementBar.tsx  # Scrolling text bar (fixed top-0)
│   │   │   ├── MobileBottomBar.tsx  # Mobile navigation (Trang chủ, Sản phẩm, Giỏ hàng, Tin tức, Tài khoản)
│   │   │   ├── FloatingContactBar.tsx # PC floating contact (Maps, Zalo, Phone, Messenger)
│   │   │   └── BackToTop.tsx        # Back to top button
│   │   └── ui/                      # shadcn/ui components
│   ├── hooks/                       # Custom hooks
│   ├── lib/
│   │   └── firebase.ts              # Firebase config
│   └── types/
│       └── index.ts                 # TypeScript types
├── public/                          # Static assets
├── .env.example                     # Environment variables template
├── DESIGN.md                        # Design system doc
├── PROJECT.md                       # This file
└── package.json
```

---

## 🚀 Cách chạy dự án

### 1. Cài đặt dependencies
```bash
cd my-app
npm install
```

### 2. Cấu hình Environment Variables
Copy `.env.example` sang `.env.local`:
```bash
cp .env.example .env.local
```

Thêm các biến môi trường:
```env
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# ImgBB API Key
IMGBB_KEY=
```

### 3. Chạy development server
```bash
npm run dev
```
Mở http://localhost:3000

### 4. Build cho production
```bash
npm run build
npm start
```

---

## 📦 Dependencies chính

```json
{
  "next": "14.2.35",
  "react": "^18.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.0.0",
  "framer-motion": "^11.0.0",
  "firebase": "^10.0.0",
  "lucide-react": "^0.400.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0"
}
```

---

## 🎯 Các trang chính

### 1. Homepage (/)
- **HeroBanner:** Slider 3 ảnh với navigation arrows và indicators
- **FeaturedCategories:** Masonry grid 4 danh mục (Tranh thêu hoa, Tranh thêu chim, Tranh thêu cô gái, Khóa học)
- **ProductGrid:** Grid 4 cột với tabs "Sản Phẩm Mới" / "Bán Chạy"
- **OurValues:** 2 giá trị cốt lõi với ảnh
- **BlogSection:** 3 bài viết mới nhất
- **ReviewsCarousel:** Carousel đánh giá khách hàng

### 2. Shop (/san-pham)
- Sidebar filters (Danh mục, Giá, Màu sắc)
- Grid sản phẩm với Quick View modal
- Sorting (Mới nhất, Giá thấp-cao, Bán chạy)

### 3. Product Detail (/san-pham/[id])
- Gallery ảnh với thumbnail
- Thông tin sản phẩm (giá, mô tả, màu sắc)
- Reviews section
- Related products
- Add to cart

### 4. Blog (/bai-viet)
- Skeleton loading (1.5s delay)
- Grid bài viết với category, date, read time
- Filters by category

### 5. Blog Detail (/bai-viet/[id])
- Full content bài viết
- Related posts
- Breadcrumb navigation

### 6. Courses (/khoa-hoc)
- Hero image
- Grid khóa học với badge
- Course detail modal

### 7. About (/gioi-thieu)
- Story section
- Team section
- Values section

### 8. Contact (/lien-he)
- Contact form
- Map embed
- Contact info

### 9. Accessories (/phu-kien)
- Grid phụ kiện thêu

### 10. Admin (/admin)
- Login page
- Dashboard (stats, recent orders, popular posts)
- Posts CRUD
- Products CRUD
- Settings

---

## 🎨 UI/UX Requirements

### Main Website Layout Structure
```
Root Layout
├── AnnouncementBar (fixed top-0, z-50)
├── Header (fixed top-[32px], z-40)
│   ├── Logo: "TRANH THÊU TAY" + "Hằng Khoa"
│   ├── Navigation: Trang chủ, Sản phẩm, Tranh thêu hoa, Tranh thêu chim, Tranh thêu cô gái, Tranh thêu cá, Biểu tượng, Giới thiệu, Khóa học, Blog
│   ├── Icons: Search, Cart
│   └── Mega Menu (hover)
├── Main Content (pt-[80px] lg:pt-[90px])
└── Footer
└── Mobile Components
    ├── MobileBottomBar (mobile only)
    ├── FloatingContactBar (PC only, scroll > 300px)
    └── BackToTop
```

---

## 🐛 Các vấn đề đã gặp và giải pháp

### 1. Header không cố định khi cuộn
**Vấn đề:** Header dùng `sticky` nhưng không hoạt động đúng
**Giải pháp:** Đổi sang `fixed` với `top-[32px]` (dưới AnnouncementBar)
**File:** `src/components/layout/Header.tsx`

### 2. AnnouncementBar bị ẩn
**Vấn đề:** Nằm trong Header component với fixed position
**Giải pháp:** Tách ra khỏi Header, đặt độc lập trong layout với `fixed top-0 z-50`
**File:** `src/app/layout.tsx`, `src/components/layout/Header.tsx`

### 3. Khoảng trắng thừa
**Vấn đề:** Body có `pt-[110px]` gây khoảng trắng lớn
**Giải pháp:** Giảm xuống `pt-[80px] lg:pt-[90px]` (32px cho announcement + 48-58px cho header)
**File:** `src/app/layout.tsx`

### 4. ESLint Error: Unused import
**Vấn đề:** `AnnouncementBar` import thừa trong Header sau khi tách ra
**Giải pháp:** Xóa import thừa
**File:** `src/components/layout/Header.tsx`

### 5. Hydration error
**Vấn đề:** Export `metadata` từ client component (`"use client"`)
**Giải pháp:** Tạo `layout.tsx` riêng cho export metadata, giữ page.tsx là client
**File:** `src/app/bai-viet/layout.tsx`

### 6. TypeScript syntax error
**Vấn đề:** Thiếu fragment wrapper `<>` khi tách AnnouncementBar
**Giải pháp:** Thêm fragment wrapper bao quanh header và mobile menu
**File:** `src/components/layout/Header.tsx`

### 7. Blog load quá nhanh
**Vấn đề:** Bài viết load ngay lập tức không có loading animation
**Giải pháp:** Thêm `BlogSkeleton` component với 1.5s delay
**File:** `src/components/blog/BlogSkeleton.tsx`, `src/app/bai-viet/page.tsx`

### 8. Ảnh slide trang chủ rối mắt
**Vấn đề:** Dùng ảnh không phù hợp với chủ đề thêu tay
**Giải pháp:** Khôi phục ảnh cũ (embroidery pattern, peony flower, portrait art)
**File:** `src/components/home/HeroBanner.tsx`

---

## 📝 Quy tắc Coding

### 1. Component Structure
```typescript
// 1. Imports
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// 2. Types/Interfaces (nếu có)
interface Props {
  // ...
}

// 3. Component
export default function ComponentName({ prop }: Props) {
  // Hooks
  const [state, setState] = useState();

  // Handlers
  const handleClick = () => {};

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### 2. File Naming
- Components: PascalCase (e.g., `HeroBanner.tsx`)
- Pages: lowercase với dash (e.g., `gioi-thieu/page.tsx`)
- Hooks: camelCase với prefix `use` (e.g., `useAuth.ts`)
- Utilities: camelCase (e.g., `formatPrice.ts`)

### 3. Class Naming (Tailwind)
- Sử dụng Tailwind classes thay vì custom CSS
- Sắp xếp theo thứ tự: layout → spacing → color → typography → effects
- Responsive: mobile-first, thêm `md:`, `lg:` cho breakpoint lớn hơn

### 4. TypeScript
- Luôn khai báo types cho props
- Tránh `any` type
- Sử dụng `interface` cho object shapes, `type` cho unions/primitives

### 5. Image Handling
- Dùng `next/image` cho tối ưu
- Unsplash URLs format: `https://images.unsplash.com/photo-[id]?w=[width]&q=80`
- Luôn kiểm tra URL trước khi dùng

### 6. State Management
- Local state: `useState`, `useReducer`
- Global state: React Context
- Server state: Chưa kết nối (sẽ dùng SWR khi có Firebase)

### 7. Styling
- Primary color: `#b45309` (bronze)
- Background: `#fffbf5` (off-white)
- Border radius: `rounded-lg` (8px)
- Spacing unit: 4px

---

## 🚀 Deployment Guide

### Vercel Deployment

#### 1. Kết nối GitHub repo
```bash
# Push code lên GitHub
git add .
git commit -m "Deploy to Vercel"
git push origin master
```

#### 2. Cấu hình trong Vercel Dashboard
- Import repo từ GitHub
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Environment Variables: Thêm tất cả từ `.env.local`

#### 3. Environment Variables trong Vercel
```
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx
IMGBB_KEY=xxx
```

#### 4. Deploy
- Vercel auto-deploy khi push lên `master`
- Check build logs nếu có lỗi

### GitHub Repository
- **Repo:** https://github.com/dinhkhanhtung/tranhhangkhoa
- **Branch:** `master`
- **Commit hiện tại:** a0b19c5

---

## 📊 Tình trạng hiện tại

### ✅ Đã hoàn thành
- Homepage với HeroBanner, FeaturedCategories, ProductGrid, OurValues, BlogSection, ReviewsCarousel
- Shop page với filters và grid
- Product detail page
- Blog listing với skeleton loading
- Blog detail page
- Courses page
- About page
- Contact page
- Accessories page
- Header với mega menu
- Footer
- AnnouncementBar (dòng chữ chạy)
- MobileBottomBar
- FloatingContactBar (PC)
- BackToTop button
- Admin login page
- Admin dashboard (basic)
- Admin posts CRUD (basic)

### 🚧 Đang làm / Chưa hoàn thành
- **Firebase Integration:** Chưa kết nối, đang dùng mock data
- **Admin Dashboard:** Chưa hoàn thiện đầy đủ theo PRD
- **Cart System:** Chưa implement
- **Checkout:** Chưa implement
- **Image Upload:** Chưa kết nối ImgBB API
- **Real-time data:** Chưa kết nối Firestore
- **SEO Optimization:** Cần tối ưu thêm

### 📋 TODO (Priority)
1. Kết nối Firebase Firestore
2. Implement Cart system
3. Implement Checkout flow
4. Complete Admin Dashboard theo PRD
5. Add image upload với ImgBB API
6. Implement search functionality
7. Add pagination cho blog và shop
8. Optimize SEO (meta tags, sitemap, robots.txt)
9. Add analytics (Google Analytics)
10. Testing và bug fixes

---

## 🖼️ Nguồn ảnh

### Unsplash Images
- **HeroBanner slides:**
  - Slide 1: `photo-1578301978693-85fa9c0320b9` (embroidery pattern)
  - Slide 2: `photo-1513519245088-0e12902e5a38` (peony flower)
  - Slide 3: `photo-1561839561-b13bcfe95249` (portrait art)

- **Product images (embroidered bags/accessories):**
  - `photo-1584917865442-de89df76afd3` (embroidery)
  - `photo-1549298916-f52e28b5f7b9` (bag)
  - `photo-1566150905458-1bf1fc113f0d` (luxury bag)
  - `photo-1590874103328-eac38a683ce7` (bag)
  - `photo-1617038260897-41a1f14a8ca0` (accessories)
  - `photo-1606760227091-3dd870d97f1d` (hair accessories)
  - `photo-1627123424574-724758594e93` (clutch)
  - `photo-1624222247344-550fb60583dc` (backpack)

### Logo Guidelines
- **Brand name:** Tranh Thêu Tay Hằng Khoa
- **Sub-brand:** Hằng Khoa
- **Font:** Serif cho "TRANH THÊU TAY", Sans-serif uppercase cho "Hằng Khoa"
- **Color:** #1c1917 (dark) cho chính, #57534e (gray) cho phụ
- **Tracking:** 0.3em uppercase cho sub-brand

---

## ❓ FAQ cho Developers

### Q: Làm sao để thêm trang mới?
**A:** 
1. Tạo folder trong `src/app/[page-name]/`
2. Tạo `page.tsx` với default export
3. Thêm link vào Header navigation
4. Update metadata nếu cần

### Q: Làm sao để thay đổi ảnh slide HeroBanner?
**A:** Edit `src/components/home/HeroBanner.tsx`, thay đổi URLs trong `slides` array

### Q: Làm sao để thêm sản phẩm mới vào ProductGrid?
**A:** Edit `src/components/home/ProductGrid.tsx`, thêm object vào `newArrivals` hoặc `bestSellers` array

### Q: Làm sao để thay đổi màu primary?
**A:** 
1. Sửa trong `tailwind.config.ts` nếu cần custom
2. Hoặc dùng trực tiếp `#b45309` trong Tailwind classes
3. Tìm-thay tất cả `#b45309` trong codebase

### Q: Làm sao để kết nối Firebase?
**A:**
1. Tạo Firebase project ở console.firebase.google.com
2. Lấy config keys
3. Thêm vào `.env.local`
4. Import và config trong `src/lib/firebase.ts`
5. Thay thế mock data với Firestore calls

### Q: Làm sao để deploy lên Vercel?
**A:** Push lên GitHub branch `master`, Vercel auto-deploy. Cần set environment variables trong Vercel dashboard.

### Q: Làm sao để fix build error?
**A:**
1. Check Vercel build logs
2. Thường là ESLint error (unused imports, syntax)
3. Fix locally, test với `npm run build`
4. Push lại

### Q: Làm sao để thêm icon mới?
**A:** Import từ `lucide-react`:
```typescript
import { IconName } from "lucide-react";
<IconName size={20} />
```

---

## 🔗 Links hữu ích

- **Firebase Console:** https://console.firebase.google.com
- **ImgBB API:** https://api.imgbb.com/
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Next.js Docs:** https://nextjs.org/docs
- **TailwindCSS Docs:** https://tailwindcss.com/docs
- **Framer Motion Docs:** https://www.framer.com/motion
- **shadcn/ui Docs:** https://ui.shadcn.com
- **GitHub Repo:** https://github.com/dinhkhanhtung/tranhhangkhoa
- **Vercel Deploy:** https://tranhhangkhoa.vercel.app

---

## 📞 Contact Info

**Tên:** Tranh Thêu Tay Hằng Khoa
**SĐT:** 0982581222
**Địa chỉ:** Xóm Hằng Khoa, Cũ Văn, Phú Lương, Thái Nguyên, Việt Nam
**Blogspot:** tranhtheuhangkhoa.blogspot.com

---

**End of Document**

*Lưu ý: Document này cần được cập nhật khi có thay đổi lớn về requirement hoặc architecture. Cập nhật Last Updated và Version khi sửa.*

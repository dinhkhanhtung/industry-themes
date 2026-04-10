# Tranh Thêu Tay Hoa Thượng

Website bán hàng và giới thiệu nghệ thuật thêu tay truyền thống Việt Nam.
Clone từ thiết kế Shen Yun Collections với phong cách luxury e-commerce.

## Tech Stack

- **Framework:** Next.js 14 App Router
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **UI Components:** shadcn/ui
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Database:** Firebase Firestore
- **Image CDN:** ImgBB
- **Deploy:** Vercel

## Màu sắc chủ đạo

- **Primary:** #b45309 (nâu đồng)
- **Background:** #fffbf5 (trắng ngà)
- **Text:** #1c1917 (đen nhạt)
- **Secondary:** #57534e (xám nâu)

## Tính năng chính

### Trang chủ (`/`)
- Hero Banner slideshow với auto-transition
- Features icons section
- Product Grid với tabs "Sản Phẩm Mới" / "Bán Chạy"
- Featured Categories masonry grid
- Our Values section (3 blocks ảnh/text xen kẽ)
- Loyalty Program signup form
- Reviews Carousel (3 cột)
- Blog Section (3 bài mới nhất)

### Trang sản phẩm (`/san-pham`)
- Sidebar bộ lọc: Danh mục, Giá (slider), Màu sắc (swatches), Tình trạng
- Product grid 3 cột với Quick View
- Sort dropdown: Nổi bật, Mới nhất, Giá

### Chi tiết sản phẩm (`/san-pham/[id]`)
- Gallery ảnh dọc + main image
- Color swatches & Size selection
- Collapsible: Chi tiết SP, Vận chuyển & Đổi trả
- Reviews với star breakdown
- "You may also like" carousel

### Giỏ hàng (`/gio-hang`)
- Quản lý sản phẩm, cập nhật số lượng
- Tóm tắt đơn hàng, mã giảm giá
- Free shipping progress bar

### Blog (`/bai-viet`)
- Grid listing với category filter
- Detail page với rich content, author info
- Share buttons, related posts

### Admin Dashboard (`/admin`)
- Dashboard stats
- Quản lý bài viết (CRUD)
- Import dữ liệu từ Blogspot
- Quản lý danh mục
- Settings (ImgBB, Firestore config)

## Chuẩn bị trước khi deploy

### 1. Tạo tài khoản & API Keys

**ImgBB (Lưu ảnh):**
1. Truy cập: https://api.imgbb.com/
2. Đăng ký và lấy API key
3. Lưu vào `.env.local`

**Firebase (Database):**
1. Vào https://console.firebase.google.com
2. Tạo project mới
3. Vào Project Settings → General → Web App
4. Copy config vào `.env.local`
5. Vào Firestore Database → Create database (Start in test mode)

### 2. File môi trường

Tạo file `.env.local`:
```env
# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# IMGBB
IMGBB_KEY=your_imgbb_api_key_here

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Import dữ liệu từ Blogspot

**Crawl danh mục:**
```bash
node scripts/extract-categories.js
```

**Crawl bài viết:**
```bash
# Cài xml2js
npm install xml2js --save-dev

# Crawl 50 bài viết
node scripts/extract-posts.js 50

# Crawl tất cả
node scripts/extract-posts.js 999
```

Sau đó vào `/admin` → Import dữ liệu để upload lên Firestore.

## Chạy dự án

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Mở http://localhost:3000
```

## Deploy lên Vercel

### Bước 1: Push code lên GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

### Bước 2: Deploy trên Vercel
1. Vào https://vercel.com
2. Import project từ GitHub
3. Add Environment Variables (copy từ `.env.local`)
4. Deploy!

### Bước 3: Cấu hình domain (tùy chọn)
Trong Vercel Dashboard → Settings → Domains

## Cấu trúc thư mục

```
my-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/               # Admin Dashboard
│   │   ├── bai-viet/          # Blog pages
│   │   ├── gio-hang/           # Cart page
│   │   ├── san-pham/           # Products
│   │   └── page.tsx            # Home
│   ├── components/
│   │   ├── home/              # Home sections
│   │   ├── layout/            # Header, Footer
│   │   ├── product/           # QuickViewModal
│   │   └── ui/                # shadcn components
│   ├── lib/                   # Utilities
│   └── types/                 # TypeScript types
├── data/                      # Crawled data
├── scripts/                   # Crawler scripts
└── public/                    # Static assets
```

## Scripts hữu ích

| Script | Mục đích |
|--------|----------|
| `extract-categories.js` | Crawl danh mục từ blogspot |
| `extract-posts.js` | Crawl bài viết + upload ảnh ImgBB |

## Lưu ý

- Ảnh sẽ được upload lên ImgBB CDN để tối ưu tốc độ
- Dữ liệu bài viết lưu trong Firestore (real-time)
- Admin dashboard chỉ dùng localStorage auth (cần bảo mật thêm cho production)

## License

MIT License - Free for commercial use

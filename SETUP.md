# HƯỚNG DẪN THIẾT LẬP - Shen Yun Web App

## 📋 TỔNG QUAN

Website hoàn chỉnh cho nghệ nhân thêu tay với đầy đủ tính năng:
- 🛒 Bán sản phẩm (tranh thêu, phụ kiện)
- 🎓 Hệ thống khóa học online
- 👤 Quản lý học viên
- 📊 Admin Dashboard

---

## 🚀 TRIỂN KHAI NHANH (Vercel)

### Bước 1: Deploy lên Vercel
1. Push code lên GitHub
2. Import project vào Vercel
3. Chọn Next.js framework

### Bước 2: Thêm Environment Variables (BẮT BUỘC)

| Variable | Lấy từ đâu | Mục đích |
|----------|-----------|----------|
| `GOOGLE_CLIENT_ID` | Google Cloud Console | Đăng nhập Google |
| `GOOGLE_CLIENT_SECRET` | Google Cloud Console | Đăng nhập Google |
| `NEXTAUTH_SECRET` | Tự tạo (random string) | Mã hóa session |
| `NEXTAUTH_URL` | URL website | Ví dụ: `https://your-domain.com` |

### Bước 3: Truy cập Admin và cấu hình
1. Mở `/admin/api-settings`
2. Nhập Firebase config:
   - API Key
   - Auth Domain  
   - Project ID
   - Storage Bucket
   - App ID
3. Nhấn "Lưu cài đặt" → Trang tự reload

### Bước 4: Bắt đầu sử dụng
- `/admin` - Quản lý toàn bộ
- `/khoa-hoc` - Khóa học (cho khách)
- `/san-pham` - Sản phẩm (cho khách)

---

## ⚙️ CHI TIẾT CẤU HÌNH

### 1. Google OAuth (Bắt buộc)

**Tạo credentials:**
1. Vào https://console.cloud.google.com/
2. Tạo project mới
3. APIs & Services → Credentials → Create OAuth 2.0 Client ID
4. Authorized redirect URIs: `https://your-domain.com/api/auth/callback/google`
5. Copy Client ID và Client Secret

### 2. Firebase (Database)

**Tạo project:**
1. Vào https://console.firebase.google.com/
2. Tạo project mới
3. Project Settings → General → Your apps
4. Copy các giá trị cấu hình

**Bật Firestore Database:**
1. Firestore Database → Create database
2. Chọn "Start in production mode"
3. Chọn region: `asia-southeast1` (Singapore - gần VN nhất)

**Bật Authentication:**
1. Authentication → Sign-in method
2. Bật Google provider
3. Thêm domain vào Authorized domains

### 3. ImgBB (Tùy chọn - Upload ảnh)

1. Vào https://api.imgbb.com/
2. Tạo tài khoản, lấy API Key
3. Nhập vào `/admin/api-settings`

### 4. Google Drive API (Tùy chọn - Import video)

1. Google Cloud Console → APIs & Services
2. Bật Google Drive API
3. Tạo API Key
4. Share folder chứa video → lấy Folder ID
5. Nhập trong chi tiết khóa học

---

## 📁 CẤU TRÚC URL

### Public Pages
| URL | Chức năng |
|-----|-----------|
| `/` | Trang chủ |
| `/san-pham` | Danh sách sản phẩm |
| `/san-pham/[id]` | Chi tiết sản phẩm |
| `/gio-hang` | Giỏ hàng |
| `/thanh-toan` | Thanh toán |
| `/khoa-hoc` | Danh sách khóa học |
| `/khoa-hoc/[id]` | Chi tiết khóa học |
| `/hoc-tap` | Học tập (cần đăng nhập) |
| `/hoc-tap/[course]/[lesson]` | Xem video bài học |
| `/tai-khoan` | Quản lý tài khoản |
| `/dang-nhap` | Đăng nhập |
| `/dang-ky` | Đăng ký |

### Admin Pages
| URL | Chức năng |
|-----|-----------|
| `/admin` | Dashboard |
| `/admin/products` | Quản lý sản phẩm |
| `/admin/orders` | Quản lý đơn hàng |
| `/admin/courses` | Quản lý khóa học |
| `/admin/courses/[id]` | Chi tiết khóa học + Bài học |
| `/admin/students` | Tất cả học viên |
| `/admin/courses/[id]/students` | Học viên theo khóa |
| `/admin/api-settings` | Cấu hình API |

---

## 🔧 TÍNH NĂNG CHÍNH

### E-commerce
- ✅ CRUD sản phẩm (Admin)
- ✅ Upload ảnh sản phẩm (ImgBB)
- ✅ Giỏ hàng + Checkout
- ✅ Thanh toán COD + Chuyển khoản
- ✅ Quản lý đơn hàng

### E-learning
- ✅ CRUD khóa học (Admin)
- ✅ Quản lý bài học (Video YouTube/Drive/Direct)
- ✅ Học viên đăng ký khóa học
- ✅ Theo dõi tiến độ học tập
- ✅ Resume học tập (tự động vào bài đang học)
- ✅ Đánh dấu hoàn thành bài học
- ✅ Google Drive API - Import video nhanh

### User Management
- ✅ Đăng nhập Google OAuth
- ✅ Phân quyền Admin/Customer
- ✅ Quản lý học viên toàn cục và theo khóa
- ✅ Xuất CSV danh sách học viên

---

## 📝 LƯU Ý QUAN TRỌNG

### Dữ liệu giả (Demo)
Các trang sau hiện đang dùng dữ liệu mẫu:
- `/khoa-hoc/page.tsx` - 3 khóa học mẫu
- `/khoa-hoc/[id]/page.tsx` - Chi tiết khóa mẫu
- `/yeu-thich/page.tsx` - Yêu thích mẫu

**Cần sửa sau demo:** Kết nối Firebase để fetch thật.

### Tài khoản Demo
Email: `demo@example.com`
Password: `demo123`

### Bảo mật
- Google OAuth credentials → Vercel Environment Variables
- Firebase config → Có thể nhập qua Admin UI
- Không commit `.env.local` lên Git

---

## 🆘 TROUBLESHOOTING

### Lỗi "Firebase config is missing"
→ Chưa nhập Firebase config trong `/admin/api-settings`

### Không đăng nhập được Google
→ Kiểm tra `GOOGLE_CLIENT_ID` và `GOOGLE_CLIENT_SECRET` trong Vercel

### Upload ảnh lỗi
→ Kiểm tra ImgBB API Key trong `/admin/api-settings`

### Không fetch được dữ liệu
→ Kiểm tra Firestore rules có cho phép read/write không

---

## 📞 HỖ TRỢ

Email hỗ trợ: support@your-domain.com

---

*Cập nhật: April 2026*

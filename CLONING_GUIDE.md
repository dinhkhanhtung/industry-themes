# Hướng Dẫn Cấu Hình API & Nhân Bản Website

> **Mục tiêu:** Sau khi đọc xong, bạn có thể nhân bản website này cho 10, 20, hoặc 100 nghệ nhân khác nhau một cách nhanh chóng và chuyên nghiệp.

---

## 📋 Tổng Quan Kiến Trúc

Website sử dụng **JAMstack Architecture**:
- **Frontend:** Next.js 14 (hosting trên Vercel)
- **Backend/Database:** Firebase (Firestore + Auth + Storage)
- **Media:** ImgBB (ảnh sản phẩm) + Google Drive (video khóa học)
- **Authentication:** NextAuth.js (Google OAuth)

**Ưu điểm khi nhân bản:**
- Không cần server riêng
- Tự động scale
- Chi phí thấp ( Firebase free tier + Vercel free tier)
- Cấu hình hoàn toàn qua Admin Dashboard

---

## 🚀 Chiến Lược Nhân Bản (Quan Trọng)

### Option A: GitHub Template (Khuyến nghị ⭐)
**Dùng khi:** Bạn là developer, muốn quản lý nhiều phiên bản.

**Cách làm:**
1. Repo gốc đặt thành "Template Repository"
2. Mỗi khách hàng = 1 repo mới từ template
3. Mỗi repo deploy lên Vercel project riêng
4. Mỗi project có Firebase project riêng

**Ưu điểm:**
- Codebase độc lập (có thể customize riêng cho từng khách)
- Khách hàng có thể tự sở hữu code
- Backup riêng biệt

**Nhược điểm:**
- Cập nhật tính năng phải làm từng site (hoặc dùng script)

### Option B: Multi-tenant (1 Codebase, Nhiều Khách)
**Dùng khi:** Bạn muốn bản thân quản lý tất cả, khách chỉ dùng.

**Cách làm:**
- 1 repo duy nhất
- Nhiều Vercel project trỏ vào cùng repo
- Mỗi project có ENV khác nhau
- Firebase project riêng cho mỗi khách

**Ưu điểm:**
- Cập nhật 1 lần, áp dụng tất cả
- Quản lý tập trung

**Nhược điểm:**
- Khó customize riêng cho từng khách
- Risk cao (lỗi code ảnh hưởng tất cả)

### ✅ Khuyến nghị của tôi: Dùng Option A
Với mô hình bán cho nghệ nhân, mỗi người cần sự độc lập. Option A cho phép:
- Bán source code cho khách (higher value)
- Khách tự chủ hoàn toàn
- Bạn vẫn có thể offer "maintenance package"

---

## 🔧 Cấu Hình API Chi Tiết (Từng Bước)

### Bước 1: Chuẩn Bị Tài Khoản

Bạn cần tạo tài khoản tại:
1. **GitHub:** Để lưu code (miễn phí)
2. **Vercel:** Để deploy (miễn phí, $20/tháng nếu pro)
3. **Firebase:** Để database (miễn phí đến 50K reads/ngày)
4. **Google Cloud:** Để Google OAuth (miễn phí 1 triệu requests/tháng)
5. **ImgBB:** Để host ảnh (miễn phí, hoặc dùng Firebase Storage)

---

### Bước 2: Cấu Hình Firebase

#### 2.1 Tạo Firebase Project
1. Vào [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Đặt tên: `[ten-khach-hang]-website` (VD: `hangkhoa-website`)
4. Tắt Google Analytics (hoặc bật nếu cần)
5. Click Create

#### 2.2 Kích Hoạt Firestore Database
1. Vào "Firestore Database" → "Create database"
2. Chọn "Start in production mode"
3. Chọn region: `asia-southeast1` (Singapore - gần VN nhất)
4. Rules mặc định an toàn, chỉnh sửa sau nếu cần public access

#### 2.3 Kích Hoạt Authentication
1. Vào "Authentication" → "Get started"
2. Chọn "Google" provider
3. Bật "Enable"
4. Configure OAuth consent screen (chọn "External" cho production)
5. Add support email
6. Save

#### 2.4 Lấy Firebase Config
1. Vào Project Settings (icon bánh răng)
2. Scroll xuống "Your apps" → "Add app" → "Web"
3. Đặt nickname: `Website`
4. Click "Register app"
5. **Copy config object** (có dạng):
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "hangkhoa-website.firebaseapp.com",
  projectId: "hangkhoa-website",
  storageBucket: "hangkhoa-website.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

---

### Bước 3: Cấu Hình Google OAuth (NextAuth)

#### 3.1 Tạo OAuth Credentials
1. Vào [Google Cloud Console](https://console.cloud.google.com/)
2. Chọn project Firebase vừa tạo (tự động sync)
3. Vào "APIs & Services" → "Credentials"
4. Click "Create Credentials" → "OAuth client ID"
5. Application type: "Web application"
6. Name: `Website Auth`
7. Authorized JavaScript origins:
   - `http://localhost:3000` (dev)
   - `https://[ten-project].vercel.app` (production)
8. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://[ten-project].vercel.app/api/auth/callback/google`
9. Click Create
10. **Copy Client ID và Client Secret**

---

### Bước 4: Cấu Hình ImgBB (Hoặc Firebase Storage)

#### 4.1 ImgBB (Dễ hơn)
1. Vào [ImgBB](https://api.imgbb.com/)
2. Đăng ký tài khoản
3. Vào "API Key"
4. Copy key (dạng: `a1b2c3d4e5f6...`)

#### 4.2 Firebase Storage (Chuyên nghiệp hơn)
1. Vào Firebase Console → Storage
2. Click "Get started"
3. Chọn location `asia-southeast1`
4. Rules: cho phép read public, write chỉ authenticated

---

### Bước 5: Deploy Lên Vercel

#### 5.1 Import GitHub Repo
1. Vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import GitHub repo của bạn
4. Framework Preset: Next.js

#### 5.2 Cấu Hình Environment Variables
Thêm từng biến sau:

**Firebase Config:**
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hangkhoa-website.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hangkhoa-website
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hangkhoa-website.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

**NextAuth:**
```
GOOGLE_CLIENT_ID=123-abc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123
NEXTAUTH_SECRET=a-random-secret-key-at-least-32-characters
NEXTAUTH_URL=https://[ten-project].vercel.app
```

**ImgBB:**
```
NEXT_PUBLIC_IMGBB_KEY=a1b2c3d4e5f6
```

#### 5.3 Deploy
1. Click "Deploy"
2. Chờ 2-3 phút
3. Website đã online!

---

### Bước 6: Cấu Hình Admin Dashboard

Sau khi deploy, vào website và làm theo thứ tự:

#### 6.1 Brand Settings
- Vào `/admin/website-settings`
- Tên thương hiệu: `[Tên nghệ nhân]`
- Slogan: `[Slogan phù hợp]`
- Logo: Upload ảnh logo (nếu có)
- Màu sắc: Chọn màu chủ đạo (hoặc giữ nguyên #b45309)

#### 6.2 Contact Settings
- SĐT: Số điện thoại nghệ nhân
- Email: Email liên hệ
- Zalo: Số Zalo
- Facebook: Link Facebook
- Instagram, YouTube, TikTok: Nếu có
- Địa chỉ: Địa chỉ cửa hàng/xưởng

#### 6.3 API Settings (Quan trọng)
Vào `/admin/api-settings`:
- Paste **Firebase Config** từ Bước 2.4
- Paste **ImgBB Key** từ Bước 4
- Click "Save & Reload"
- Website sẽ reconnect với Firebase

#### 6.4 Payment Settings
- Vào `/admin/settings`
- Cấu hình:
  - Phí ship mặc định
  - Freeship từ bao nhiêu tiền
  - Thông tin chuyển khoản ngân hàng
  - COD có/không

---

### Bước 7: Nhập Dữ Liệu Mẫu

#### 7.1 Tạo Danh Mục Sản Phẩm
Vào `/admin/categories`:
- Thêm các danh mục: Hoa sen, Chim hạc, Phong cảnh...

#### 7.2 Thêm Sản Phẩm
Vào `/admin/products`:
- Click "Thêm sản phẩm"
- Upload ảnh, điền thông tin
- Nếu có nhiều kích thước/màu: Chọn "Biến thể + SKU"

#### 7.3 Thêm Khóa Học
Vào `/admin/courses`:
- Tạo khóa học
- Thêm bài học (video từ YouTube hoặc Google Drive)

#### 7.4 Thêm Bài Viết
Vào `/admin/posts`:
- Viết blog/ tin tức về nghệ thuật thêu

---

## 🔄 Quy Trình Nhân Bản Cho Nhiều Khách Hàng

### Checklist Mỗi Lần Nhân Bản

```
☐ 1. Fork repo từ GitHub Template
☐ 2. Đổi tên project trong package.json (optional)
☐ 3. Tạo Firebase Project mới
☐ 4. Tạo Vercel Project mới
☐ 5. Config Environment Variables
☐ 6. Deploy
☐ 7. Vào Admin cấu hình Brand + Contact
☐ 8. Nhập dữ liệu sản phẩm/khóa học
☐ 9. Kiểm tra các trang chính
☐ 10. Bàn giao cho khách (tài khoản admin)
```

### Thời Gian Dự Kiến

| Task | Thời gian |
|------|-----------|
| Setup Firebase + Vercel | 15 phút |
| Deploy lần đầu | 5 phút |
| Cấu hình Admin | 20 phút |
| Nhập 5-10 sản phẩm | 30 phút |
| **Tổng** | **~1.5 giờ/khách** |

### Chi Phí Dự Kiến (Mỗi Khách)

**Miễn phí (Free Tier):**
- Vercel: Miễn phí (giới hạn bandwidth)
- Firebase: Miễn phí (50K reads/ngày)
- ImgBB: Miễn phí (tùy gói)
- **Tổng: $0/tháng** (cho lưu lượng nhỏ)

**Trả phí (Nếu lớn):**
- Firebase Blaze Plan: Trả theo usage (~$5-20/tháng nếu lớn)
- Vercel Pro: $20/tháng (nếu cần analytics)

---

## 🛠️ Tools & Scripts Hỗ Trợ

### Script Clone Nhanh (PowerShell)

```powershell
# clone-template.ps1
param(
    [Parameter(Mandatory=$true)]
    [string]$ClientName,
    
    [Parameter(Mandatory=$true)]
    [string]$FirebaseProjectId
)

# 1. Clone repo
git clone https://github.com/your-username/template-embroidery-website.git "$ClientName-website"
cd "$ClientName-website"

# 2. Update package.json
(Get-Content package.json) -replace '"name": "template"', "`"name`": `"$ClientName`"" | Set-Content package.json

# 3. Create .env.local template
@"
NEXT_PUBLIC_FIREBASE_PROJECT_ID=$FirebaseProjectId
# ... other vars
"@ | Out-File -FilePath .env.local -Encoding utf8

Write-Host "✅ Project $ClientName ready! Next steps:"
Write-Host "   1. Update .env.local with actual API keys"
Write-Host "   2. Push to GitHub"
Write-Host "   3. Import to Vercel"
```

### Firebase Backup Script

```javascript
// backup-firebase.js
const admin = require('firebase-admin');
const fs = require('fs');

// Xuất tất cả collections ra JSON
async function backup() {
  const collections = ['products', 'courses', 'orders', 'enrollments'];
  const backup = {};
  
  for (const col of collections) {
    const snapshot = await admin.firestore().collection(col).get();
    backup[col] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
  
  fs.writeFileSync(`backup-${Date.now()}.json`, JSON.stringify(backup, null, 2));
  console.log('✅ Backup complete');
}
```

---

## 📞 Xử Lý Sự Cố Thường Gặp

### Lỗi 1: "Firebase Error: Permission Denied"
**Nguyên nhân:** Firestore rules chưa cấu hình
**Fix:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;  // Public read
      allow write: if request.auth != null; // Authenticated write
    }
  }
}
```

### Lỗi 2: "NextAuth Error: Invalid Callback"
**Nguyên nhân:** OAuth redirect URI sai
**Fix:** Vào Google Cloud Console → Credentials → Authorized redirect URIs → Thêm `https://[your-domain]/api/auth/callback/google`

### Lỗi 3: Images Not Loading (ImgBB)
**Nguyên nhân:** Quá giới hạn free tier hoặc key sai
**Fix:** Kiểm tra key trong `/admin/api-settings`, hoặc dùng Firebase Storage thay thế

---

## 💡 Mẹo Tối Ưu

### 1. Sử Dụng Firebase Emulators (Development)
```bash
firebase emulators:start
```
Để test offline không tốn quota.

### 2. CDN Optimization
- Ảnh sản phẩm: Dùng Next.js Image optimization
- Video: Dùng Google Drive hoặc YouTube (không lưu trên Firebase Storage tốn tiền)

### 3. Caching Strategy
- Vercel Edge Network cache static assets 1 năm
- Firestore caching: Dùng `enableIndexedDbPersistence`

---

## 📦 Deliverables Khi Bàn Giao Khách Hàng

Mỗi khi bàn giao, cung cấp khách:
1. **Website URL:** `https://[ten].vercel.app`
2. **Admin URL:** `https://[ten].vercel.app/admin`
3. **Admin Account:** `admin@example.com / [password]`
4. **GitHub Repo URL:** (nếu khách muốn tự quản lý code)
5. **Document:** Hướng dẫn sử dụng Admin (1 trang A4)
6. **API Keys:** (Tùy chọn) cho phép khách tự quản lý

---

## 🎯 Tóm Tắt

**Để nhân bản website này:**

1. **Fork Template** → GitHub Repo mới
2. **Tạo Firebase** → Lấy config
3. **Tạo Vercel** → Import repo + Config ENV
4. **Deploy** → Website online
5. **Admin Setup** → Brand, Contact, Payment
6. **Import Data** → Sản phẩm, Khóa học

**Thời gian:** 1-2 giờ/khách (sau khi quen)
**Chi phí:** $0/tháng (free tier) cho mỗi khách

---

*Cập nhật: April 2026*
*By: Development Team*

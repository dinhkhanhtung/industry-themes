# 🚀 QUY TRÌNH TRIỂN KHAI CHO KHÁCH (Bạn làm tất cả)

## 📋 Tổng quan

> **Nguyên tắc**: Khách không biết lập trình → Bạn setup từ A-Z → Khách chỉ việc vào admin dùng

---

## 🎯 Quy trình 3 bước

### BƯỚC 1: Bạn chuẩn bị (5 phút)

```bash
# 1. Tạo thư mục mới cho khách
cd D:\\Dev\\Projects\\khach-hang
mkdir dogo-hoang-gia
cd dogo-hoang-gia

# 2. Copy template
cp -r ..\\shen yun\\my-app\\* .

# 3. Chạy setup tự động
cd scripts
node setup-for-customer.js "Đồ Gỗ Hoàng Gia" "do-go" "dogo-hoang-gia.vercel.app"
```

**Script tự động làm:**
- ✅ Config tên shop, ngành nghề
- ✅ Cập nhật title, description
- ✅ Tạo tài khoản admin (email: admin@shop.com / pass: tự generate)
- ✅ Tạo file `BAN_GIAO.txt` (thông tin đăng nhập)

---

### BƯỚC 2: Bạn deploy (3 phút)

```bash
# 1. Tạo repo GitHub mới (bằng GitHub CLI hoặc web)
gh repo create dogo-hoang-gia --public

# 2. Push code
git init
git add .
git commit -m "Initial setup"
git remote add origin https://github.com/ban/dogo-hoang-gia.git
git push -u origin main

# 3. Deploy Vercel
vercel --prod
# Hoặc: Kết nối GitHub repo với Vercel (auto deploy)
```

---

### BƯỚC 3: Bạn bàn giao (1 phút)

Gửi cho khách qua Zalo/Email:

```
🎉 WEBSITE CỦA ANH/CHỊ ĐÃ XONG!

🔗 Link website: https://dogo-hoang-gia.vercel.app
🔐 Link quản lý: https://dogo-hoang-gia.vercel.app/admin

📧 Email đăng nhập: admin@dogo-hoang-gia.com
🔑 Mật khẩu: Dg2024@Hoa (nhớ đổi sau khi vào nhé!)

📄 Hướng dẫn sử dụng: Đính kèm file HDSD.pdf

Cần hỗ trợ gì cứ nhắn em nhé!
```

---

## 📁 Cấu trúc sau khi setup

```
dogo-hoang-gia/           ← Folder của khách
├── src/                  ← Code (bạn đã config sẵn)
├── BAN_GIAO.txt          ← Thông tin đăng nhập
├── HDSD.pdf             ← Hướng dẫn cho khách
└── .env.local           ← Config riêng (không push)
```

---

## 🔐 Thông tin bạn cần lưu trữ

Tạo file `KHACH_HANG.xlsx` để quản lý:

| Tên khách | Ngành | Domain | Admin Email | Password | GitHub Repo | Vercel URL | Ngày bàn giao |
|-----------|-------|--------|-------------|----------|-------------|------------|---------------|
| Đồ Gỗ Hoàng Gia | do-go | dogo-hoang-gia.vercel.app | admin@dogo.com | Dg2024@Hoa | github.com/... | ... | 16/04/2026 |
| Thời Trang Lan Hương | thoi-trang | lanhuong-fashion.vercel.app | admin@lanhuong.com | Th2024@Lh | ... | ... | ... |

---

## 🎨 Script setup mới (cho bạn dùng)

**File:** `scripts/setup-for-customer.js`

```javascript
// Chỉ cần chạy: node setup-for-customer.js "Tên" "Ngành" "Domain"
// Script tự động config hết, tạo file bàn giao
```

**Tạo file này ngay:**

```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const [,, name, industry, domain] = process.argv;
if (!name || !industry || !domain) {
  console.log('Usage: node setup-for-customer.js "Tên Shop" "do-go" "domain.vercel.app"');
  process.exit(1);
}

const password = generatePassword();
const email = `admin@${domain}`;

// 1. Update config files
updateConfig(name, industry);

// 2. Create BAN_GIAO.txt
const bangiao = `THÔNG TIN BÀN GIAO - ${name}
================================
Website: https://${domain}
Admin: https://${domain}/admin
Email: ${email}
Password: ${password}
Ngành: ${industry}
Ngày tạo: ${new Date().toLocaleDateString('vi-VN')}
================================
LƯU Ý: Đổi mật khẩu ngay sau lần đăng nhập đầu!
`;

fs.writeFileSync('BAN_GIAO.txt', bangiao);
console.log('✅ Đã tạo BAN_GIAO.txt');

function generatePassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let pass = '';
  for (let i = 0; i < 10; i++) pass += chars[Math.floor(Math.random() * chars.length)];
  return pass;
}
```

---

## 📱 Hướng dẫn cho khách (đơn giản)

**File:** `HDSD.pdf` (bạn tạo 1 lần, dùng cho mọi khách)

### Trang 1: Đăng nhập lần đầu
```
1. Vào link: [DOMAIN]/admin
2. Nhập email và password (trong BAN_GIAO.txt)
3. Ấn "Đăng nhập"
4. ĐỔI MẬT KHẨU NGAY (quan trọng!)
   → Vào "Cài đặt" → "Tài khoản" → Đổi mật khẩu
```

### Trang 2: Thêm sản phẩm
```
1. Vào "Sản phẩm" → "Thêm mới"
2. Upload ảnh lên imgbb.com trước
3. Copy link ảnh → Dán vào "Link ảnh"
4. Điền tên, giá, mô tả
5. Ấn "Lưu"
```

### Trang 3: Đổi thông tin shop
```
1. Vào "Cài đặt Website" → "Thương hiệu"
2. Đổi: Tên shop, Slogan, SĐT, Địa chỉ
3. Upload logo (nếu có)
4. Ấn "Lưu"
```

---

## ❓ Khách hỏi gì thì trả lời sao?

| Khách hỏi | Bạn trả lời |
|-----------|-------------|
| "Quên mật khẩu" | "Anh/chị nhắn em, em reset cho" |
| "Thêm sản phẩm bị lỗi" | "Chụp màn hình gửi em xem" |
| "Muốn đổi màu web" | "Em đổi giúp, 5 phút xong" |
| "Thêm chức năng mới" | "Em báo giá thêm ạ" |
| "Web chậm" | "Em check lại server" |

---

## 🚀 Tóm tắt

**Bạn làm:**
1. Chạy script setup
2. Push lên GitHub
3. Deploy Vercel
4. Gửi thông tin cho khách

**Khách làm:**
1. Nhận link
2. Vào admin đăng nhập
3. Đổi mật khẩu
4. Thêm sản phẩm
5. Dùng bình thường

**Khi cần hỗ trợ:**
- Khách nhắn bạn
- Bạn vào admin giúp (vì bạn tạo account, bạn có thể reset pass)

---

**Ready? Tôi tạo script setup mới ngay!**

# ⚡ QUICK START - BẠN LÀM TẤT, KHÁCH CHỈ DÙNG

## 🎯 3 bước triển khai

### Bước 1: Setup (1 lệnh)
```bash
cd scripts
node setup-for-customer.js "Tên Shop" "ngành" "domain.vercel.app"

# Ví dụ:
node setup-for-customer.js "Đồ Gỗ Hoàng Gia" "do-go" "dogo-hoang-gia.vercel.app"
```

**Xong! Script tự động:**
- ✅ Config tên shop, ngành nghề
- ✅ Tạo file `BAN_GIAO.txt` (thông tin đăng nhập)

### Bước 2: Deploy
```bash
git add .
git commit -m "Setup"
git push
vercel --prod
```

### Bước 3: Bàn giao
Gửi file `BAN_GIAO.txt` cho khách qua Zalo/Email

---

## 📋 File BAN_GIAO.txt chứa gì?

```
🏪 Tên shop: Đồ Gỗ Hoàng Gia
🎨 Ngành: do-go
🔗 Website: https://dogo-hoang-gia.vercel.app
🔐 Admin: https://dogo-hoang-gia.vercel.app/admin
📧 Email: admin@dogo-hoang-gia.vercel.app
🔑 Password: DG2024@xYzA
```

**Khách chỉ cần:**
1. Vào link admin
2. Đăng nhập bằng email/pass ở trên
3. Đổi mật khẩu
4. Thêm sản phẩm → Dùng

---

## 🎨 Ngành có sẵn

| ID | Tên hiển thị |
|----|-------------|
| tranh-theu | Tranh Thêu Tay |
| do-go | Đồ Gỗ |
| gom-su | Gốm Sứ |
| trang-suc | Trang Sức |
| thoi-trang | Thời Trang |
| my-pham | Mỹ Phẩm |
| do-dien-tu | Đồ Điện Tử |
| ... | ... |

---

## 📞 Khách cần hỗ trợ?

Khách nhắn bạn → Bạn vào admin giúp (bạn có thể reset pass bất cứ lúc nào)

---

**Done! 🎉**

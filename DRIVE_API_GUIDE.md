# Hướng Dẫn Sử Dụng Google Drive API - Thêm Video Khóa Học

## 🎯 Mục đích

Thêm hàng loạt video từ Google Drive vào khóa học chỉ với vài click, thay vì dán link thủ công từng cái.

---

## 📋 Chuẩn Bị

### Bước 1: Tạo Folder Chứa Video
1. Vào [Google Drive](https://drive.google.com)
2. Tạo folder mới (ví dụ: "Khóa Học Thêu Cơ Bản")
3. Upload tất cả video vào folder này
4. **Đặt tên file** theo thứ tự bài học:
   - `01-Gioi-thieu-khoa-hoc.mp4`
   - `02-Chuan-bi-nguyen-lieu.mp4`
   - `03-Ky-thuat-duong-kim.mp4`
   - ...

### Bước 2: Chia Sẻ Folder
1. Right-click folder → **Share**
2. Chọn **"Anyone with the link can view"** (Ai có link cũng xem được)
3. Copy link (cần cho Bước 4)

### Bước 3: Lấy Google Drive API Key
1. Vào [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới (hoặc dùng project cũ)
3. Vào **APIs & Services** → **Library**
4. Tìm **Google Drive API** → Click **Enable**
5. Vào **Credentials** → **Create Credentials** → **API Key**
6. Copy API Key (dạng: `AIzaSy...`)

### Bước 4: Lấy Folder ID
Từ link folder đã copy ở Bước 2:
```
https://drive.google.com/drive/folders/1ABC123xyz789...XYZ
                                     └──────┬──────┘
                                         Folder ID
```
Copy phần sau `/folders/` → Đây là **Folder ID**

---

## 🚀 Sử Dụng Trong Admin

### Cách 1: Thêm Từng Video (Manual)
**Dùng khi:** Chỉ cần thêm 1-2 bài

1. Vào **Admin** → **Khóa học** → Chọn khóa học
2. Click **"Thêm bài học"**
3. Chọn loại video:
   - **YouTube**: Dán link YouTube
   - **Google Drive**: Dán link Drive
   - **Link trực tiếp**: Dán link MP4
4. Điền thông tin → Lưu

### Cách 2: Thêm Hàng Loạt Từ Drive ⭐
**Dùng khi:** Thêm nhiều bài cùng lúc (tiết kiệm thời gian)

1. Vào **Admin** → **Khóa học** → Chọn khóa học
2. Click nút **"Thêm từ Drive"** (màu xanh Google)
3. Điền thông tin:
   - **Drive API Key**: Dán key từ Bước 3
   - **Folder ID**: Dán ID từ Bước 4
4. Click **"Lấy danh sách video"**
5. Chọn video muốn thêm (checkbox)
6. Click **"Thêm vào khóa học"**

**✅ Hệ thống tự động:**
- Tạo bài học với tên từ file
- Sắp xếp theo thứ tự tên file
- Gán link video Drive
- Thêm mô tả mặc định

---

## 💡 Mẹo Tối Ưu

### Đặt Tên File Thông Minh
Để sắp xếp đúng thứ tự, dùng số đầu tên file:
```
01-Gioi-thieu.mp4
02-Nguyen-lieu.mp4
03-Buoc-1.mp4
...
10-Buoc-8.mp4
11-Tong-ket.mp4
```

### Format Video Hỗ Trợ
- MP4 (khuyến nghị)
- MOV
- AVI
- WebM

### Giới Hạn
- Tối đa 50 video/lần fetch
- Video phải ở chế độ "Anyone with link can view"
- API Key có giới hạn 10,000 requests/ngày (miễn phí)

---

## ❌ Xử Lý Lỗi

| Lỗi | Nguyên nhân | Cách fix |
|-----|-------------|----------|
| "API Key không hợp lệ" | Key sai hoặc chưa bật Drive API | Kiểm tra lại key, bật Drive API trong Console |
| "Không tìm thấy folder" | Folder ID sai hoặc chưa share | Kiểm tra ID, đảm bảo share "Anyone with link" |
| "Không có video nào" | Folder trống hoặc sai format | Kiểm tra folder có video không, định dạng MP4/MOV |
| "Lỗi CORS" | API chưa enable | Vào Console → Enable Google Drive API |

---

## 🔒 Bảo Mật

**Lưu ý quan trọng:**
- API Key chỉ cần quyền **read-only** (xem file)
- Không cần OAuth, chỉ cần API Key đơn giản
- Key lưu trong database của khóa học (riêng tư)
- Khách hàng không thấy API Key

---

## 📞 Hỗ Trợ

Nếu gặp lỗi:
1. Kiểm tra lại từng bước trên
2. Thử lại với folder/video khác
3. Liên hệ hỗ trợ kỹ thuật

---

*Cập nhật: April 2026*

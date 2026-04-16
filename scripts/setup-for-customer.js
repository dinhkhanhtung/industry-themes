#!/usr/bin/env node

/**
 * SETUP FOR CUSTOMER - Phiên bản đơn giản
 * Chỉ dùng cho BẠN (người làm tech), không phải khách
 * 
 * Usage: node setup-for-customer.js "Tên Shop" "do-go" "domain.vercel.app"
 */

const fs = require('fs');
const path = require('path');

const [,, shopName, industry, domain] = process.argv;

// Validate
if (!shopName || !industry || !domain) {
  console.log('\n❌ Thiếu thông tin!\n');
  console.log('Usage:');
  console.log('  node setup-for-customer.js "Tên Shop" "ngành" "domain.vercel.app"\n');
  console.log('Ví dụ:');
  console.log('  node setup-for-customer.js "Đồ Gỗ Hoàng Gia" "do-go" "dogo-hoang-gia.vercel.app"\n');
  console.log('Danh sách ngành: tranh-theu, do-go, gom-su, thoi-trang, my-pham, do-dien-tu, ...\n');
  process.exit(1);
}

console.log('\n🚀 SETUP SHOP CHO KHÁCH\n');
console.log('=======================\n');
console.log(`🏪 Tên: ${shopName}`);
console.log(`🎨 Ngành: ${industry}`);
console.log(`🌐 Domain: ${domain}\n`);

// Generate credentials
const adminEmail = `admin@${domain}`;
const adminPassword = generatePassword();

console.log('⏳ Đang cấu hình...\n');

// 1. Update WebsiteContext.tsx
try {
  const contextPath = path.join(__dirname, '../src/context/WebsiteContext.tsx');
  let context = fs.readFileSync(contextPath, 'utf8');
  
  context = context.replace(
    /industry: "[^"]+"/,
    `industry: "${industry}"`
  );
  context = context.replace(
    /name: "[^"]+"/,
    `name: "${shopName}"`
  );
  context = context.replace(
    /slogan: "[^"]+"/,
    `slogan: "Chất lượng - Uy tín - ${shopName}"`
  );
  
  fs.writeFileSync(contextPath, context);
  console.log('✅ Cấu hình shop');
} catch (e) {
  console.log('❌ Lỗi cấu hình:', e.message);
}

// 2. Update layout.tsx
try {
  const layoutPath = path.join(__dirname, '../src/app/layout.tsx');
  let layout = fs.readFileSync(layoutPath, 'utf8');
  
  layout = layout.replace(
    /title: "[^"]+"/,
    `title: "${shopName}"`
  );
  layout = layout.replace(
    /description: "[^"]+"/,
    `description: "${shopName} - Website bán hàng chuyên nghiệp"`
  );
  
  fs.writeFileSync(layoutPath, layout);
  console.log('✅ Cấu hình SEO');
} catch (e) {
  console.log('❌ Lỗi SEO:', e.message);
}

// 3. Create BAN_GIAO.txt
const bangiaoContent = `===============================================
🎉 THÔNG TIN BÀN GIAO WEBSITE
===============================================

🏪 Tên shop: ${shopName}
🎨 Ngành nghề: ${industry}
📅 Ngày tạo: ${new Date().toLocaleDateString('vi-VN')}

🔗 WEBSITE
   https://${domain}

🔐 TRANG QUẢN LÝ
   https://${domain}/admin

📧 TÀI KHOẢN ADMIN
   Email: ${adminEmail}
   Password: ${adminPassword}

⚠️  LƯU Ý QUAN TRỌNG:
    Khách phải ĐỔI MẬT KHẨU ngay sau lần đăng nhập đầu tiên!

===============================================
📋 VIỆC CẦN LÀM TIẾP THEO:
===============================================

1. Git push lên repo mới
   git init
   git add .
   git commit -m "Setup ${shopName}"
   git remote add origin https://github.com/YOU/${domain.split('.')[0]}.git
   git push -u origin main

2. Deploy lên Vercel
   vercel --prod
   
   HOẶC kết nối GitHub repo với Vercel
   (Settings > Git > Connect GitHub)

3. Gửi thông tin này cho khách
   - Copy từ 🎨 đến hết
   - Gửi qua Zalo/Email

===============================================
`;

fs.writeFileSync(path.join(__dirname, '../BAN_GIAO.txt'), bangiaoContent);
console.log('✅ Tạo file BAN_GIAO.txt');

// 4. Create .env.local
const envContent = `# ${shopName} Configuration
ADMIN_EMAIL=${adminEmail}
ADMIN_PASSWORD=${adminPassword}

# TODO: Customer needs to add their own:
# FIREBASE_API_KEY=
# IMGBB_API_KEY=
# NEXTAUTH_SECRET=
`;

fs.writeFileSync(path.join(__dirname, '../.env.local'), envContent);
console.log('✅ Tạo file .env.local\n');

// Done
console.log('=======================\n');
console.log('✅ SETUP HOÀN TẤT!\n');
console.log('📄 Xem file: BAN_GIAO.txt\n');
console.log('🚀 Bước tiếp theo:');
console.log('   1. Kiểm tra lại BAN_GIAO.txt');
console.log('   2. Git push lên GitHub');
console.log('   3. Deploy Vercel');
console.log('   4. Gửi BAN_GIAO.txt cho khách\n');

function generatePassword() {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let random = '';
  for (let i = 0; i < 4; i++) {
    random += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${industry.substring(0, 2).toUpperCase()}${year}@${random}`;
}

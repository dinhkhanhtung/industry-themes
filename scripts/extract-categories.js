/**
 * Script crawl menu danh mục từ tranhtheuhangkhoa.blogspot.com
 * Usage: node scripts/extract-categories.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// URL target
const TARGET_URL = 'tranhtheuhangkhoa.blogspot.com';

// Hàm fetch HTML
function fetchHTML(hostname, path = '/') {
  return new Promise((resolve, reject) => {
    const options = {
      hostname,
      path,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });

    req.on('error', reject);
    req.end();
  });
}

// Parse menu từ HTML Blogspot
function parseCategories(html) {
  const categories = [];
  const foundSlugs = new Set();
  
  // Helper để add category
  const addCategory = (name, slug, url, type) => {
    if (!name || name.length < 2 || foundSlugs.has(slug)) return;
    foundSlugs.add(slug);
    categories.push({
      name: name.trim(),
      slug: slug,
      url: url.startsWith('http') ? url : `https://${TARGET_URL}${url}`,
      type: type
    });
  };
  
  let match;
  
  // Pattern 1: Label cloud / Danh mục - href=".../search/label/...
  const labelRegex = /href="([^"]*\/search\/label\/([^"&]*))[^"]*"[^>]*>([^<]*)/gi;
  while ((match = labelRegex.exec(html)) !== null) {
    const url = match[1];
    const slug = decodeURIComponent(match[2]).replace(/\+/g, ' ');
    const name = match[3].trim();
    addCategory(name, slug, url, 'label');
  }
  
  // Pattern 2: Label links with title attribute
  const titleLabelRegex = /<a[^>]*href="([^"]*\/search\/label\/([^"]*))"[^>]*title="([^"]*)"[^>]*>/gi;
  while ((match = titleLabelRegex.exec(html)) !== null) {
    const url = match[1];
    const slug = decodeURIComponent(match[2]);
    const name = match[3].trim();
    addCategory(name, slug, url, 'label');
  }
  
  // Pattern 3: Menu items trong PageList widget
  const pageListRegex = /<li[^>]*>\s*<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi;
  while ((match = pageListRegex.exec(html)) !== null) {
    const url = match[1];
    const name = match[2].trim();
    const slug = name.toLowerCase().replace(/[^a-z0-9\u00C0-\u1EF9]/g, '-');
    if (url.includes('blogspot.com') || url.startsWith('/')) {
      addCategory(name, slug, url, 'menu');
    }
  }
  
  // Pattern 4: JSON data trong _WidgetManager hoặc pageData
  const jsonDataMatch = html.match(/_WidgetManager[^;]*;/) || html.match(/pageData\s*=\s*({[^;]+});/);
  if (jsonDataMatch) {
    try {
      // Tìm các label trong JSON
      const labelJsonMatch = html.match(/"labels":\s*(\[[^\]]+\])/);
      if (labelJsonMatch) {
        const labels = JSON.parse(labelJsonMatch[1]);
        labels.forEach(label => {
          if (typeof label === 'string') {
            const slug = label.toLowerCase().replace(/\s+/g, '-');
            addCategory(label, slug, `/search/label/${encodeURIComponent(label)}`, 'json-label');
          } else if (label.name) {
            addCategory(label.name, label.slug || label.name.toLowerCase().replace(/\s+/g, '-'), label.url || `/search/label/${encodeURIComponent(label.name)}`, 'json-label');
          }
        });
      }
    } catch (e) {
      console.log('   Không parse được JSON data');
    }
  }
  
  // Pattern 5: Cloud labels với class="label-count"
  const cloudLabelRegex = /<a[^>]*class="[^"]*label[^"]*"[^>]*href="([^"]*\/search\/label\/([^"]*))"[^>]*>\s*([^<]*)\s*(?:<[^>]*>)*\s*(?:\((\d+)\))?/gi;
  while ((match = cloudLabelRegex.exec(html)) !== null) {
    const url = match[1];
    const slug = decodeURIComponent(match[2]);
    const name = match[3].trim();
    const count = match[4] ? parseInt(match[4]) : 0;
    if (!foundSlugs.has(slug)) {
      foundSlugs.add(slug);
      categories.push({
        name: name,
        slug: slug,
        url: url.startsWith('http') ? url : `https://${TARGET_URL}${url}`,
        type: 'cloud-label',
        count: count
      });
    }
  }
  
  // Pattern 6: Navigation bar / Menu chính
  const navRegex = /<nav[^>]*>([\s\S]*?)<\/nav>/gi;
  let navMatch;
  while ((navMatch = navRegex.exec(html)) !== null) {
    const navContent = navMatch[1];
    const navLinkRegex = /<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi;
    let navLinkMatch;
    while ((navLinkMatch = navLinkRegex.exec(navContent)) !== null) {
      const url = navLinkMatch[1];
      const name = navLinkMatch[2].trim();
      if (name && name.length > 1 && !name.match(/^(Trang chủ|Home|Homepage)$/i)) {
        const slug = name.toLowerCase().replace(/[^a-z0-9\u00C0-\u1EF9]/g, '-');
        addCategory(name, slug, url, 'navigation');
      }
    }
  }
  
  // Pattern 7: Sidebar sections - tìm các mục "DANH MỤC", "LABELS", "CHỦ ĐỀ"
  const sectionRegex = /(?:DANH MỤC|LABELS|CHỦ ĐỀ|Categories)[^<]*<\/h\w+>\s*<ul[^>]*>([\s\S]*?)<\/ul>/gi;
  let sectionMatch;
  while ((sectionMatch = sectionRegex.exec(html)) !== null) {
    const sectionContent = sectionMatch[1];
    const sectionLinkRegex = /<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi;
    let sectionLinkMatch;
    while ((sectionLinkMatch = sectionLinkRegex.exec(sectionContent)) !== null) {
      const url = sectionLinkMatch[1];
      const name = sectionLinkMatch[2].trim();
      if (name && name.length > 1) {
        const slug = name.toLowerCase().replace(/[^a-z0-9\u00C0-\u1EF9]/g, '-');
        addCategory(name, slug, url, 'sidebar-section');
      }
    }
  }
  
  return categories;
}

// Hàm chính
async function main() {
  console.log('🚀 Đang crawl danh mục từ', TARGET_URL);
  console.log('=' .repeat(50));
  
  try {
    // Fetch trang chủ
    console.log('📥 Đang tải trang chủ...');
    const html = await fetchHTML(TARGET_URL);
    
    // Parse categories
    console.log('🔍 Đang phân tích cấu trúc menu...');
    const categories = parseCategories(html);
    
    if (categories.length === 0) {
      console.log('⚠️ Không tìm thấy danh mục. Thử tìm với pattern khác...');
      
      // Thử tìm JSON data trong script tag
      const jsonMatch = html.match(/\{[^}]*"label"[^}]*\}/g);
      if (jsonMatch) {
        console.log('📋 Tìm thấy JSON data:', jsonMatch.slice(0, 3));
      }
    }
    
    // Hiển thị kết quả
    console.log('\n📊 KẾT QUẢ:');
    console.log('-'.repeat(50));
    console.log(`Tìm thấy ${categories.length} danh mục:\n`);
    
    categories.forEach((cat, idx) => {
      console.log(`${idx + 1}. ${cat.name}`);
      console.log(`   Slug: ${cat.slug}`);
      console.log(`   URL: ${cat.url}`);
      console.log(`   Type: ${cat.type}`);
      console.log('');
    });
    
    // Lưu vào file
    const outputDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputFile = path.join(outputDir, 'categories.json');
    fs.writeFileSync(outputFile, JSON.stringify(categories, null, 2), 'utf-8');
    
    console.log('💾 Đã lưu vào:', outputFile);
    
    // Tạo file TypeScript để import vào project
    const tsFile = path.join(outputDir, 'categories.ts');
    const tsContent = `// Auto-generated from ${TARGET_URL}
// Generated at: ${new Date().toISOString()}

export interface Category {
  name: string;
  slug: string;
  url: string;
  type: string;
}

export const categories: Category[] = ${JSON.stringify(categories, null, 2)};

// Mapping cho NavLinks
export const navLinks = categories.map(cat => ({
  href: '/san-pham?category=' + encodeURIComponent(cat.slug),
  label: cat.name,
}));
`;
    fs.writeFileSync(tsFile, tsContent, 'utf-8');
    console.log('📝 Đã tạo TypeScript file:', tsFile);
    
    // Tạo SQL insert cho database (nếu cần)
    const sqlFile = path.join(outputDir, 'categories.sql');
    const sqlContent = categories.map(cat => 
      `INSERT INTO categories (name, slug, url, type, created_at) VALUES ('${cat.name.replace(/'/g, "''")}', '${cat.slug}', '${cat.url}', '${cat.type}', NOW());`
    ).join('\n');
    fs.writeFileSync(sqlFile, sqlContent, 'utf-8');
    console.log('🗄️  Đã tạo SQL file:', sqlFile);
    
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
}

// Chạy script
main();

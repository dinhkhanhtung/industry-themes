/**
 * Script crawl bài viết từ tranhtheuhangkhoa.blogspot.com
 * Lưu ảnh lên imgbb, metadata vào JSON để import Firestore
 * 
 * Usage: node scripts/extract-posts.js [limit]
 * Example: node scripts/extract-posts.js 50
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { parseString } = require('xml2js');

const TARGET_URL = 'tranhtheuhangkhoa.blogspot.com';
const IMGBB_API_KEY = process.env.IMGBB_KEY || 'YOUR_IMGBB_API_KEY'; // Cần set env var

// Hàm fetch
function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Parse RSS feed
async function fetchRSS(feedUrl) {
  const xml = await fetch(feedUrl);
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) reject(err);
      else resolve(result?.feed?.entry || []);
    });
  });
}

// Upload ảnh lên imgbb
async function uploadToImgbb(imageUrl, filename) {
  try {
    // Tải ảnh về
    const imageBuffer = await new Promise((resolve, reject) => {
      https.get(imageUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to fetch image: ${res.statusCode}`));
          return;
        }
        const chunks = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      }).on('error', reject);
    });

    // Upload lên imgbb
    const base64Image = imageBuffer.toString('base64');
    const formData = new URLSearchParams();
    formData.append('image', base64Image);
    formData.append('name', filename);

    const response = await new Promise((resolve, reject) => {
      const req = https.request('https://api.imgbb.com/1/upload?key=' + IMGBB_API_KEY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': formData.toString().length
        }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      });
      req.on('error', reject);
      req.write(formData.toString());
      req.end();
    });

    return response?.data?.url || null;
  } catch (error) {
    console.error(`❌ Upload failed for ${filename}:`, error.message);
    return null;
  }
}

// Parse bài viết từ HTML
function parsePost(entry) {
  const title = entry.title?.[0]?._ || entry.title?.[0] || 'Không có tiêu đề';
  const content = entry.content?.[0]?._ || entry.summary?.[0]?._ || '';
  const published = entry.published?.[0] || entry.updated?.[0];
  const updated = entry.updated?.[0];
  const link = entry.link?.find(l => l.$.rel === 'alternate')?.$.href || '';
  const id = entry.id?.[0]?.split(':').pop() || '';
  
  // Lấy categories/labels
  const categories = entry.category?.map(cat => cat.$.term) || [];
  
  // Parse author
  const author = entry.author?.[0]?.name?.[0] || 'Admin';
  
  // Tìm ảnh trong content
  const imgMatches = content.match(/<img[^>]*src="([^"]+)"/gi) || [];
  const images = imgMatches.map(img => {
    const srcMatch = img.match(/src="([^"]+)"/);
    return srcMatch ? srcMatch[1] : null;
  }).filter(Boolean);
  
  // Tìm ảnh đại diện (thumbnail)
  const thumbnail = images[0] || '';
  
  // Tạo excerpt
  const textContent = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const excerpt = textContent.substring(0, 200) + (textContent.length > 200 ? '...' : '');
  
  return {
    id,
    title: title.trim(),
    slug: title.toLowerCase().replace(/[^a-z0-9\u00C0-\u1EF9]/g, '-').replace(/-+/g, '-'),
    content,
    excerpt,
    published,
    updated,
    link,
    categories,
    author,
    images,
    thumbnail,
    status: 'draft', // Mặc định draft, admin sẽ publish
    views: 0,
    likes: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// Hàm chính
async function main() {
  const limit = parseInt(process.argv[2]) || 50;
  
  console.log('🚀 Crawl bài viết từ', TARGET_URL);
  console.log('📊 Giới hạn:', limit, 'bài viết');
  console.log('=' .repeat(60));
  
  if (IMGBB_API_KEY === 'YOUR_IMGBB_API_KEY') {
    console.log('⚠️ Chưa cấu hình IMGBB_API_KEY. Ảnh sẽ giữ URL gốc.');
    console.log('👉 Tạo key tại: https://api.imgbb.com/');
  }
  
  try {
    // Fetch RSS feed
    const feedUrl = `https://${TARGET_URL}/feeds/posts/default?alt=rss&max-results=${limit}`;
    console.log('📥 Đang tải RSS feed...');
    
    const rssXml = await fetch(feedUrl.replace('alt=rss', 'alt=json'));
    const feed = JSON.parse(rssXml);
    const entries = feed.feed?.entry || [];
    
    console.log(`✅ Tìm thấy ${entries.length} bài viết`);
    
    // Parse từng bài
    const posts = [];
    const outputDir = path.join(__dirname, '..', 'data', 'posts');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      console.log(`\n📝 Đang xử lý bài ${i + 1}/${entries.length}...`);
      
      const post = parsePost(entry);
      
      // Upload ảnh lên imgbb (nếu có API key)
      if (IMGBB_API_KEY !== 'YOUR_IMGBB_API_KEY' && post.thumbnail) {
        console.log('   ⬆️  Upload ảnh lên imgbb...');
        const imgbbUrl = await uploadToImgbb(post.thumbnail, `${post.slug}-thumb`);
        if (imgbbUrl) {
          post.thumbnail = imgbbUrl;
          post.images = post.images.map((img, idx) => 
            idx === 0 ? imgbbUrl : img
          );
        }
      }
      
      posts.push(post);
      
      // Lưu từng bài riêng lẻ
      fs.writeFileSync(
        path.join(outputDir, `${post.slug}.json`),
        JSON.stringify(post, null, 2),
        'utf-8'
      );
    }
    
    // Lưu tất cả vào 1 file
    const allPostsFile = path.join(outputDir, 'all-posts.json');
    fs.writeFileSync(allPostsFile, JSON.stringify(posts, null, 2), 'utf-8');
    
    // Tạo file Firestore import format
    const firestoreFile = path.join(outputDir, 'firestore-import.json');
    const firestoreData = {
      posts: posts.reduce((acc, post) => {
        acc[post.slug] = post;
        return acc;
      }, {})
    };
    fs.writeFileSync(firestoreFile, JSON.stringify(firestoreData, null, 2), 'utf-8');
    
    // Tạo file TypeScript
    const tsFile = path.join(outputDir, 'posts.ts');
    const tsContent = `// Auto-generated posts from ${TARGET_URL}
// Generated at: ${new Date().toISOString()}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published: string;
  updated: string;
  link: string;
  categories: string[];
  author: string;
  images: string[];
  thumbnail: string;
  status: 'draft' | 'published' | 'archived';
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export const posts: Post[] = ${JSON.stringify(posts, null, 2)};

export const postsByCategory = posts.reduce((acc, post) => {
  post.categories.forEach(cat => {
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(post);
  });
  return acc;
}, {} as Record<string, Post[]>);
`;
    fs.writeFileSync(tsFile, tsContent, 'utf-8');
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ HOÀN THÀNH!');
    console.log('='.repeat(60));
    console.log(`📁 Đã lưu ${posts.length} bài viết:`);
    console.log(`   • data/posts/all-posts.json`);
    console.log(`   • data/posts/firestore-import.json`);
    console.log(`   • data/posts/posts.ts`);
    console.log(`   • data/posts/[slug].json (từng bài)`);
    console.log('\n📊 Thống kê:');
    console.log(`   - Tổng bài: ${posts.length}`);
    console.log(`   - Categories: ${[...new Set(posts.flatMap(p => p.categories))].length}`);
    console.log(`   - Có ảnh: ${posts.filter(p => p.thumbnail).length}`);
    
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
}

main();

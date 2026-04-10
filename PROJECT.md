# 📋 Product Requirements Document (PRD)
## Tranh Thêu Tay Hoa Thượng - Admin Dashboard

**Version:** 1.0  
**Last Updated:** April 10, 2026  
**Tech Stack:** Next.js 14 + TypeScript + TailwindCSS + Firebase Firestore + ImgBB

---

## 🎯 Mục tiêu
Xây dựng Admin Dashboard toàn diện để quản lý mọi khía cạnh của website bán tranh thêu tay, cho phép admin thay đổi nội dung và cấu hình site nhanh chóng mà không cần deploy lại.

---

## 🏗️ Kiến trúc hệ thống

### Database Schema (Firestore)

```typescript
// Collections
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

## 🎨 UI/UX Requirements

### Layout Structure
```
Admin Layout
├── Sidebar (collapsible on mobile)
│   ├── Logo
│   ├── Navigation Menu
│   └── User Profile (collapsed)
├── Header
│   ├── Toggle Sidebar
│   ├── Breadcrumbs
│   ├── Notifications
│   └── User Menu
└── Main Content
    ├── Page Header (Title + Actions)
    └── Content Area
```

### Color Scheme
- Primary: #b45309 (Bronze Brown)
- Background: #fffbf5 (Off-white)
- Text: #1c1917 (Dark)
- Secondary: #57534e (Gray Brown)
- Success: #22c55e
- Warning: #f59e0b
- Error: #ef4444

### Responsive Breakpoints
- Mobile: < 640px (Sidebar hidden, hamburger menu)
- Tablet: 640px - 1024px (Collapsible sidebar)
- Desktop: > 1024px (Fixed sidebar)

---

## 🔧 Chức năng chi tiết

### 1. Authentication Module
**File:** `src/app/admin/login/page.tsx`
**API:** `src/app/api/auth/route.ts`

**Features:**
- Login form (email + password)
- Firebase Auth integration
- Remember me (localStorage)
- Redirect to /admin after login
- Protected routes middleware

**Flow:**
1. User enters credentials
2. Firebase Auth validates
3. Check if user exists in `admins` collection
4. Set session (Firebase Auth token)
5. Redirect to /admin

### 2. Dashboard Module
**File:** `src/app/admin/page.tsx`

**Widgets:**
- Stats Cards (4 cards x 4 columns):
  - Tổng bài viết (with trend %)
  - Tổng sản phẩm
  - Đơn hàng mới (pending)
  - Liên hệ chưa đọc
- Recent Orders table (last 5)
- Popular Posts (top 5 by views)
- Low Stock Products (< 10 items)
- Quick Actions buttons

**Data Fetching:**
```typescript
// Real-time listeners
- posts.count()
- products.count()
- orders.where(status, '==', 'pending').count()
- contacts.where(status, '==', 'new').count()
```

### 3. Posts Management
**Files:**
- `src/app/admin/posts/page.tsx` (List)
- `src/app/admin/posts/new/page.tsx` (Create)
- `src/app/admin/posts/[id]/page.tsx` (Edit)

**List View Features:**
- Table with columns: Thumbnail, Title, Category, Status, Views, Created, Actions
- Filters: Status (All/Draft/Published), Category, Date range
- Search: Full-text search title & content
- Bulk actions: Delete, Change status
- Pagination: 20 items/page
- Sort: Created (default), Title, Views

**Create/Edit Form:**
- Title (input, required, slug auto-generate)
- Slug (input, editable)
- Category (select from categories collection)
- Tags (multi-select with create new)
- Thumbnail (upload to ImgBB with preview)
- Gallery (multiple images, drag to reorder)
- Content (Rich Text Editor - Tiptap/CKEditor)
- Excerpt (textarea, auto-generate from content if empty)
- SEO Title, Description, Keywords
- Status (Draft/Published/Scheduled)
- Publish Date (datetime picker if scheduled)

**Rich Text Editor Requirements:**
- Bold, Italic, Underline
- Headings (H2-H4)
- Lists (ordered/unordered)
- Links (with nofollow option)
- Images (upload to ImgBB, responsive)
- Tables
- Blockquotes
- Text alignment
- Color picker

### 4. Products Management
**Files:**
- `src/app/admin/products/page.tsx`
- `src/app/admin/products/new/page.tsx`
- `src/app/admin/products/[id]/page.tsx`

**List View:**
- Table: Thumbnail, Name, SKU, Price, Stock, Status, Category
- Filters: Status, Category, Price range, Stock status
- Quick edit: Price, Stock inline
- Export: CSV, Excel

**Create/Edit Form:**
- Name, Slug
- SKU (unique)
- Description (Rich Text)
- Short Description (for cards)
- Price, Original Price (for sale)
- Cost (for profit calculation - hidden from customers)
- Images (thumbnail + gallery)
- Category (hierarchical select)
- Colors (color picker, multiple)
- Sizes (text input, multiple)
- Stock quantity
- Weight (for shipping)
- Badge (New/Sale/Bestseller toggle)
- SEO fields
- Related products (multi-select)
- Status: Active/Inactive/Out of Stock

### 5. Categories Management
**File:** `src/app/admin/categories/page.tsx`

**Features:**
- Tree view for hierarchical categories
- Drag & drop reorder
- Edit: Name, Slug, Description, Parent, Image, Order, Active
- Bulk delete (warn if has children or products)

### 6. Media Library
**File:** `src/app/admin/media/page.tsx`

**Features:**
- Grid view of all uploaded images
- Upload new (drag & drop, multiple)
- Upload to ImgBB API
- Organize by folders (auto-create: posts/, products/, banners/)
- Search by filename
- Filter by date, file type
- Delete (warn if in use)
- Copy URL button
- Image editor (basic: crop, rotate, resize)

### 7. Contacts/Orders Management
**File:** `src/app/admin/contacts/page.tsx`

**Features:**
- Table: Name, Email, Phone, Subject, Status, Date
- Filters: Status, Date range
- View detail: Show full message + reply form
- Reply: Send email via API (Resend/SendGrid)
- Mark as spam
- Export to CSV

### 8. Banners/Sliders Management
**File:** `src/app/admin/banners/page.tsx`

**Features:**
- List: Position, Title, Image, Active, Order
- Edit: Title, Subtitle, Image, Link, Position, Order, Date range
- Preview banner in context
- Toggle active/inactive

### 9. Site Settings
**File:** `src/app/admin/settings/page.tsx`

**Tabs:**
1. **General:**
   - Site Name, Tagline
   - Logo (upload)
   - Favicon
   - Contact Info (Phone, Email, Address, Zalo, Facebook)
   - Business hours

2. **SEO:**
   - Default Meta Title
   - Default Meta Description
   - OG Image
   - Google Analytics ID
   - Google Search Console verification
   - Robots.txt content
   - Sitemap generation

3. **Features:**
   - Enable/Disable Blog
   - Enable/Disable Shop/Cart
   - Enable/Disable Reviews
   - Enable/Disable Contact Form
   - Maintenance Mode toggle

4. **Appearance:**
   - Primary Color
   - Font Family
   - Home Page Layout (select sections)
   - Product Grid Layout (3/4 columns)

5. **Notifications:**
   - Email for new orders
   - Email for new contacts
   - Slack webhook

6. **Backup:**
   - Export all data (JSON)
   - Import data
   - Last backup time

### 10. Admin Users Management
**File:** `src/app/admin/users/page.tsx` (Super Admin only)

**Features:**
- List: Name, Email, Role, Last Login, Status
- Create new admin: Name, Email, Role, Permissions
- Edit: Change role, permissions, status
- Delete (warn, prevent delete super_admin)
- Cannot delete own account
- Activity log (last 10 actions)

---

## 📝 API Routes Structure

```
app/api/
├── auth/
│   └── route.ts              # POST: Login/Logout
├── posts/
│   ├── route.ts              # GET: List, POST: Create
│   └── [id]/
│       └── route.ts          # GET, PUT, DELETE
├── products/
│   ├── route.ts
│   └── [id]/
│       └── route.ts
├── categories/
│   ├── route.ts
│   └── [id]/
│       └── route.ts
├── contacts/
│   ├── route.ts
│   └── [id]/
│       └── route.ts
├── media/
│   └── upload/
│       └── route.ts          # POST to ImgBB
├── settings/
│   └── route.ts
└── admin-users/
    ├── route.ts
    └── [id]/
        └── route.ts
```

---

## 🛡️ Security Requirements

1. **Authentication:**
   - All admin routes protected by middleware
   - Firebase Auth token validation
   - Session timeout after 24 hours

2. **Authorization:**
   - Role-based access control (RBAC)
   - Super Admin: Full access
   - Admin: All except user management
   - Editor: Posts, Media, Contacts only

3. **Data Validation:**
   - Server-side validation for all forms
   - Sanitize HTML content (DOMPurify)
   - Rate limiting on API routes

4. **File Uploads:**
   - Max file size: 5MB
   - Allowed types: jpg, jpeg, png, webp
   - Virus scan (if possible)
   - Store in ImgBB only

---

## 📱 Responsive Design

### Mobile (< 640px)
- Sidebar becomes drawer (slide from left)
- Tables become cards
- Forms are single column
- Floating action button for primary action

### Tablet (640px - 1024px)
- Collapsible sidebar (icon only)
- Tables with horizontal scroll if needed
- Forms: 2 columns for related fields

### Desktop (> 1024px)
- Fixed sidebar (expanded)
- Full table view
- Forms: Multi-column layout
- Dashboard widgets: 4 columns

---

## 🎨 Component Library

### Shadcn/ui Components (Already Installed)
- Button, Input, Textarea, Select
- Dialog, Alert, Toast
- Table, Card, Tabs
- Dropdown Menu, Popover
- Calendar, Date Picker

### Custom Components to Build

```typescript
// RichTextEditor.tsx
interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

// ImageUploader.tsx
interface Props {
  value: string | string[];
  onChange: (urls: string | string[]) => void;
  multiple?: boolean;
  maxFiles?: number;
}

// DataTable.tsx
interface Props<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pagination: PaginationState;
  sorting: SortingState;
  filters: ColumnFiltersState;
}

// StatusBadge.tsx
type Status = 'active' | 'inactive' | 'pending' | 'success' | 'error';

// ConfirmDialog.tsx
interface Props {
  title: string;
  description: string;
  onConfirm: () => void;
  variant?: 'danger' | 'warning';
}
```

---

## 🔄 State Management

### Client State (React Context)
- AuthContext: User info, login/logout
- ToastContext: Notifications
- SidebarContext: Open/closed state

### Server State (React Query/SWR)
- Use SWR for data fetching with caching
- Optimistic updates for better UX
- Real-time subscriptions for dashboard

```typescript
// Example hooks
const { data: posts, isLoading } = useSWR('/api/posts', fetcher);
const { data: stats } = useSWR('/api/stats', fetcher, { refreshInterval: 30000 });
```

---

## 📊 Analytics & Monitoring

### Dashboard Metrics
- Page views (last 7/30 days)
- Top products by views/sales
- Top posts by views
- Conversion rate
- Cart abandonment rate

### Admin Activity Log
```typescript
interface ActivityLog {
  id: string;
  adminId: string;
  action: 'create' | 'update' | 'delete' | 'login' | 'logout';
  entity: 'post' | 'product' | 'category' | 'setting';
  entityId: string;
  details: string;
  createdAt: Timestamp;
}
```

---

## 🚀 Deployment Checklist

### Pre-deployment
- [ ] All environment variables set
- [ ] Firebase rules configured (secure)
- [ ] ImgBB API key tested
- [ ] Admin account created
- [ ] Default settings seeded

### Security
- [ ] Firebase Auth enabled
- [ ] Firestore rules restrict access
- [ ] API routes protected
- [ ] Input validation on all forms

### Performance
- [ ] Images optimized
- [ ] Lazy loading implemented
- [ ] Caching configured
- [ ] Bundle size checked

---

## 📝 File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx
│   │   ├── page.tsx (Dashboard)
│   │   ├── layout.tsx (Admin Layout)
│   │   ├── posts/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── categories/page.tsx
│   │   ├── media/page.tsx
│   │   ├── contacts/page.tsx
│   │   ├── banners/page.tsx
│   │   ├── settings/page.tsx
│   │   └── users/page.tsx
│   └── api/...
├── components/
│   ├── admin/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── DataTable.tsx
│   │   ├── RichTextEditor.tsx
│   │   ├── ImageUploader.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── ConfirmDialog.tsx
│   │   └── StatsCard.tsx
│   └── ui/ (shadcn components)
├── hooks/
│   ├── useAuth.ts
│   ├── useFirestore.ts
│   └── useToast.ts
├── lib/
│   ├── firebase.ts
│   ├── utils.ts
│   └── api.ts
├── types/
│   └── index.ts
└── data/
    ├── categories.ts
    └── posts.ts
```

---

## ⚡ Priority Implementation Order

### Phase 1: Core (Week 1)
1. ✅ Admin Layout (Sidebar, Header)
2. ✅ Authentication (Login/Protected routes)
3. ✅ Dashboard (Stats, Quick actions)
4. ✅ Posts CRUD (List, Create, Edit)

### Phase 2: Content (Week 2)
5. Rich Text Editor integration
6. Image Upload to ImgBB
7. Categories management
8. Products CRUD

### Phase 3: Advanced (Week 3)
9. Media Library
10. Contacts/Orders management
11. Banners management
12. Site Settings

### Phase 4: Polish (Week 4)
13. Admin Users management
14. Activity logs
15. Analytics dashboard
16. Testing & Bug fixes

---

## 🧪 Testing Strategy

### Unit Tests
- Utility functions
- API route handlers
- Component rendering

### Integration Tests
- Form submissions
- Image upload flow
- Auth flow

### E2E Tests (Playwright)
- Login → Create Post → Logout
- Create Product → Add to Cart
- Settings changes reflect on frontend

---

## 📚 External Dependencies

```json
{
  "dependencies": {
    "firebase": "^10.0.0",
    "@tiptap/react": "^2.0.0",
    "@tiptap/starter-kit": "^2.0.0",
    "@tiptap/extension-image": "^2.0.0",
    "swr": "^2.0.0",
    "react-hook-form": "^7.0.0",
    "zod": "^3.0.0",
    "@hookform/resolvers": "^3.0.0",
    "date-fns": "^3.0.0",
    "react-dropzone": "^14.0.0",
    "axios": "^1.6.0"
  }
}
```

---

## ❓ FAQ for Developers

**Q: Làm sao để thêm chức năng mới vào admin?**  
A: 1. Tạo page trong `app/admin/[feature]/page.tsx`, 2. Thêm menu item vào Sidebar, 3. Tạo API route nếu cần, 4. Update Firestore rules

**Q: Làm sao để thay đổi màu primary?**  
A: Sửa trong `tailwind.config.ts` và `src/app/admin/settings/page.tsx` (Appearance tab)

**Q: Làm sao để backup dữ liệu?**  
A: Vào Settings → Backup → Export. Hoặc dùng Firebase Console để export collection.

**Q: Làm sao để reset mật khẩu admin?**  
A: Dùng Firebase Console → Authentication → Reset password email. Hoặc tạo user mới trong Firestore.

---

## 🔗 Useful Links

- Firebase Console: https://console.firebase.google.com
- ImgBB API: https://api.imgbb.com/
- Vercel Dashboard: https://vercel.com/dashboard
- Next.js Docs: https://nextjs.org/docs
- Shadcn/ui Docs: https://ui.shadcn.com

---

**End of Document**

*Lưu ý: Document này cần được cập nhật khi có thay đổi lớn về requirement hoặc architecture.*

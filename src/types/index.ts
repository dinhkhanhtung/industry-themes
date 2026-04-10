// Admin Dashboard Types

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnail: string;
  images: string[];
  category: string;
  tags: string[];
  author: string;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  views: number;
  likes: number;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  cost?: number;
  images: string[];
  thumbnail: string;
  category: string;
  subcategory?: string;
  colors: string[];
  sizes: string[];
  stock: number;
  weight?: number;
  sku: string;
  badge?: 'new' | 'sale' | 'bestseller';
  status: 'active' | 'inactive' | 'out_of_stock';
  seo: SEO;
  relatedProducts?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent?: string;
  order: number;
  type: 'product' | 'post';
  isActive: boolean;
  count?: number;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'spam';
  createdAt: string;
  repliedAt?: string;
  notes?: string;
}

export interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
  thumbnail: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'editor';
  permissions: string[];
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

export interface SiteSettings {
  id: string;
  siteName: string;
  tagline?: string;
  logo?: string;
  favicon?: string;
  contact: {
    phone: string;
    email: string;
    address: string;
    zalo?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    ogImage?: string;
    googleAnalyticsId?: string;
    searchConsoleKey?: string;
  };
  features: {
    enableBlog: boolean;
    enableShop: boolean;
    enableCart: boolean;
    enableReviews: boolean;
    enableContactForm: boolean;
    maintenanceMode: boolean;
  };
  appearance: {
    primaryColor: string;
    fontFamily: string;
    homePageLayout: string[];
    productGridColumns: 3 | 4;
  };
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  position: 'hero' | 'promo' | 'sidebar' | 'footer';
  order: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  thumbnail?: string;
  folder: string;
  size: number;
  type: 'image' | 'video' | 'document';
  width?: number;
  height?: number;
  createdAt: string;
  uploadedBy: string;
}

export interface SEO {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}

export interface DashboardStats {
  posts: {
    total: number;
    published: number;
    draft: number;
    views: number;
    trend: number;
  };
  products: {
    total: number;
    active: number;
    lowStock: number;
    views: number;
    trend: number;
  };
  orders: {
    total: number;
    pending: number;
    revenue: number;
    trend: number;
  };
  contacts: {
    total: number;
    new: number;
    trend: number;
  };
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: 'create' | 'update' | 'delete' | 'login' | 'logout' | 'publish' | 'unpublish';
  entity: 'post' | 'product' | 'category' | 'banner' | 'setting' | 'user';
  entityId: string;
  entityName: string;
  details?: string;
  createdAt: string;
}

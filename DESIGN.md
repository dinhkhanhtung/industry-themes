# 🎨 Style Guide - Tranh Thêu Tay Hoa Thượng

Design system dựa trên **Luxury E-commerce** phong cách Shen Yun Collections.

---

## 🎯 Design Philosophy

- **Elegant & Timeless**: Thiết kế tối giản, tinh tế, tập trung vào sản phẩm
- **Warm & Inviting**: Màu nâu đồng ấm áp, tạo cảm giác gần gũi
- **High Contrast**: Chữ đen trên nền trắng ngà, dễ đọc
- **Generous Spacing**: Khoảng cách thoáng đãng, không gây ngộp

---

## 🎨 Color Palette

### Primary Colors
| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| **Bronze** | `#b45309` | `--primary` | CTAs, links, accents, buttons |
| **Bronze Dark** | `#92400e` | - | Hover states |
| **Bronze Light** | `#d97706` | - | Highlights |

### Neutral Colors
| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| **Stone 900** | `#1c1917` | `--foreground` | Headings, primary text |
| **Stone 600** | `#57534e` | `--muted-foreground` | Body text, descriptions |
| **Stone 400** | `#a8a29e` | - | Placeholder, disabled |
| **Stone 200** | `#e7e5e4` | `--border` | Borders, dividers |
| **Stone 100** | `#f5f5f4` | `--muted` | Backgrounds, hover states |

### Background Colors
| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| **Off White** | `#fffbf5` | `--background` | Main background |
| **Warm White** | `#fff7ed` | - | Cards, sections |
| **Pure White** | `#ffffff` | - | Cards, modals |

### Semantic Colors
| Name | Hex | Usage |
|------|-----|-------|
| **Success** | `#22c55e` | Success states, published |
| **Warning** | `#f59e0b` | Warnings, draft |
| **Error** | `#ef4444` | Errors, delete actions |
| **Info** | `#3b82f6` | Info, links |

---

## 🔤 Typography

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Hierarchy
| Level | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| **H1** | 48px | 400 | 1.2 | -0.02em | Page titles, Hero |
| **H2** | 36px | 400 | 1.3 | -0.01em | Section titles |
| **H3** | 30px | 500 | 1.4 | 0 | Subsection titles |
| **H4** | 24px | 500 | 1.4 | 0 | Card titles |
| **H5** | 20px | 500 | 1.5 | 0 | Small headings |
| **H6** | 16px | 600 | 1.5 | 0.05em | Labels, uppercase |
| **Body** | 16px | 400 | 1.6 | 0 | Paragraphs |
| **Body Small** | 14px | 400 | 1.5 | 0 | Secondary text |
| **Caption** | 12px | 400 | 1.4 | 0.01em | Metadata |
| **Overline** | 10px | 500 | 1.4 | 0.2em | Labels uppercase |

### Special Text Styles
- **Logo Text**: `font-serif`, tracking-wide
- **Price**: `font-medium`, `#b45309`
- **Badge**: `text-xs`, `uppercase`, `tracking-wider`

---

## 📐 Spacing System

### Base Unit: 4px
| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight spacing |
| `space-2` | 8px | Default gap |
| `space-3` | 12px | Small padding |
| `space-4` | 16px | Default padding |
| `space-6` | 24px | Section gaps |
| `space-8` | 32px | Large gaps |
| `space-12` | 48px | Section padding |
| `space-16` | 64px | Hero spacing |

### Container Widths
| Container | Max Width | Padding |
|-----------|-----------|---------|
| **sm** | 640px | 16px |
| **md** | 768px | 24px |
| **lg** | 1024px | 24px |
| **xl** | 1280px | 32px |
| **2xl** | 1400px | 48px |

---

## 🎴 Components

### Buttons

#### Primary Button
```tsx
<button className="bg-[#b45309] text-white px-6 py-3 text-sm font-medium tracking-wide hover:bg-[#1c1917] transition-all duration-300 uppercase">
  Mua ngay
</button>
```

#### Secondary Button
```tsx
<button className="bg-transparent border border-[#1c1917] text-[#1c1917] px-6 py-3 text-sm font-medium hover:bg-[#1c1917] hover:text-white transition-all duration-300">
  Xem thêm
</button>
```

#### Ghost Button
```tsx
<button className="text-[#57534e] hover:text-[#b45309] transition-colors text-sm">
  Hủy
</button>
```

### Cards

#### Product Card
```tsx
<div className="group bg-white">
  <div className="relative aspect-square bg-[#f5f5f4] overflow-hidden mb-3">
    <Image className="object-cover group-hover:scale-105 transition-transform duration-500" />
    {/* Badge */}
    <span className="absolute top-3 left-3 bg-[#b45309] text-white text-[10px] tracking-wider uppercase px-2 py-1">
      Mới
    </span>
    {/* Quick View */}
    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
      <button className="w-full bg-[#b45309] text-white py-3 text-xs font-medium tracking-wide hover:bg-[#1c1917]">
        Xem nhanh
      </button>
    </div>
  </div>
  <div className="text-center">
    {/* Color swatches */}
    <div className="flex justify-center gap-1.5 mb-2">
      <div className="w-4 h-4 rounded-full border border-[#e7e5e4]" style={{ backgroundColor }} />
    </div>
    {/* Rating */}
    <div className="flex justify-center gap-1 mb-1">
      <Star size={12} className="fill-[#b45309] text-[#b45309]" />
    </div>
    {/* Title & Price */}
    <h3 className="text-sm text-[#1c1917] mb-1 line-clamp-2">{name}</h3>
    <p className="text-sm font-medium text-[#b45309]">{price}</p>
  </div>
</div>
```

### Forms

#### Input
```tsx
<input 
  className="w-full px-4 py-2.5 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none focus:ring-2 focus:ring-[#b45309]/20 transition-all"
  placeholder="Placeholder"
/>
```

#### Label
```tsx
<label className="block text-sm font-medium text-[#1c1917] mb-1.5">
  Label <span className="text-red-500">*</span>
</label>
```

### Status Badges
```tsx
// Published
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
  <CheckCircle2 size={12} /> Đã đăng
</span>

// Draft
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
  <Clock3 size={12} /> Bản nháp
</span>

// New
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
  Mới
</span>
```

---

## 📱 Responsive Breakpoints

```javascript
// tailwind.config.ts
screens: {
  'sm': '640px',   // Mobile landscape
  'md': '768px',   // Tablet
  'lg': '1024px',  // Desktop
  'xl': '1280px',  // Large desktop
  '2xl': '1400px', // Extra large
}
```

### Common Responsive Patterns
```tsx
// Container
<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

// Grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

// Typography
<h1 className="text-3xl md:text-4xl lg:text-5xl">

// Spacing
<div className="py-8 md:py-12 lg:py-16">
```

---

## 🎭 Animations

### Transitions
```css
/* Default transition */
transition-all duration-300 ease-in-out

/* Button hover */
transition-colors duration-300

/* Image zoom */
transition-transform duration-500

/* Slide up */
transition-transform duration-300 ease-out
```

### Framer Motion Patterns
```tsx
// Fade in up
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, delay: index * 0.1 }}

// Stagger children
initial="hidden"
animate="visible"
variants={{
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}}

// Hover scale
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
```

---

## 🧩 Layout Patterns

### Header (2 rows)
```
Row 1: Logo (center) + Icons (right)
Row 2: Navigation (center, border-top)
```

### Section Spacing
```tsx
<section className="py-16 md:py-20 lg:py-24 bg-white">
  <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
    {/* Content */}
  </div>
</section>
```

### Admin Layout
```
Sidebar (260px) | Main Content (flex-1)
```

---

## 📝 Naming Conventions

### CSS Classes
- Sử dụng **kebab-case** cho custom classes
- Prefix với component name: `.product-card`, `.admin-sidebar`
- Tránh `!important`, dùng specificity

### Tailwind Order
1. Layout (display, position, flex, grid)
2. Box Model (width, height, padding, margin)
3. Visual (background, border, shadow)
4. Typography (font, text, color)
5. Interactive (hover, focus, transition)

Example:
```tsx
<div className="flex items-center justify-between w-full px-4 py-3 bg-white border border-[#e7e5e4] rounded-lg text-sm font-medium text-[#1c1917] hover:bg-[#f5f5f4] transition-colors">
```

---

## 🖼️ Image Guidelines

### Aspect Ratios
- **Product**: `4/5` (portrait)
- **Hero Banner**: `16/9` or `21/9`
- **Blog Thumbnail**: `16/9`
- **Category**: `1/1` (square)
- **Avatar**: `1/1` (circle)

### Image Treatment
- **Object Fit**: `cover` for most images
- **Loading**: Use blur placeholder
- **Hover**: Subtle scale (1.05) with transition

---

## ♿ Accessibility

### Focus States
```tsx
focus:outline-none focus:ring-2 focus:ring-[#b45309] focus:ring-offset-2
```

### Reduced Motion
```tsx
// Respect user preference
className="motion-safe:hover:scale-105"
```

### Contrast
- Text on light bg: `#1c1917` on `#fffbf5` (ratio 11.5:1)
- Text on dark bg: `#ffffff` on `#b45309` (ratio 4.5:1)
- Minimum ratio: 4.5:1 for normal text

---

## 🚀 Performance

### CSS Best Practices
- Sử dụng Tailwind's JIT mode
- Tránh custom CSS khi có thể dùng utility
- Group related utilities với `@apply` nếu cần

### Image Optimization
```tsx
<Image
  src={src}
  alt={alt}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={isHero}
/>
```

---

## 📚 File Structure

```
src/
├── app/
│   ├── globals.css          # Global styles + CSS variables
│   └── ...
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── layout/              # Header, Footer, Sidebar
│   ├── home/                # Home page sections
│   ├── product/             # Product-related
│   └── admin/               # Admin components
└── lib/
    └── utils.ts             # cn() helper
```

---

## 🔧 CSS Variables

```css
/* globals.css */
:root {
  --background: #fffbf5;
  --foreground: #1c1917;
  --primary: #b45309;
  --primary-foreground: #ffffff;
  --border: #e7e5e4;
  --input: #e7e5e4;
  --ring: #b45309;
  --radius: 0.5rem;
}
```

---

## ✅ Checklist

Khi tạo component mới:
- [ ] Sử dụng đúng màu từ palette
- [ ] Font size theo typography scale
- [ ] Spacing theo 4px grid
- [ ] Có hover/focus states
- [ ] Responsive trên mobile
- [ ] Animation mượt mà
- [ ] Accessible (contrast, focus)
- [ ] Dark mode ready (dùng CSS variables)

---

**Last Updated**: April 10, 2026

*Document này giúp đảm bảo tính nhất quán khi nhiều developer làm việc trên cùng codebase.*

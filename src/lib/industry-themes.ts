/**
 * INDUSTRY THEME PRESETS
 * 
 * Ghi chú triển khai: Giai đoạn 5.1.1
 * Tạo: 16/04/2026
 * 
 * Nguyên tắc thiết kế theo UI/UX Pro Max:
 * - Color palette phù hợp tâm lý ngành
 * - Typography scale nhất quán
 * - Border radius: Tinh tế (8px) / Mạnh mẽ (4px) / Hiện đại (12px)
 * - Shadow: Nhẹ (0-4px) / Trung bình (4-8px) / Đậm (8-16px)
 */

export type IndustryType = 
  | "tranh-theu" 
  | "do-go" 
  | "thoi-trang" 
  | "my-pham" 
  | "do-gia-dung" 
  | "do-dien-tu"
  | "custom";

export interface IndustryTheme {
  id: IndustryType;
  name: string;
  description: string;
  // Color Palette
  colors: {
    primary: string;      // Main brand color
    secondary: string;    // Accent/supporting color
    accent: string;         // CTA, highlights
    background: string;   // Page background
    surface: string;        // Cards, modals
    text: {
      primary: string;      // Headings, important text
      secondary: string;  // Body text
      muted: string;        // Descriptions, hints
    };
    border: string;         // Subtle borders
    success: string;        // Success states
    error: string;          // Error states
    warning: string;        // Warning states
  };
  // Typography
  typography: {
    headingFont: string;    // Font family for headings
    bodyFont: string;       // Font family for body
    scale: {
      xs: string;           // 12px - captions, labels
      sm: string;           // 14px - small text
      base: string;         // 16px - body
      lg: string;           // 18px - lead text
      xl: string;           // 20px - small headings
      "2xl": string;        // 24px - section headings
      "3xl": string;        // 30px - page headings
      "4xl": string;        // 36px - hero headings
    };
    lineHeight: {
      tight: number;        // 1.25 - headings
      normal: number;       // 1.5 - body
      relaxed: number;      // 1.75 - long text
    };
  };
  // Layout & Spacing
  layout: {
    borderRadius: {
      none: string;         // 0px - sharp edges
      sm: string;           // 4px - subtle rounding
      md: string;           // 8px - standard
      lg: string;           // 12px - pronounced
      xl: string;           // 16px - very rounded
      full: string;         // 9999px - pill/circle
    };
    shadow: {
      none: string;
      sm: string;           // Subtle shadow
      md: string;           // Standard elevation
      lg: string;           // High elevation
      xl: string;           // Maximum elevation
    };
    spacing: {
      xs: string;           // 4px
      sm: string;           // 8px
      md: string;           // 16px
      lg: string;           // 24px
      xl: string;           // 32px
      "2xl": string;      // 48px
    };
  };
  // Component Variants
  components: {
    button: {
      borderRadius: string;
      shadow: string;
      padding: string;
      fontWeight: string;
    };
    card: {
      borderRadius: string;
      shadow: string;
      hoverShadow: string;
      hoverLift: boolean;
    };
    input: {
      borderRadius: string;
      focusRing: string;
    };
    navigation: {
      style: "minimal" | "elevated" | "floating";
      sticky: boolean;
      transparent: boolean;
    };
  };
  // Animation
  animation: {
    duration: {
      fast: string;         // 150ms
      normal: string;       // 300ms
      slow: string;         // 500ms
    };
    easing: {
      default: string;      // ease-out
      bounce: string;       // cubic-bezier for playful
      smooth: string;       // cubic-bezier for elegant
    };
  };
  // Mega Menu Structure
  navigation: {
    categories: {
      title: string;
      items: string[];
    }[];
  };
}

// ============================================
// PRESET 1: TRANH THÊU TAY (Gốc - Giữ nguyên)
// ============================================
export const tranhTheuTheme: IndustryTheme = {
  id: "tranh-theu",
  name: "Tranh Thêu Tay",
  description: "Tinh tế, truyền thống, nghệ thuật",
  colors: {
    primary: "#b45309",     // Amber brown - ấm, truyền thống
    secondary: "#d97706",   // Vàng đất nhạt
    accent: "#f59e0b",      // Vàng tươi cho CTA
    background: "#fffbf5", // Trắng kem - giấy truyền thống
    surface: "#ffffff",     // Trắng tinh
    text: {
      primary: "#1c1917",   // Đen gần đen
      secondary: "#57534e", // Xám đá
      muted: "#a8a29e",     // Xám nhạt
    },
    border: "#e7e5e4",
    success: "#22c55e",
    error: "#ef4444",
    warning: "#f59e0b",
  },
  typography: {
    headingFont: "'Playfair Display', 'Noto Serif', serif",
    bodyFont: "'Be Vietnam Pro', 'Inter', sans-serif",
    scale: {
      xs: "0.75rem",        // 12px
      sm: "0.875rem",       // 14px
      base: "1rem",         // 16px
      lg: "1.125rem",       // 18px
      xl: "1.25rem",        // 20px
      "2xl": "1.5rem",      // 24px
      "3xl": "1.875rem",    // 30px
      "4xl": "2.25rem",     // 36px
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.6,          // Đã tăng cho dễ đọc
      relaxed: 1.75,
    },
  },
  layout: {
    borderRadius: {
      none: "0",
      sm: "4px",
      md: "8px",            // Standard - tinh tế
      lg: "12px",
      xl: "16px",
      full: "9999px",
    },
    shadow: {
      none: "none",
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    },
    spacing: {
      xs: "0.25rem",        // 4px
      sm: "0.5rem",         // 8px
      md: "1rem",           // 16px
      lg: "1.5rem",         // 24px
      xl: "2rem",           // 32px
      "2xl": "3rem",        // 48px
    },
  },
  components: {
    button: {
      borderRadius: "8px",
      shadow: "none",
      padding: "0.75rem 1.5rem",
      fontWeight: "600",
    },
    card: {
      borderRadius: "8px",
      shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      hoverShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      hoverLift: true,
    },
    input: {
      borderRadius: "8px",
      focusRing: "2px solid #b45309",
    },
    navigation: {
      style: "elevated",
      sticky: true,
      transparent: false,
    },
  },
  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    easing: {
      default: "ease-out",
      bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  navigation: {
    categories: [
      {
        title: "Tranh Thêu Hoa",
        items: ["Hoa Sen", "Hoa Đào", "Hoa Mẫu Đơn", "Hoa Mai"],
      },
      {
        title: "Tranh Thêu Chim",
        items: ["Chim Hạc", "Chim Sẻ", "Tùng Hạc"],
      },
      {
        title: "Phong Cảnh",
        items: ["Sơn Thủy", "Làng Quê", "Phố Cổ"],
      },
    ],
  },
};

// ============================================
// PRESET 2: ĐỒ GỖ (Mạnh mẽ, cổ điển)
// ============================================
export const doGoTheme: IndustryTheme = {
  id: "do-go",
  name: "Đồ Gỗ Thủ Công",
  description: "Mạnh mẽ, bền vững, tinh xảo",
  colors: {
    primary: "#8B4513",     // Saddle brown - màu gỗ đặc trưng
    secondary: "#A0522D",   // Sienna - gỗ sáng hơn
    accent: "#D2691E",      // Chocolate - nổi bật
    background: "#faf8f5",  // Trắng ngà - tôn gỗ
    surface: "#ffffff",
    text: {
      primary: "#2c1810",   // Nâu đen - đậm như gỗ mun
      secondary: "#5d4037", // Nâu trung bình
      muted: "#8d6e63",     // Nâu nhạt
    },
    border: "#d7ccc8",      // Gỗ sáng cho border
    success: "#4caf50",
    error: "#c62828",
    warning: "#ff6f00",
  },
  typography: {
    headingFont: "'Merriweather', 'Georgia', serif", // Đậm, cổ điển
    bodyFont: "'Open Sans', 'Inter', sans-serif",     // Rõ ràng
    scale: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.6,
      relaxed: 1.75,
    },
  },
  layout: {
    borderRadius: {
      none: "0",
      sm: "2px",            // Góc vuông hơn - mạnh mẽ
      md: "4px",            // Đồ gỗ thường vuông vức
      lg: "8px",
      xl: "12px",
      full: "9999px",
    },
    shadow: {
      none: "none",
      sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -2px rgba(0, 0, 0, 0.1)", // Đậm hơn
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "3rem",
    },
  },
  components: {
    button: {
      borderRadius: "4px",  // Vuông hơn
      shadow: "0 2px 4px rgba(0,0,0,0.1)",
      padding: "0.875rem 1.75rem", // To hơn
      fontWeight: "700",    // Đậm hơn
    },
    card: {
      borderRadius: "4px",  // Vuông như gỗ
      shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.15)",
      hoverShadow: "0 12px 20px -5px rgba(0, 0, 0, 0.2)", // Đậm hơn
      hoverLift: true,
    },
    input: {
      borderRadius: "4px",
      focusRing: "2px solid #8B4513",
    },
    navigation: {
      style: "elevated",
      sticky: true,
      transparent: false,
    },
  },
  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    easing: {
      default: "ease-out",
      bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  navigation: {
    categories: [
      {
        title: "Bàn Ghế",
        items: ["Bàn ăn", "Bàn trà", "Ghế sofa", "Ghế đơn"],
      },
      {
        title: "Tủ Kệ",
        items: ["Tủ áo", "Kệ TV", "Tủ giày", "Kệ sách"],
      },
      {
        title: "Phòng Ngủ",
        items: ["Giường ngủ", "Tab đầu giường", "Bàn trang điểm"],
      },
    ],
  },
};

// ============================================
// PRESET 3: THỜI TRANG (Hiện đại, năng động)
// ============================================
export const thoiTrangTheme: IndustryTheme = {
  id: "thoi-trang",
  name: "Thời Trang",
  description: "Hiện đại, trendy, cá tính",
  colors: {
    primary: "#ec4899",     // Pink - nữ tính, trendy
    secondary: "#f472b6",   // Hồng nhạt
    accent: "#db2777",      // Hồng đậm cho CTA
    background: "#fdf2f8",  // Hồng rất nhạt
    surface: "#ffffff",
    text: {
      primary: "#1f2937",   // Xám đen
      secondary: "#4b5563", // Xám trung
      muted: "#9ca3af",     // Xám nhạt
    },
    border: "#fbcfe8",
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
  },
  typography: {
    headingFont: "'Poppins', 'Montserrat', sans-serif", // Hiện đại
    bodyFont: "'Inter', 'Roboto', sans-serif",
    scale: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  layout: {
    borderRadius: {
      none: "0",
      sm: "8px",
      md: "12px",           // Bo nhiều - hiện đại
      lg: "16px",
      xl: "24px",
      full: "9999px",
    },
    shadow: {
      none: "none",
      sm: "0 2px 4px 0 rgba(0, 0, 0, 0.05)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.04)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "3rem",
    },
  },
  components: {
    button: {
      borderRadius: "9999px", // Pill shape - trendy
      shadow: "0 2px 4px rgba(236, 72, 153, 0.2)",
      padding: "0.75rem 2rem",
      fontWeight: "600",
    },
    card: {
      borderRadius: "16px",   // Bo nhiều
      shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.08)",
      hoverShadow: "0 12px 24px -4px rgba(0, 0, 0, 0.12)",
      hoverLift: true,
    },
    input: {
      borderRadius: "9999px", // Pill
      focusRing: "2px solid #ec4899",
    },
    navigation: {
      style: "floating",      // Navigation nổi
      sticky: true,
      transparent: true,      // Trong suốt ban đầu
    },
  },
  animation: {
    duration: {
      fast: "200ms",
      normal: "300ms",
      slow: "400ms",
    },
    easing: {
      default: "ease-out",
      bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  navigation: {
    categories: [
      {
        title: "Nữ",
        items: ["Áo", "Quần", "Váy", "Đầm", "Phụ kiện"],
      },
      {
        title: "Nam",
        items: ["Áo", "Quần", "Áo khoác", "Phụ kiện"],
      },
      {
        title: "Trẻ Em",
        items: ["Bé gái", "Bé trai", "Đồ bộ", "Phụ kiện"],
      },
    ],
  },
};

// ============================================
// PRESET 4: MỸ PHẨM (Sang trọng, tinh tế)
// ============================================
export const myPhamTheme: IndustryTheme = {
  id: "my-pham",
  name: "Mỹ Phẩm",
  description: "Sang trọng, tinh tế, làm đẹp",
  colors: {
    primary: "#a855f7",     // Tím - sang trọng
    secondary: "#c084fc",   // Tím nhạt
    accent: "#7c3aed",      // Tím đậm
    background: "#faf5ff",  // Tím rất nhạt
    surface: "#ffffff",
    text: {
      primary: "#1a1a2e",   // Đen tím
      secondary: "#4a4a6a", // Xám tím
      muted: "#8b8ba7",     // Xám nhạt
    },
    border: "#e9d5ff",
    success: "#22c55e",
    error: "#ef4444",
    warning: "#f59e0b",
  },
  typography: {
    headingFont: "'Playfair Display', 'Cormorant Garamond', serif", // Sang trọng
    bodyFont: "'Lato', 'Inter', sans-serif", // Mềm mại
    scale: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.6,
      relaxed: 1.8,         // Cao hơn - thoáng
    },
  },
  layout: {
    borderRadius: {
      none: "0",
      sm: "8px",
      md: "12px",
      lg: "20px",           // Bo nhiều - mềm mại
      xl: "28px",
      full: "9999px",
    },
    shadow: {
      none: "none",
      sm: "0 2px 8px 0 rgba(168, 85, 247, 0.08)",
      md: "0 4px 12px -2px rgba(168, 85, 247, 0.1), 0 2px 6px -2px rgba(0, 0, 0, 0.05)",
      lg: "0 12px 24px -4px rgba(168, 85, 247, 0.12), 0 6px 12px -6px rgba(0, 0, 0, 0.05)",
      xl: "0 24px 32px -6px rgba(168, 85, 247, 0.15), 0 10px 16px -8px rgba(0, 0, 0, 0.05)",
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2.5rem",         // Rộng hơn - sang trọng
      "2xl": "4rem",
    },
  },
  components: {
    button: {
      borderRadius: "9999px",
      shadow: "0 4px 14px rgba(168, 85, 247, 0.3)",
      padding: "1rem 2.5rem", // To, thoáng
      fontWeight: "500",
    },
    card: {
      borderRadius: "20px",
      shadow: "0 4px 12px -2px rgba(168, 85, 247, 0.1)",
      hoverShadow: "0 16px 32px -6px rgba(168, 85, 247, 0.15)",
      hoverLift: true,
    },
    input: {
      borderRadius: "12px",
      focusRing: "2px solid #a855f7",
    },
    navigation: {
      style: "minimal",
      sticky: true,
      transparent: true,
    },
  },
  animation: {
    duration: {
      fast: "250ms",
      normal: "400ms",
      slow: "600ms",
    },
    easing: {
      default: "ease-out",
      bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  navigation: {
    categories: [
      {
        title: "Chăm Sóc Da",
        items: ["Sữa rửa mặt", "Toner", "Serum", "Kem dưỡng", "Kem chống nắng"],
      },
      {
        title: "Trang Điểm",
        items: ["Kem nền", "Phấn phủ", "Son môi", "Mascara", "Phấn mắt"],
      },
      {
        title: "Chăm Sóc Tóc",
        items: ["Dầu gội", "Dầu xả", "Kem ủ", "Tinh dầu"],
      },
    ],
  },
};

// ============================================
// PRESET 5: ĐỒ GIA DỤNG (Sạch sẽ, tiện dụng)
// ============================================
export const doGiaDungTheme: IndustryTheme = {
  id: "do-gia-dung",
  name: "Đồ Gia Dụng",
  description: "Sạch sẽ, tiện dụng, hiện đại",
  colors: {
    primary: "#059669",     // Xanh lá - sạch, tươi
    secondary: "#10b981",   // Xanh lá nhạt
    accent: "#047857",      // Xanh lá đậm
    background: "#f0fdf4",  // Xanh lá rất nhạt
    surface: "#ffffff",
    text: {
      primary: "#1f2937",
      secondary: "#374151",
      muted: "#6b7280",
    },
    border: "#d1fae5",
    success: "#22c55e",
    error: "#ef4444",
    warning: "#f59e0b",
  },
  typography: {
    headingFont: "'Nunito', 'Quicksand', sans-serif", // Thân thiện
    bodyFont: "'Inter', 'Roboto', sans-serif",
    scale: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.6,
      relaxed: 1.75,
    },
  },
  layout: {
    borderRadius: {
      none: "0",
      sm: "6px",
      md: "10px",
      lg: "14px",
      xl: "18px",
      full: "9999px",
    },
    shadow: {
      none: "none",
      sm: "0 2px 4px 0 rgba(0, 0, 0, 0.04)",
      md: "0 4px 8px -2px rgba(0, 0, 0, 0.06), 0 2px 4px -2px rgba(0, 0, 0, 0.03)",
      lg: "0 8px 16px -4px rgba(0, 0, 0, 0.08), 0 4px 8px -4px rgba(0, 0, 0, 0.03)",
      xl: "0 16px 24px -6px rgba(0, 0, 0, 0.1), 0 8px 12px -6px rgba(0, 0, 0, 0.04)",
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "3rem",
    },
  },
  components: {
    button: {
      borderRadius: "10px",
      shadow: "0 2px 4px rgba(5, 150, 105, 0.15)",
      padding: "0.75rem 1.5rem",
      fontWeight: "600",
    },
    card: {
      borderRadius: "10px",
      shadow: "0 4px 8px -2px rgba(0, 0, 0, 0.06)",
      hoverShadow: "0 8px 16px -4px rgba(0, 0, 0, 0.1)",
      hoverLift: true,
    },
    input: {
      borderRadius: "10px",
      focusRing: "2px solid #059669",
    },
    navigation: {
      style: "minimal",
      sticky: true,
      transparent: false,
    },
  },
  animation: {
    duration: {
      fast: "150ms",
      normal: "250ms",
      slow: "400ms",
    },
    easing: {
      default: "ease-out",
      bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  navigation: {
    categories: [
      {
        title: "Nhà Bếp",
        items: ["Nồi - Chảo", "Bát đĩa", "Dụng cụ nấu", "Máy xay"],
      },
      {
        title: "Phòng Ngủ",
        items: ["Chăn ga", "Gối", "Rèm", "Đèn ngủ"],
      },
      {
        title: "Phòng Tắm",
        items: ["Khăn tắm", "Kệ treo", "Thảm", "Bộ vệ sinh"],
      },
    ],
  },
};

// ============================================
// PRESET 6: ĐỒ ĐIỆN TỬ (Tech, hiện đại)
// ============================================
export const doDienTuTheme: IndustryTheme = {
  id: "do-dien-tu",
  name: "Đồ Điện Tử",
  description: "Công nghệ, hiện đại, chuyên nghiệp",
  colors: {
    primary: "#2563eb",     // Xanh dương tech
    secondary: "#3b82f6",   // Xanh dương nhạt
    accent: "#1d4ed8",      // Xanh dương đậm
    background: "#eff6ff",  // Xanh rất nhạt
    surface: "#ffffff",
    text: {
      primary: "#0f172a",   // Đen xanh
      secondary: "#334155", // Xanh xám
      muted: "#64748b",     // Xám xanh
    },
    border: "#bfdbfe",
    success: "#22c55e",
    error: "#ef4444",
    warning: "#f59e0b",
  },
  typography: {
    headingFont: "'Exo 2', 'Orbitron', sans-serif", // Tech, geometric
    bodyFont: "'Inter', 'Roboto', sans-serif",
    scale: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
    },
  },
  layout: {
    borderRadius: {
      none: "0",
      sm: "4px",            // Sharp, tech
      md: "6px",
      lg: "8px",
      xl: "12px",
      full: "9999px",
    },
    shadow: {
      none: "none",
      sm: "0 1px 2px 0 rgba(37, 99, 235, 0.05)",
      md: "0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
      lg: "0 10px 15px -3px rgba(37, 99, 235, 0.15), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(37, 99, 235, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "3rem",
    },
  },
  components: {
    button: {
      borderRadius: "6px",
      shadow: "0 2px 8px rgba(37, 99, 235, 0.2)",
      padding: "0.75rem 1.5rem",
      fontWeight: "600",
    },
    card: {
      borderRadius: "6px",  // Sharp edges
      shadow: "0 4px 6px -1px rgba(37, 99, 235, 0.1)",
      hoverShadow: "0 12px 20px -5px rgba(37, 99, 235, 0.2)",
      hoverLift: true,
    },
    input: {
      borderRadius: "6px",
      focusRing: "2px solid #2563eb",
    },
    navigation: {
      style: "elevated",
      sticky: true,
      transparent: false,
    },
  },
  animation: {
    duration: {
      fast: "100ms",
      normal: "200ms",
      slow: "300ms",
    },
    easing: {
      default: "ease-out",
      bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  navigation: {
    categories: [
      {
        title: "Điện Thoại",
        items: ["iPhone", "Samsung", "Xiaomi", "Oppo", "Phụ kiện"],
      },
      {
        title: "Laptop",
        items: ["MacBook", "Dell", "HP", "Asus", "Lenovo"],
      },
      {
        title: "Thiết Bị",
        items: ["Tai nghe", "Loa", "Camera", "Màn hình", "Chuột - Bàn phím"],
      },
    ],
  },
};

// ============================================
// PRESET 7: CUSTOM (Tùy chỉnh)
// ============================================
export const customTheme: IndustryTheme = {
  // Copy from tranh-theu nhưng override id/name/description
  ...tranhTheuTheme,
  id: "custom",
  name: "Tùy Chỉnh",
  description: "Tùy chỉnh hoàn toàn theo ý muốn",
};

// ============================================
// EXPORT ALL THEMES
// ============================================
export const industryThemes: Record<IndustryType, IndustryTheme> = {
  "tranh-theu": tranhTheuTheme,
  "do-go": doGoTheme,
  "thoi-trang": thoiTrangTheme,
  "my-pham": myPhamTheme,
  "do-gia-dung": doGiaDungTheme,
  "do-dien-tu": doDienTuTheme,
  "custom": customTheme,
};

// Helper functions
export const getIndustryTheme = (industry: IndustryType): IndustryTheme => {
  return industryThemes[industry] || tranhTheuTheme;
};

export const getAllIndustries = (): { id: IndustryType; name: string; description: string }[] => {
  return Object.values(industryThemes).map((theme) => ({
    id: theme.id,
    name: theme.name,
    description: theme.description,
  }));
};

// Default export
export default industryThemes;

/**
 * GHI CHÚ TRIỂN KHAI:
 * 
 * 1. File này chứa định nghĩa 7 industry presets hoàn chỉnh
 * 2. Mỗi preset có: colors, typography, layout, components, animation, navigation
 * 3. Có thể thêm preset mới bằng cách copy và modify
 * 4. Export functions để dễ dùng trong components
 * 
 * Usage:
 * import { getIndustryTheme, IndustryType } from '@/lib/industry-themes';
 * const theme = getIndustryTheme('do-go');
 * 
 * Next steps:
 * - Giai đoạn 5.1.2: Update WebsiteContext để lưu industry selection
 * - Giai đoạn 5.1.3: Update components để dùng dynamic theme
 * - Giai đoạn 5.1.4: Tạo Admin UI cho theme selection
 */

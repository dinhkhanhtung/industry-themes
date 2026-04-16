"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { IndustryType, IndustryTheme, getIndustryTheme } from "@/lib/industry-themes";

export interface WebsiteSettings {
  // Industry Theme Configuration
  industry: IndustryType;           // Chọn ngành nghề
  customColors?: {                  // Override màu tùy chỉnh (optional)
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  layoutStyle?: "rounded" | "square" | "modern";  // Style bo góc
  
  brand: {
    name: string;
    slogan: string;
    description: string;
    logo?: string;
    favicon?: string;
  };
  contact: {
    phone: string;
    email: string;
    zalo: string;
    facebook: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    twitter?: string;
    address: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
    analyticsId?: string;
  };
  shipping: {
    fee: number;
    freeshipThreshold: number;
    estimatedTime: string;
  };
  payment: {
    cod: boolean;
    bankTransfer: {
      enabled: boolean;
      bankName: string;
      accountNumber: string;
      accountName: string;
      branch: string;
    };
  };
  modules: {
    courses: boolean;      // Hiển thị Khóa học
    resources: boolean;    // Hiển thị Tài nguyên/Mẫu thêu
    blog: boolean;         // Hiển thị Tin tức/Blog
  };
  popup: {
    enabled: boolean;      // Bật/tắt popup
    template: "image" | "text" | "promotion";  // Mẫu popup
    image?: string;        // Ảnh popup (đường dẫn ImgBB)
    title?: string;        // Tiêu đề popup
    content?: string;      // Nội dung popup
    buttonText?: string;   // Text nút button
    buttonLink?: string;   // Link nút button
    showAfter: number;     // Hiện sau bao nhiêu giây
    showOnce: boolean;     // Chỉ hiện 1 lần
  };
}

const defaultSettings: WebsiteSettings = {
  // Theme defaults
  industry: "tranh-theu",           // Mặc định: tranh thêu
  layoutStyle: "rounded",           // Mặc định: bo góc
  
  brand: {
    name: "Cửa Hàng",
    slogan: "Chất lượng - Uy tín - Tận tâm",
    description: "Website bán hàng chuyên nghiệp với đầy đủ tính năng.",
  },
  contact: {
    phone: "0982581222",
    email: "lienhe@example.com",
    zalo: "0982581222",
    facebook: "https://facebook.com/tranhtheutay",
    instagram: "https://instagram.com/tranhtheutay",
    youtube: "https://youtube.com/@tranhtheutay",
    tiktok: "https://tiktok.com/@tranhtheutay",
    twitter: "",
    address: "Cổ Điện, Hải Bối, Đông Anh, Hà Nội",
  },
  seo: {
    title: "Tên Thương Hiệu - Website bán hàng & khóa học",
    description: "Mô tả SEO cho website của bạn.",
    keywords: "từ khóa, sản phẩm, dịch vụ",
  },
  shipping: {
    fee: 30000,
    freeshipThreshold: 500000,
    estimatedTime: "2-5 ngày",
  },
  payment: {
    cod: true,
    bankTransfer: {
      enabled: true,
      bankName: "Tên ngân hàng",
      accountNumber: "Số tài khoản",
      accountName: "Tên chủ tài khoản",
      branch: "Chi nhánh",
    },
  },
  modules: {
    courses: true,      // Bật Khóa học
    resources: true,      // Bật Tài nguyên
    blog: true,           // Bật Tin tức
  },
  popup: {
    enabled: false,      // Mặc định tắt
    template: "promotion",
    image: "",
    title: "ƯU ĐÃI ĐẶC BIỆT",
    content: "Giảm 20% cho đơn hàng đầu tiên! Nhập mã: NEW20",
    buttonText: "Mua ngay",
    buttonLink: "/san-pham",
    showAfter: 3,        // Hiện sau 3 giây
    showOnce: true,      // Chỉ hiện 1 lần
  },
};

const STORAGE_KEY = "website_settings";

interface WebsiteContextType {
  settings: WebsiteSettings;
  updateSettings: (newSettings: WebsiteSettings) => void;
  // Theme helpers
  currentTheme: IndustryTheme;      // Theme hiện tại (đã merge với custom)
  getThemeValue: <K extends keyof IndustryTheme>(key: K) => IndustryTheme[K];
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export function WebsiteProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<WebsiteSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing website settings", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateSettings = (newSettings: WebsiteSettings) => {
    setSettings(newSettings);
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
  };

  useEffect(() => {
    if (isLoaded) {
      document.title = settings.seo.title;
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', settings.seo.description);

      // Update keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', settings.seo.keywords);

      // Update favicon if exists
      if (settings.brand.favicon) {
        let linkFavicon = document.querySelector('link[rel="icon"]');
        if (!linkFavicon) {
          linkFavicon = document.createElement('link');
          linkFavicon.setAttribute('rel', 'icon');
          document.head.appendChild(linkFavicon);
        }
        linkFavicon.setAttribute('href', settings.brand.favicon);
      }
    }
  }, [settings.seo, settings.brand.favicon, isLoaded]);

  // Theme resolver: Merge base theme with custom colors
  const currentTheme = React.useMemo((): IndustryTheme => {
    const baseTheme = getIndustryTheme(settings.industry);
    
    // If no custom colors, return base theme
    if (!settings.customColors) {
      return baseTheme;
    }
    
    // Merge with custom colors
    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        ...(settings.customColors.primary && { primary: settings.customColors.primary }),
        ...(settings.customColors.secondary && { secondary: settings.customColors.secondary }),
        ...(settings.customColors.accent && { accent: settings.customColors.accent }),
      },
    };
  }, [settings.industry, settings.customColors]);

  // Helper to get theme values
  const getThemeValue = <K extends keyof IndustryTheme>(key: K): IndustryTheme[K] => {
    return currentTheme[key];
  };

  return (
    <WebsiteContext.Provider value={{ settings, updateSettings, currentTheme, getThemeValue }}>
      {children}
    </WebsiteContext.Provider>
  );
}

export function useWebsite() {
  const context = useContext(WebsiteContext);
  if (context === undefined) {
    throw new Error("useWebsite must be used within a WebsiteProvider");
  }
  return context;
}

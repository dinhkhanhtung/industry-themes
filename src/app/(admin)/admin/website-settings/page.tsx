"use client";

import { useState } from "react";
import {
  Globe, Phone, Clock, Save, Upload,
  Image as ImageIcon, Palette, Layout,
  CreditCard, Truck, Search as SearchIcon,
  Facebook, Mail, MapPin, Zap, CheckCircle2,
  Layers, BookOpen, FileText, GraduationCap,
  Gift
} from "lucide-react";
import { useWebsite } from "@/context/WebsiteContext";

export default function WebsiteSettingsPage() {
  const { settings, updateSettings } = useWebsite();
  const [activeTab, setActiveTab] = useState<"general" | "contact" | "seo" | "appearance" | "payment" | "shipping" | "modules" | "popup">("general");
  const [tempSettings, setTempSettings] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    updateSettings(tempSettings);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky top-0 z-20 bg-[#fffbf5]/80 backdrop-blur-md py-4 border-b border-[#e7e5e4]">
        <div>
          <h1 className="text-2xl font-bold text-[#1c1917] tracking-tight">Cài đặt Website</h1>
          <p className="text-sm text-[#57534e] mt-1 font-medium">Cấu hình thông tin, giao diện và vận hành website</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center gap-2 px-6 py-2.5 text-white font-bold rounded-xl transition-all press-feedback ${
            saveSuccess ? "bg-green-600" : "bg-[#b45309] hover:bg-[#1c1917]"
          }`}
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : saveSuccess ? (
            <CheckCircle2 size={18} />
          ) : (
            <Save size={18} />
          )}
          {saveSuccess ? "Đã lưu thành công" : "Lưu tất cả thay đổi"}
        </button>
      </div>

      {/* Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-[#e7e5e4] p-3 sticky top-28 shadow-sm">
            <nav className="space-y-1">
              {[
                { id: "general", label: "Thương hiệu", icon: Globe },
                { id: "contact", label: "Liên hệ", icon: Phone },
                { id: "seo", label: "Cấu hình SEO", icon: SearchIcon },
                { id: "appearance", label: "Giao diện", icon: Palette },
                { id: "payment", label: "Thanh toán", icon: CreditCard },
                { id: "shipping", label: "Vận chuyển", icon: Truck },
                { id: "modules", label: "Tính năng", icon: Layers },
                { id: "popup", label: "Popup quảng cáo", icon: Gift },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold text-sm ${
                    activeTab === tab.id
                      ? "bg-[#b45309] text-white shadow-md shadow-[#b45309]/20"
                      : "text-[#57534e] hover:bg-[#b45309]/5 hover:text-[#b45309]"
                  }`}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-[#e7e5e4] p-8 shadow-sm">
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4 pb-6 border-b border-[#e7e5e4]">
                  <div className="w-12 h-12 bg-[#b45309]/10 rounded-2xl flex items-center justify-center text-[#b45309]">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1c1917] text-lg tracking-tight">Thông tin thương hiệu</h3>
                    <p className="text-sm text-[#57534e] font-medium">Thiết lập tên tuổi và hình ảnh cốt lõi</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Tên website</label>
                    <input 
                      type="text" 
                      value={tempSettings.brand.name} 
                      onChange={(e) => setTempSettings({...tempSettings, brand: {...tempSettings.brand, name: e.target.value}})}
                      className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl outline-none font-medium" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Slogan</label>
                    <input 
                      type="text" 
                      value={tempSettings.brand.slogan} 
                      onChange={(e) => setTempSettings({...tempSettings, brand: {...tempSettings.brand, slogan: e.target.value}})}
                      className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl outline-none font-medium" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Mô tả ngắn</label>
                  <textarea
                    value={tempSettings.brand.description}
                    onChange={(e) => setTempSettings({...tempSettings, brand: {...tempSettings.brand, description: e.target.value}})}
                    rows={3}
                    className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl outline-none font-medium resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Logo Website</label>
                    <div className="aspect-[3/1] bg-[#fffbf5] border-2 border-dashed border-[#e7e5e4] rounded-2xl flex flex-col items-center justify-center hover:border-[#b45309] transition-all cursor-pointer overflow-hidden">
                      {tempSettings.brand.logo ? (
                        <img src={tempSettings.brand.logo} alt="Logo" className="w-full h-full object-contain p-4" />
                      ) : (
                        <>
                          <Upload size={24} className="mb-2 text-[#57534e]" />
                          <p className="text-xs font-bold text-[#57534e]">Tải lên logo</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Favicon</label>
                    <div className="w-24 h-24 bg-[#fffbf5] border-2 border-dashed border-[#e7e5e4] rounded-2xl flex flex-col items-center justify-center hover:border-[#b45309] transition-all cursor-pointer overflow-hidden">
                      {tempSettings.brand.favicon ? (
                        <img src={tempSettings.brand.favicon} alt="Favicon" className="w-full h-full object-contain p-2" />
                      ) : (
                        <>
                          <ImageIcon size={24} className="mb-2 text-[#57534e]" />
                          <p className="text-[10px] font-bold text-[#57534e]">Tải lên</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Settings */}
            {activeTab === "contact" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4 pb-6 border-b border-[#e7e5e4]">
                  <div className="w-12 h-12 bg-[#b45309]/10 rounded-2xl flex items-center justify-center text-[#b45309]">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1c1917] text-lg tracking-tight">Thông tin liên hệ</h3>
                    <p className="text-sm text-[#57534e] font-medium">Thông tin hiển thị tại Header, Footer và Liên hệ</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Số điện thoại</label>
                    <input 
                      type="tel" 
                      value={tempSettings.contact.phone} 
                      onChange={(e) => setTempSettings({...tempSettings, contact: {...tempSettings.contact, phone: e.target.value}})}
                      className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Email hỗ trợ</label>
                    <input 
                      type="email" 
                      value={tempSettings.contact.email} 
                      onChange={(e) => setTempSettings({...tempSettings, contact: {...tempSettings.contact, email: e.target.value}})}
                      className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Zalo</label>
                    <input 
                      type="text" 
                      value={tempSettings.contact.zalo} 
                      onChange={(e) => setTempSettings({...tempSettings, contact: {...tempSettings.contact, zalo: e.target.value}})}
                      className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Facebook Page</label>
                    <input 
                      type="text" 
                      value={tempSettings.contact.facebook} 
                      onChange={(e) => setTempSettings({...tempSettings, contact: {...tempSettings.contact, facebook: e.target.value}})}
                      className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl outline-none" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Địa chỉ Showroom</label>
                  <input 
                    type="text" 
                    value={tempSettings.contact.address} 
                    onChange={(e) => setTempSettings({...tempSettings, contact: {...tempSettings.contact, address: e.target.value}})}
                    className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl outline-none" 
                  />
                </div>
              </div>
            )}

            {/* SEO Settings */}
            {activeTab === "seo" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4 pb-6 border-b border-[#e7e5e4]">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-600">
                    <SearchIcon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1c1917] text-lg tracking-tight">Cấu hình SEO</h3>
                    <p className="text-sm text-[#57534e] font-medium">Tối ưu hóa website trên Google</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Meta Title mặc định</label>
                    <input 
                      type="text" 
                      value={tempSettings.seo.title} 
                      onChange={(e) => setTempSettings({...tempSettings, seo: {...tempSettings.seo, title: e.target.value}})}
                      className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Meta Description</label>
                    <textarea 
                      rows={3} 
                      value={tempSettings.seo.description} 
                      onChange={(e) => setTempSettings({...tempSettings, seo: {...tempSettings.seo, description: e.target.value}})}
                      className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl outline-none resize-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1c1917] uppercase tracking-wider">Từ khóa (Keywords)</label>
                    <input 
                      type="text" 
                      value={tempSettings.seo.keywords} 
                      onChange={(e) => setTempSettings({...tempSettings, seo: {...tempSettings.seo, keywords: e.target.value}})}
                      className="w-full px-4 py-3 border border-[#e7e5e4] rounded-xl outline-none" 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Modules Settings */}
            {activeTab === "modules" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4 pb-6 border-b border-[#e7e5e4]">
                  <div className="w-12 h-12 bg-[#b45309]/10 rounded-2xl flex items-center justify-center text-[#b45309]">
                    <Layers size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#1c1917]">Tính năng</h2>
                    <p className="text-sm text-[#57534e]">Bật/tắt các chức năng của website</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Courses Toggle */}
                  <div className="flex items-center justify-between p-4 border border-[#e7e5e4] rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                        <GraduationCap size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#1c1917]">Khóa học Online</h3>
                        <p className="text-sm text-[#57534e]">Hiển thị trang khóa học và chức năng đào tạo</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tempSettings.modules?.courses ?? true}
                        onChange={(e) => setTempSettings({
                          ...tempSettings,
                          modules: { ...tempSettings.modules, courses: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b45309]"></div>
                    </label>
                  </div>

                  {/* Resources Toggle */}
                  <div className="flex items-center justify-between p-4 border border-[#e7e5e4] rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#1c1917]">Tài nguyên / Mẫu thêu</h3>
                        <p className="text-sm text-[#57534e]">Hiển thị trang tải mẫu thêu miễn phí</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tempSettings.modules?.resources ?? true}
                        onChange={(e) => setTempSettings({
                          ...tempSettings,
                          modules: { ...tempSettings.modules, resources: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b45309]"></div>
                    </label>
                  </div>

                  {/* Blog Toggle */}
                  <div className="flex items-center justify-between p-4 border border-[#e7e5e4] rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#1c1917]">Tin tức / Blog</h3>
                        <p className="text-sm text-[#57534e]">Hiển thị trang tin tức và bài viết</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tempSettings.modules?.blog ?? true}
                        onChange={(e) => setTempSettings({
                          ...tempSettings,
                          modules: { ...tempSettings.modules, blog: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b45309]"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance, Payment, Shipping - similar pattern ... */}
            {/* (Omitted for brevity, but they should also use tempSettings and onChange) */}

            {/* Popup Settings */}
            {activeTab === "popup" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4 pb-6 border-b border-[#e7e5e4]">
                  <div className="w-12 h-12 bg-[#b45309]/10 rounded-2xl flex items-center justify-center text-[#b45309]">
                    <Gift size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1c1917] text-lg tracking-tight">Popup quảng cáo</h3>
                    <p className="text-sm text-[#57534e] font-medium">Hiển thị thông báo cho khách lần đầu ghé thăm</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Enable/Disable */}
                  <div className="flex items-center justify-between p-4 bg-[#fffbf5] rounded-xl border border-[#e7e5e4]">
                    <div>
                      <h4 className="font-medium text-[#1c1917]">Bật popup</h4>
                      <p className="text-sm text-[#57534e]">Hiển thị popup cho khách hàng</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tempSettings.popup?.enabled ?? false}
                        onChange={(e) => setTempSettings({
                          ...tempSettings,
                          popup: { ...tempSettings.popup, enabled: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b45309]"></div>
                    </label>
                  </div>

                  {/* Template Selection */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-[#1c1917]">Mẫu popup</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: "promotion", label: "Khuyến mãi", icon: "🎁" },
                        { value: "text", label: "Văn bản", icon: "📝" },
                        { value: "image", label: "Ảnh", icon: "🖼️" },
                      ].map((template) => (
                        <button
                          key={template.value}
                          type="button"
                          onClick={() => setTempSettings({
                            ...tempSettings,
                            popup: { ...tempSettings.popup, template: template.value as any }
                          })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            tempSettings.popup?.template === template.value
                              ? "border-[#b45309] bg-[#b45309]/5"
                              : "border-[#e7e5e4] hover:border-[#b45309]/30"
                          }`}
                        >
                          <div className="text-2xl mb-2">{template.icon}</div>
                          <div className="text-sm font-medium text-[#1c1917]">{template.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Image Upload (only for image template) */}
                  {tempSettings.popup?.template === "image" && (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-[#1c1917]">Ảnh popup</label>
                      <div className="p-4 border-2 border-dashed border-[#e7e5e4] rounded-xl">
                        <input
                          type="text"
                          value={tempSettings.popup?.image || ""}
                          onChange={(e) => setTempSettings({
                            ...tempSettings,
                            popup: { ...tempSettings.popup, image: e.target.value }
                          })}
                          placeholder="Dán đường dẫn ảnh từ ImgBB..."
                          className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                        />
                        <p className="text-xs text-[#57534e] mt-2">Tải ảnh lên ImgBB và dán link vào đây</p>
                      </div>
                    </div>
                  )}

                  {/* Title (only for text and promotion templates) */}
                  {tempSettings.popup?.template !== "image" && (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-[#1c1917]">Tiêu đề</label>
                      <input
                        type="text"
                        value={tempSettings.popup?.title || ""}
                        onChange={(e) => setTempSettings({
                          ...tempSettings,
                          popup: { ...tempSettings.popup, title: e.target.value }
                        })}
                        placeholder="VD: ƯU ĐÃI ĐẶC BIỆT"
                        className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Content (only for text and promotion templates) */}
                  {tempSettings.popup?.template !== "image" && (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-[#1c1917]">Nội dung</label>
                      <textarea
                        value={tempSettings.popup?.content || ""}
                        onChange={(e) => setTempSettings({
                          ...tempSettings,
                          popup: { ...tempSettings.popup, content: e.target.value }
                        })}
                        placeholder="VD: Giảm 20% cho đơn hàng đầu tiên!"
                        rows={3}
                        className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none resize-none"
                      />
                    </div>
                  )}

                  {/* Button Settings */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-[#1c1917]">Text nút</label>
                      <input
                        type="text"
                        value={tempSettings.popup?.buttonText || ""}
                        onChange={(e) => setTempSettings({
                          ...tempSettings,
                          popup: { ...tempSettings.popup, buttonText: e.target.value }
                        })}
                        placeholder="VD: Mua ngay"
                        className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-[#1c1917]">Link nút</label>
                      <input
                        type="text"
                        value={tempSettings.popup?.buttonLink || ""}
                        onChange={(e) => setTempSettings({
                          ...tempSettings,
                          popup: { ...tempSettings.popup, buttonLink: e.target.value }
                        })}
                        placeholder="VD: /san-pham"
                        className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Show After */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-[#1c1917]">Hiện sau bao nhiêu giây</label>
                    <input
                      type="number"
                      value={tempSettings.popup?.showAfter || 3}
                      onChange={(e) => setTempSettings({
                        ...tempSettings,
                        popup: { ...tempSettings.popup, showAfter: parseInt(e.target.value) || 3 }
                      })}
                      min="0"
                      max="30"
                      className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                    />
                  </div>

                  {/* Show Once */}
                  <div className="flex items-center justify-between p-4 bg-[#fffbf5] rounded-xl border border-[#e7e5e4]">
                    <div>
                      <h4 className="font-medium text-[#1c1917]">Chỉ hiện 1 lần</h4>
                      <p className="text-sm text-[#57534e]">Không hiện lại cho khách đã xem</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tempSettings.popup?.showOnce ?? true}
                        onChange={(e) => setTempSettings({
                          ...tempSettings,
                          popup: { ...tempSettings.popup, showOnce: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b45309]"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

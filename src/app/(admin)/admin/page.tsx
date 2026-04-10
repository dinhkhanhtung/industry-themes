"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText, ShoppingBag, MessageSquare, TrendingUp,
  Eye, ArrowUp, ArrowDown, Clock3,
  CheckCircle2, XCircle, Plus
} from "lucide-react";

const stats = [
  { title: "Tổng bài viết", value: "156", change: "+12%", trend: "up", icon: <FileText size={20} />, color: "bg-blue-500", link: "/admin/posts" },
  { title: "Sản phẩm", value: "89", change: "+5%", trend: "up", icon: <ShoppingBag size={20} />, color: "bg-green-500", link: "/admin/products" },
  { title: "Đơn hàng mới", value: "23", change: "-2%", trend: "down", icon: <Clock3 size={20} />, color: "bg-[#b45309]", link: "/admin/orders" },
  { title: "Liên hệ chưa đọc", value: "8", change: "+3", trend: "up", icon: <MessageSquare size={20} />, color: "bg-purple-500", link: "/admin/contacts" },
];

const recentPosts = [
  { id: "1", title: "Tranh thêu hoa sen - Ý nghĩa và cách chọn", category: "Hoa sen", status: "published", views: 1250, createdAt: "2 giờ trước" },
  { id: "2", title: "Kỹ thuật thêu tay cơ bản cho người mới", category: "Hướng dẫn", status: "published", views: 890, createdAt: "5 giờ trước" },
  { id: "3", title: "Bộ sưu tập tranh phong thủy 2024", category: "Phong thủy", status: "draft", views: 0, createdAt: "1 ngày trước" },
];

const recentContacts = [
  { id: "1", name: "Nguyễn Văn A", subject: "Tư vấn tranh hoa sen", status: "new", time: "10 phút trước" },
  { id: "2", name: "Trần Thị B", subject: "Đặt hàng tranh thêu", status: "replied", time: "2 giờ trước" },
  { id: "3", name: "Lê Văn C", subject: "Hỏi về giá", status: "new", time: "5 giờ trước" },
];

const activityLog = [
  { action: "Tạo bài viết mới", target: "Tranh thêu hoa sen", user: "Admin", time: "2 giờ trước" },
  { action: "Cập nhật sản phẩm", target: "Túi xách da thật", user: "Admin", time: "5 giờ trước" },
  { action: "Trả lời liên hệ", target: "Nguyễn Văn A", user: "Admin", time: "1 ngày trước" },
  { action: "Xuất bản bài viết", target: "Kỹ thuật thêu cơ bản", user: "Admin", time: "2 ngày trước" },
];

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published": case "replied":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"><CheckCircle2 size={10} /> Đã đăng</span>;
      case "draft":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700"><Clock3 size={10} /> Bản nháp</span>;
      case "new":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Mới</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"><XCircle size={10} /> {status}</span>;
    }
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#1c1917]">Tổng quan</h1>
          <p className="text-sm text-[#57534e] mt-1">Xem thống kê và hoạt động gần đây</p>
        </div>
        <Link href="/admin/posts/new" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#b45309] rounded-lg hover:bg-[#1c1917] transition-colors">
          <Plus size={16} /> Thêm bài viết
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
            <Link href={stat.link} className="block">
              <div className="bg-white p-6 rounded-lg border border-[#e7e5e4] hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-[#57534e]">{stat.title}</p>
                    <p className="text-3xl font-medium text-[#1c1917] mt-1">{stat.value}</p>
                    <div className={`flex items-center gap-1 mt-2 text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {stat.trend === "up" ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                      <span>{stat.change}</span>
                      <span className="text-[#a8a29e]">vs tháng trước</span>
                    </div>
                  </div>
                  <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-white`}>{stat.icon}</div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-[#e7e5e4]">
            <div className="p-4 border-b border-[#e7e5e4] flex items-center justify-between">
              <h3 className="font-medium text-[#1c1917]">Bài viết gần đây</h3>
              <Link href="/admin/posts" className="text-sm text-[#b45309] hover:underline">Xem tất cả</Link>
            </div>
            <div className="divide-y divide-[#e7e5e4]">
              {recentPosts.map((post) => (
                <div key={post.id} className="p-4 flex items-center justify-between hover:bg-[#f5f5f4] transition-colors">
                  <div>
                    <p className="font-medium text-[#1c1917]">{post.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-[#57534e]">{post.category}</span>
                      <span className="text-xs text-[#a8a29e]">• {post.createdAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(post.status)}
                    <span className="text-xs text-[#57534e] flex items-center gap-1"><Eye size={12} /> {post.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-[#e7e5e4]">
            <div className="p-4 border-b border-[#e7e5e4]"><h3 className="font-medium text-[#1c1917]">Nhật ký hoạt động</h3></div>
            <div className="p-4 space-y-4">
              {activityLog.map((log, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#b45309] rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm text-[#1c1917]"><span className="font-medium">{log.action}</span><span className="text-[#57534e]">: {log.target}</span></p>
                    <p className="text-xs text-[#a8a29e] mt-0.5">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-[#e7e5e4]">
            <div className="p-4 border-b border-[#e7e5e4] flex items-center justify-between">
              <h3 className="font-medium text-[#1c1917]">Liên hệ mới</h3>
              <Link href="/admin/contacts" className="text-sm text-[#b45309] hover:underline">Xem tất cả</Link>
            </div>
            <div className="divide-y divide-[#e7e5e4]">
              {recentContacts.map((contact) => (
                <div key={contact.id} className="p-4 hover:bg-[#f5f5f4] transition-colors">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-[#1c1917]">{contact.name}</p>
                    {getStatusBadge(contact.status)}
                  </div>
                  <p className="text-sm text-[#57534e] mt-1 line-clamp-1">{contact.subject}</p>
                  <p className="text-xs text-[#a8a29e] mt-1">{contact.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-[#e7e5e4] p-4">
            <h3 className="font-medium text-[#1c1917] mb-4">Thao tác nhanh</h3>
            <div className="space-y-2">
              <Link href="/admin/posts/new" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f5f5f4] transition-colors text-sm">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center"><FileText size={16} /></div>
                <span className="text-[#1c1917]">Thêm bài viết mới</span>
              </Link>
              <Link href="/admin/products/new" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f5f5f4] transition-colors text-sm">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center"><ShoppingBag size={16} /></div>
                <span className="text-[#1c1917]">Thêm sản phẩm</span>
              </Link>
              <Link href="/admin/banners" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f5f5f4] transition-colors text-sm">
                <div className="w-8 h-8 bg-[#b45309]/10 text-[#b45309] rounded-lg flex items-center justify-center"><TrendingUp size={16} /></div>
                <span className="text-[#1c1917]">Cập nhật Banner</span>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-[#e7e5e4] p-4">
            <h3 className="font-medium text-[#1c1917] mb-4">Trạng thái hệ thống</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#57534e]">Firestore</span>
                <span className="flex items-center gap-1 text-green-600"><CheckCircle2 size={14} /> Hoạt động</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#57534e]">ImgBB</span>
                <span className="flex items-center gap-1 text-green-600"><CheckCircle2 size={14} /> Hoạt động</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#57534e]">Last Backup</span>
                <span className="text-[#57534e]">2 giờ trước</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Eye, Image as ImageIcon, Link as LinkIcon, Heading, Bold, Italic, List, ListOrdered, Quote, Code } from "lucide-react";

const ToolbarButton = ({ icon, active, onClick }: { icon: React.ReactNode; active?: boolean; onClick?: () => void }) => (
  <button onClick={onClick} className={`p-2 rounded hover:bg-[#f5f5f4] transition-colors ${active ? "bg-[#f5f5f4] text-[#b45309]" : "text-[#57534e]"}`}>{icon}</button>
);

export default function NewPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ title: "", slug: "", category: "", status: "draft", excerpt: "", content: "", seoTitle: "", seoDescription: "", tags: "" });
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("content");

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-").substring(0, 100);

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({ ...prev, title, slug: prev.slug || generateSlug(title) }));
  };

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setThumbnail(url);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    router.push("/admin/posts");
  };

  const insertText = (before: string, after: string = "") => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const newContent = text.substring(0, start) + before + selected + after + text.substring(end);
    setFormData(prev => ({ ...prev, content: newContent }));
    setTimeout(() => { textarea.focus(); textarea.setSelectionRange(start + before.length, end + before.length); }, 0);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/posts" className="p-2 text-[#57534e] hover:text-[#1c1917] hover:bg-[#f5f5f4] rounded-lg transition-colors"><ArrowLeft size={20} /></Link>
          <div><h1 className="text-2xl font-serif text-[#1c1917]">Thêm bài viết mới</h1><p className="text-sm text-[#57534e]">Tạo nội dung mới cho blog</p></div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#57534e] bg-white border border-[#e7e5e4] rounded-lg hover:bg-[#f5f5f4] transition-colors"><Eye size={16} /> Xem trước</button>
          <button onClick={handleSubmit} disabled={isLoading} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#b45309] rounded-lg hover:bg-[#1c1917] transition-colors disabled:opacity-50"><Save size={16} className={isLoading ? "animate-spin" : ""} />{isLoading ? "Đang lưu..." : "Lưu bài viết"}</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-[#e7e5e4] space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1c1917] mb-1.5">Tiêu đề <span className="text-red-500">*</span></label>
              <input type="text" value={formData.title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Nhập tiêu đề bài viết..." className="w-full px-4 py-2.5 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-lg" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1c1917] mb-1.5">Slug</label>
                <input type="text" value={formData.slug} onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))} placeholder="ten-bai-viet" className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1c1917] mb-1.5">Danh mục</label>
                <select value={formData.category} onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))} className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none bg-white">
                  <option value="">Chọn danh mục</option><option value="hoa-sen">Hoa sen</option><option value="chim-hac">Chim hạc</option><option value="phong-thuy">Phong thủy</option><option value="huong-dan">Hướng dẫn</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1c1917] mb-1.5">Tóm tắt</label>
              <textarea value={formData.excerpt} onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))} placeholder="Tóm tắt ngắn về bài viết (200 ký tự)..." rows={3} maxLength={200} className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none resize-none" />
              <p className="text-xs text-[#a8a29e] mt-1">{formData.excerpt.length}/200</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-[#e7e5e4] overflow-hidden">
            <div className="flex border-b border-[#e7e5e4]">
              <button onClick={() => setActiveTab("content")} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "content" ? "border-[#b45309] text-[#b45309]" : "border-transparent text-[#57534e] hover:text-[#1c1917]"}`}>Nội dung</button>
              <button onClick={() => setActiveTab("seo")} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "seo" ? "border-[#b45309] text-[#b45309]" : "border-transparent text-[#57534e] hover:text-[#1c1917]"}`}>SEO</button>
            </div>

            {activeTab === "content" ? (
              <div className="p-4">
                <div className="flex items-center gap-1 p-2 border border-[#e7e5e4] rounded-lg mb-4 bg-[#f5f5f4]">
                  <ToolbarButton icon={<Heading size={18} />} onClick={() => insertText("<h2>", "</h2>")} />
                  <div className="w-px h-5 bg-[#e7e5e4] mx-1" />
                  <ToolbarButton icon={<Bold size={18} />} onClick={() => insertText("<b>", "</b>")} />
                  <ToolbarButton icon={<Italic size={18} />} onClick={() => insertText("<i>", "</i>")} />
                  <div className="w-px h-5 bg-[#e7e5e4] mx-1" />
                  <ToolbarButton icon={<List size={18} />} onClick={() => insertText("<ul>\n  <li>", "</li>\n</ul>")} />
                  <ToolbarButton icon={<ListOrdered size={18} />} onClick={() => insertText("<ol>\n  <li>", "</li>\n</ol>")} />
                  <div className="w-px h-5 bg-[#e7e5e4] mx-1" />
                  <ToolbarButton icon={<LinkIcon size={18} />} onClick={() => insertText('<a href="">', "</a>")} />
                  <ToolbarButton icon={<ImageIcon size={18} />} />
                  <ToolbarButton icon={<Quote size={18} />} onClick={() => insertText("<blockquote>", "</blockquote>")} />
                  <ToolbarButton icon={<Code size={18} />} onClick={() => insertText("<code>", "</code>")} />
                </div>
                <textarea id="content" value={formData.content} onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))} placeholder="Viết nội dung bài viết tại đây..." rows={15} className="w-full px-4 py-3 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none resize-y font-mono text-sm" />
                <div className="flex items-center justify-between mt-2 text-xs text-[#a8a29e]"><span>Hỗ trợ HTML cơ bản</span><span>{formData.content.length} ký tự</span></div>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                <div><label className="block text-sm font-medium text-[#1c1917] mb-1.5">SEO Title</label><input type="text" value={formData.seoTitle} onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))} placeholder="Tiêu đề hiển thị trên Google (60 ký tự)" className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none" /></div>
                <div><label className="block text-sm font-medium text-[#1c1917] mb-1.5">SEO Description</label><textarea value={formData.seoDescription} onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))} placeholder="Mô tả hiển thị trên Google (160 ký tự)" rows={3} className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none resize-none" /></div>
                <div><label className="block text-sm font-medium text-[#1c1917] mb-1.5">Tags</label><input type="text" value={formData.tags} onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))} placeholder="tranh thêu, hoa sen, nghệ thuật (phân cách bằng dấu phẩy)" className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none" /></div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-[#e7e5e4] space-y-4">
            <h3 className="font-medium text-[#1c1917]">Xuất bản</h3>
            <div>
              <label className="block text-sm font-medium text-[#1c1917] mb-1.5">Trạng thái</label>
              <select value={formData.status} onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))} className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none bg-white">
                <option value="draft">Bản nháp</option><option value="published">Xuất bản ngay</option><option value="scheduled">Lên lịch</option>
              </select>
            </div>
            {formData.status === "scheduled" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <label className="block text-sm font-medium text-[#1c1917] mb-1.5">Ngày xuất bản</label>
                <input type="datetime-local" className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none" />
              </motion.div>
            )}
            <div className="pt-4 border-t border-[#e7e5e4] flex gap-3">
              <button type="button" className="flex-1 px-4 py-2 text-sm font-medium text-[#57534e] bg-[#f5f5f4] rounded-lg hover:bg-[#e7e5e4] transition-colors">Lưu nháp</button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#e7e5e4] space-y-4">
            <h3 className="font-medium text-[#1c1917]">Ảnh đại diện</h3>
            {thumbnail ? (
              <div className="relative aspect-video bg-[#f5f5f4] rounded-lg overflow-hidden">
                <img src={thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                <button onClick={() => setThumbnail(null)} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center aspect-video bg-[#f5f5f4] border-2 border-dashed border-[#e7e5e4] rounded-lg cursor-pointer hover:border-[#b45309] transition-colors">
                <ImageIcon className="w-8 h-8 text-[#a8a29e] mb-2" />
                <span className="text-sm text-[#57534e]">Click để upload</span>
                <span className="text-xs text-[#a8a29e]">PNG, JPG tối đa 5MB</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            )}
          </div>

          <div className="bg-[#f5f5f4] p-4 rounded-lg">
            <h4 className="font-medium text-[#1c1917] text-sm mb-2">Mẹo viết bài</h4>
            <ul className="text-xs text-[#57534e] space-y-1 list-disc list-inside">
              <li>Tiêu đề nên 50-60 ký tự</li><li>Thêm ảnh để tăng tương tác</li><li>Sử dụng heading H2-H4</li><li>Tóm tắt nên 150-200 ký tự</li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}

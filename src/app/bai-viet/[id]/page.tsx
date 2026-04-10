import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Share2, Facebook, Twitter, Linkedin } from "lucide-react";

interface BlogPostPageProps {
  params: { id: string };
}

const blogPosts = [
  {
    id: "1",
    title: "Nghệ Thuật Thêu Tay Truyền Thống Việt Nam",
    content: `
      <p>Nghệ thuật thêu tay Việt Nam là một di sản văn hóa quý báu được truyền lại qua nhiều thế hệ. Từ những đường kim mũi chỉ đơn giản, các nghệ nhân đã tạo nên những tác phẩm nghệ thuật tinh xảo, mang đậm bản sắc dân tộc.</p>
      
      <h3>Lịch sử phát triển</h3>
      <p>Nghề thêu tay ở Việt Nam có lịch sử lâu đời, xuất hiện từ thời các triều đại phong kiến. Ban đầu, thêu tay chỉ dành cho tầng lớp quý tộc, hoàng gia. Dần dần, nghệ thuật này được phổ biến rộng rãi trong dân gian và trở thành một phần không thể thiếu trong đời sống văn hóa của người Việt.</p>
      
      <h3>Kỹ thuật thêu tay</h3>
      <p>Kỹ thuật thêu tay đòi hỏi sự kiên nhẫn, tỉ mỉ và khéo léo. Mỗi nghệ nhân phải trải qua nhiều năm rèn luyện mới có thể thành thạo các đường kim mũi chỉ. Các kỹ thuật chính bao gồm: thêu trơn, thêu điểm, thêu chéo, thêu xoắn...</p>
      
      <h3>Ý nghĩa văn hóa</h3>
      <p>Mỗi tác phẩm thêu tay không chỉ là một sản phẩm thẩm mỹ mà còn mang theo những thông điệp, ước nguyện của người tạo ra nó. Các họa tiết hoa sen, chim hạc, tùng cúc trúc mai đều mang những ý nghĩa sâu sắc về đạo đức, triết lý sống.</p>
    `,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1200&q=80",
    category: "Văn Hóa Truyền Thống",
    date: "15 Tháng 3, 2024",
    readTime: "5 phút đọc",
    author: {
      name: "Nguyễn Thị Hoa",
      role: "Nghệ nhân thêu tay",
      avatar: "H",
    },
  },
  {
    id: "2",
    title: "Câu Chuyện Sản Phẩm: Tranh Thêu Hoa Sen",
    content: `
      <p>Hoa sen - biểu tượng của sự tinh khiết, thanh cao trong văn hóa Phật giáo và Á Đông. Tác phẩm thêu hoa sen của Hoa Thượng là kết tinh của hàng tháng trời kiên nhẫn, tỉ mỉ.</p>
      
      <h3>Quá trình sáng tác</h3>
      <p>Để tạo nên một tác phẩm thêu hoa sen hoàn chỉnh, nghệ nhân phải trải qua nhiều công đoạn: chọn vải, phác thảo, chọn chỉ, thêu từng chi tiết. Mỗi cánh sen được thêu bằng nhiều lớp chỉ khác nhau để tạo độ sâu và chân thực.</p>
      
      <h3>Chất liệu đặc biệt</h3>
      <p>Chúng tôi sử dụng vải lụa tự nhiên cao cấp và chỉ thêu cotton nhập khẩu từ Nhật Bản. Sự kết hợp này giúp tác phẩm có độ bền cao và màu sắc tươi sáng qua nhiều năm.</p>
    `,
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80",
    category: "Câu Chuyện Sản Phẩm",
    date: "10 Tháng 3, 2024",
    readTime: "4 phút đọc",
    author: {
      name: "Trần Văn Minh",
      role: "Giám đốc sáng tạo",
      avatar: "M",
    },
  },
];

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find(p => p.id === params.id);
  return {
    title: post ? `${post.title} - Tranh Thêu Tay Hoa Thượng` : "Bài Viết",
    description: post?.content?.slice(0, 150) || "Chi tiết bài viết",
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.id === params.id) || blogPosts[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-[#e7e5e4]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-[#57534e] hover:text-[#b45309]">Trang chủ</Link>
            <ChevronRight size={16} className="text-[#57534e]" />
            <Link href="/bai-viet" className="text-[#57534e] hover:text-[#b45309]">Bài viết</Link>
            <ChevronRight size={16} className="text-[#57534e]" />
            <span className="text-[#1c1917] truncate max-w-xs">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="text-center">
          <span className="text-[#b45309] text-sm font-medium">{post.category}</span>
          <h1 className="text-3xl md:text-4xl font-serif text-[#1c1917] mt-3 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-[#57534e]">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8 pb-16">
        {/* Author */}
        <div className="flex items-center gap-4 py-6 border-y border-[#e7e5e4] mb-8">
          <div className="w-12 h-12 bg-[#b45309] flex items-center justify-center text-white font-medium">
            {post.author.avatar}
          </div>
          <div>
            <p className="font-medium text-[#1c1917]">{post.author.name}</p>
            <p className="text-sm text-[#57534e]">{post.author.role}</p>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="p-2 text-[#57534e] hover:text-[#b45309] transition-colors">
              <Share2 size={18} />
            </button>
            <button className="p-2 text-[#57534e] hover:text-blue-600 transition-colors">
              <Facebook size={18} />
            </button>
            <button className="p-2 text-[#57534e] hover:text-sky-500 transition-colors">
              <Twitter size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <article 
          className="prose prose-lg max-w-none prose-headings:text-[#1c1917] prose-headings:font-serif prose-p:text-[#57534e] prose-p:leading-relaxed prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-[#e7e5e4]">
          <span className="text-sm text-[#57534e]">Tags:</span>
          {["Thêu tay", "Nghệ thuật", "Văn hóa", "Truyền thống"].map((tag) => (
            <span key={tag} className="px-3 py-1 bg-[#f5f5f4] text-sm text-[#57534e]">
              {tag}
            </span>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-[#e7e5e4]">
          <Link 
            href="/bai-viet" 
            className="text-[#57534e] hover:text-[#b45309] transition-colors flex items-center gap-2"
          >
            <ChevronRight size={16} className="rotate-180" />
            Bài viết trước
          </Link>
          <Link 
            href="/bai-viet" 
            className="text-[#57534e] hover:text-[#b45309] transition-colors flex items-center gap-2"
          >
            Bài viết tiếp theo
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

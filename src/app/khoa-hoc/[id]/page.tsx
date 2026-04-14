"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Play, Clock, Users, BookOpen, Star, ChevronRight,
  Heart, Share2, CheckCircle, Lock, Unlock
} from "lucide-react";
import { Toast, useToast } from "@/components/ui/Toast";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  isPreview: boolean;
  isLocked: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: {
    name: string;
    avatar: string;
    bio: string;
  };
  level: "beginner" | "intermediate" | "advanced";
  price: number;
  originalPrice?: number;
  totalLessons: number;
  totalDuration: string;
  totalStudents: number;
  rating: number;
  reviews: number;
  lessons: Lesson[];
  isEnrolled: boolean;
  progress?: number;
}

// Mock data
const mockCourse: Course = {
  id: "1",
  title: "Thêu Cơ Bản: Hoa Cúc Truyền Thống",
  description: "Khóa học dành cho người mới bắt đầu, hướng dẫn từ A-Z kỹ thuật thêu tay cơ bản qua tác phẩm hoa cúc truyền thống. Sau khóa học, bạn sẽ tự tin thêu được những bông hoa cúc tuyệt đẹp.",
  thumbnail: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
  instructor: {
    name: "Cô Hằng Khoa",
    avatar: "https://ui-avatars.com/api/?name=Hang+Khoa&background=b45309&color=fff",
    bio: "Nghệ nhân thêu tay với hơn 20 năm kinh nghiệm, đã đào tạo hàng nghìn học viên trong và ngoài nước.",
  },
  level: "beginner",
  price: 0,
  totalLessons: 12,
  totalDuration: "6h 30m",
  totalStudents: 2340,
  rating: 4.8,
  reviews: 156,
  lessons: [
    { id: "1", title: "Giới thiệu khóa học", duration: "05:30", isPreview: true, isLocked: false },
    { id: "2", title: "Chuẩn bị nguyên liệu", duration: "08:15", isPreview: false, isLocked: true },
    { id: "3", title: "Kỹ thuật đường kim cơ bản", duration: "12:45", isPreview: false, isLocked: true },
    { id: "4", title: "Thêu cánh hoa ngoài", duration: "15:20", isPreview: false, isLocked: true },
    { id: "5", title: "Thêu cánh hoa trong", duration: "14:30", isPreview: false, isLocked: true },
    { id: "6", title: "Tạo độ cong cho cánh hoa", duration: "18:00", isPreview: false, isLocked: true },
    { id: "7", title: "Thêu nhụy hoa", duration: "10:15", isPreview: false, isLocked: true },
    { id: "8", title: "Thêu đài hoa", duration: "12:00", isPreview: false, isLocked: true },
    { id: "9", title: "Thêu cuống và lá", duration: "16:30", isPreview: false, isLocked: true },
    { id: "10", title: "Tạo đường viền lá", duration: "14:45", isPreview: false, isLocked: true },
    { id: "11", title: "Hoàn thiện tác phẩm", duration: "20:00", isPreview: false, isLocked: true },
    { id: "12", title: "Bảo quản và trưng bày", duration: "08:30", isPreview: false, isLocked: true },
  ],
  isEnrolled: false,
};

const levelLabels = {
  beginner: { label: "Cơ bản", color: "bg-green-100 text-green-700" },
  intermediate: { label: "Trung cấp", color: "bg-yellow-100 text-yellow-700" },
  advanced: { label: "Nâng cao", color: "bg-red-100 text-red-700" },
};

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const sessionData = useSession();
  const session = sessionData?.data;
  const { toast, showToast, hideToast } = useToast();
  const [course, setCourse] = useState<Course>(mockCourse);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"content" | "reviews">("content");

  const handleEnroll = () => {
    if (!session) {
      showToast("Vui lòng đăng nhập để đăng ký khóa học", "warning");
      setTimeout(() => {
        router.push("/dang-nhap");
      }, 1500);
      return;
    }

    // Mock enrollment
    setCourse({ ...course, isEnrolled: true, progress: 0 });
    showToast("Đăng ký khóa học thành công!", "success");
  };

  const handleWishlist = () => {
    if (!session) {
      showToast("Vui lòng đăng nhập để thêm vào yêu thích", "warning");
      setTimeout(() => {
        router.push("/dang-nhap");
      }, 1500);
      return;
    }

    setIsWishlisted(!isWishlisted);
    showToast(
      isWishlisted ? "Đã xóa khỏi danh sách yêu thích" : "Đã thêm vào danh sách yêu thích",
      "success"
    );
  };

  return (
    <div className="min-h-screen bg-[#fffbf5] pt-[140px] lg:pt-[160px]">
      <Toast toast={toast} onClose={hideToast} />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e7e5e4]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-[#57534e]">
            <Link href="/" className="hover:text-[#b45309]">Trang chủ</Link>
            <ChevronRight size={14} />
            <Link href="/khoa-hoc" className="hover:text-[#b45309]">Khóa học</Link>
            <ChevronRight size={14} />
            <span className="text-[#1c1917]">{course.title}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <div className="bg-white rounded-lg border border-[#e7e5e4] overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Play size={32} className="text-[#b45309] ml-1" />
                  </button>
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-sm font-medium rounded ${levelLabels[course.level].color}`}>
                    {levelLabels[course.level].label}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-[#57534e]">({course.reviews} đánh giá)</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-[#57534e]">
                    <Users size={16} />
                    <span>{course.totalStudents.toLocaleString()} học viên</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-[#57534e]">
                    <Clock size={16} />
                    <span>{course.totalDuration}</span>
                  </div>
                </div>
                
                <h1 className="text-2xl font-serif text-[#1c1917] mb-3">{course.title}</h1>
                <p className="text-[#57534e] leading-relaxed">{course.description}</p>
              </div>
            </div>

            {/* Instructor */}
            <div className="bg-white rounded-lg border border-[#e7e5e4] p-6">
              <h3 className="font-medium text-[#1c1917] mb-4">Giảng viên</h3>
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-[#1c1917]">{course.instructor.name}</h4>
                  <p className="text-sm text-[#57534e] mt-1">{course.instructor.bio}</p>
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="bg-white rounded-lg border border-[#e7e5e4]">
              <div className="flex border-b border-[#e7e5e4]">
                <button
                  onClick={() => setActiveTab("content")}
                  className={`flex-1 py-4 text-sm font-medium transition-colors ${
                    activeTab === "content"
                      ? "text-[#b45309] border-b-2 border-[#b45309]"
                      : "text-[#57534e] hover:text-[#1c1917]"
                  }`}
                >
                  Nội dung khóa học ({course.totalLessons} bài)
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`flex-1 py-4 text-sm font-medium transition-colors ${
                    activeTab === "reviews"
                      ? "text-[#b45309] border-b-2 border-[#b45309]"
                      : "text-[#57534e] hover:text-[#1c1917]"
                  }`}
                >
                  Đánh giá ({course.reviews})
                </button>
              </div>

              <div className="p-6">
                {activeTab === "content" && (
                  <div className="space-y-3">
                    {course.lessons.map((lesson, index) => (
                      <div
                        key={lesson.id}
                        className={`flex items-center gap-4 p-4 rounded-lg ${
                          lesson.isLocked ? "bg-[#f5f5f4]" : "bg-white border border-[#e7e5e4]"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-[#b45309] text-white flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${lesson.isLocked ? "text-[#57534e]" : "text-[#1c1917]"}`}>
                            {lesson.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-[#57534e] mt-1">
                            <span className="flex items-center gap-1">
                              <Play size={12} />
                              {lesson.duration}
                            </span>
                            {lesson.isPreview && (
                              <span className="text-[#b45309] font-medium">Xem trước</span>
                            )}
                          </div>
                        </div>
                        <div>
                          {lesson.isLocked ? (
                            <Lock size={18} className="text-[#57534e]" />
                          ) : (
                            <Play size={18} className="text-[#b45309]" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="text-center py-8 text-[#57534e]">
                    Chưa có đánh giá nào. Hãy đăng ký khóa học để đánh giá!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-[100px] space-y-4">
              {/* Enrollment Card */}
              <div className="bg-white rounded-lg border border-[#e7e5e4] p-6">
                {course.isEnrolled ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-green-600" />
                    </div>
                    <h3 className="font-medium text-[#1c1917] mb-2">Đã đăng ký</h3>
                    {course.progress !== undefined && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-[#57534e]">Tiến độ</span>
                          <span className="font-medium text-[#b45309]">{course.progress}%</span>
                        </div>
                        <div className="h-2 bg-[#e7e5e4] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#b45309] rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    <button className="w-full py-3 bg-[#b45309] text-white rounded-lg font-medium hover:bg-[#92400e] transition-colors">
                      Tiếp tục học
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-6">
                      {course.price === 0 ? (
                        <div>
                          <span className="text-3xl font-bold text-[#b45309]">Miễn phí</span>
                        </div>
                      ) : (
                        <div>
                          {course.originalPrice && (
                            <span className="text-lg text-[#57534e] line-through mr-2">
                              {(course.originalPrice / 1000).toFixed(0)}K
                            </span>
                          )}
                          <span className="text-3xl font-bold text-[#b45309]">
                            {(course.price / 1000).toFixed(0)}K
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleEnroll}
                      className="w-full py-3 bg-[#b45309] text-white rounded-lg font-medium hover:bg-[#92400e] transition-colors mb-3"
                    >
                      {course.price === 0 ? "Đăng ký ngay" : "Mua khóa học"}
                    </button>

                    <div className="text-center text-xs text-[#57534e] space-y-1">
                      <p>• Truy cập trọn đời</p>
                      <p>• Cấp chứng chỉ hoàn thành</p>
                      <p>• Hỗ trợ 24/7</p>
                    </div>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleWishlist}
                  className={`flex-1 py-3 border rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    isWishlisted
                      ? "border-red-200 text-red-500 bg-red-50"
                      : "border-[#e7e5e4] text-[#1c1917] hover:bg-[#f5f5f4]"
                  }`}
                >
                  <Heart size={18} className={isWishlisted ? "fill-current" : ""} />
                  {isWishlisted ? "Đã thích" : "Yêu thích"}
                </button>
                <button className="flex-1 py-3 border border-[#e7e5e4] rounded-lg font-medium text-[#1c1917] hover:bg-[#f5f5f4] transition-colors flex items-center justify-center gap-2">
                  <Share2 size={18} />
                  Chia sẻ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

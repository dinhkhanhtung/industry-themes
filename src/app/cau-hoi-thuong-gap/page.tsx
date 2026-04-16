import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Câu Hỏi Thường Gặp | Nghệ Nhân",
  description: "Câu hỏi thường gặp về tranh thêu tay, khóa học, phụ kiện thêu tại Nghệ Nhân",
};

export default function CauHoiThuongGap() {
  return (
    <div className="min-h-screen bg-[#fffbf5] py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-serif text-[var(--color-dark)] mb-8 text-center">
            Câu Hỏi Thường Gặp
          </h1>

          <div className="bg-white p-8 rounded-sm shadow-sm space-y-6">
            <section className="border-b border-gray-100 pb-6">
              <h2 className="text-xl font-medium text-[var(--color-dark)] mb-3">
                Sản phẩm thêu tay có bền không?
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed">
                Có. Sản phẩm được thêu thủ công bằng chỉ chất lượng cao, có thể giữ màu sắc và độ bền hàng chục năm nếu bảo quản đúng cách.
              </p>
            </section>

            <section className="border-b border-gray-100 pb-6">
              <h2 className="text-xl font-medium text-[var(--color-dark)] mb-3">
                Có thể đặt làm tranh theo yêu cầu không?
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed">
                Có. Chúng tôi nhận đặt làm tranh theo kích thước và mẫu mã yêu cầu. Thời gian hoàn thành từ 2-4 tuần tùy độ phức tạp.
              </p>
            </section>

            <section className="border-b border-gray-100 pb-6">
              <h2 className="text-xl font-medium text-[var(--color-dark)] mb-3">
                Khóa học thêu dành cho ai?
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed">
                Khóa học dành cho mọi trình độ, từ người mới bắt đầu đến người đã có kinh nghiệm. Có khóa học online và offline.
              </p>
            </section>

            <section className="border-b border-gray-100 pb-6">
              <h2 className="text-xl font-medium text-[var(--color-dark)] mb-3">
                Phụ kiện thêu có bán lẻ không?
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed">
                Có. Chúng tôi bán lẻ kim, chỉ, khung tranh và các phụ kiện thêu khác. Có thể mua trực tiếp hoặc đặt online.
              </p>
            </section>

            <section className="border-b border-gray-100 pb-6">
              <h2 className="text-xl font-medium text-[var(--color-dark)] mb-3">
                Có bảo hành sản phẩm không?
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed">
                Có. Sản phẩm được bảo hành 1 năm về lỗi kỹ thuật thêu. Không bảo hành về hư hỏng do người sử dụng.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-[var(--color-dark)] mb-3">
                Cách bảo quản tranh thêu?
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed">
                Tránh ánh nắng trực tiếp, độ ẩm cao. Thường xuyên lau bụi nhẹ nhàng. Không dùng hóa chất tẩy rửa mạnh.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

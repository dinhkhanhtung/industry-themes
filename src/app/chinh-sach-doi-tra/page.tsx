import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính Sách Đổi Trả | Nghệ Nhân",
  description: "Chính sách đổi trả hàng tại Nghệ Nhân - bảo vệ quyền lợi khách hàng",
};

export default function ChinhSachDoiTra() {
  return (
    <div className="min-h-screen bg-[#fffbf5] py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-serif text-[var(--color-dark)] mb-8 text-center">
            Chính Sách Đổi Trả
          </h1>

          <div className="bg-white p-8 rounded-sm shadow-sm space-y-8">
            <section>
              <h2 className="text-2xl font-serif text-[var(--color-primary)] mb-4">
                Điều Kiện Đổi Trả
              </h2>
              <ul className="text-[var(--color-muted)] leading-relaxed space-y-2 list-disc list-inside">
                <li>Sản phẩm chưa qua sử dụng, còn nguyên tem mác</li>
                <li>Trong vòng 7 ngày kể từ ngày nhận hàng</li>
                <li>Đầy đủ hóa đơn và chứng từ mua hàng</li>
                <li>Sản phẩm không bị lỗi do người dùng</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-[var(--color-primary)] mb-4">
                Sản Phẩm Không Đổi Trả
              </h2>
              <ul className="text-[var(--color-muted)] leading-relaxed space-y-2 list-disc list-inside">
                <li>Sản phẩm đã qua sử dụng</li>
                <li>Sản phẩm theo yêu cầu đặc biệt (may theo size riêng)</li>
                <li>Sản phẩm khuyến mãi, giảm giá</li>
                <li>Sản phẩm dễ hỏng (thực phẩm, hóa mỹ phẩm)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-[var(--color-primary)] mb-4">
                Quy Trình Đổi Trả
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed">
                Liên hệ hotline hoặc email để yêu cầu đổi trả. Gửi sản phẩm về địa chỉ chỉ định. 
                Sau khi kiểm tra, chúng tôi sẽ hoàn tiền hoặc đổi sản phẩm mới trong vòng 5-7 ngày làm việc.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

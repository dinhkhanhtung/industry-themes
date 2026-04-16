import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vận Chuyển & Giao Hàng | Nghệ Nhân",
  description: "Chính sách vận chuyển và giao hàng tại Nghệ Nhân",
};

export default function VanChuyen() {
  return (
    <div className="min-h-screen bg-[#fffbf5] py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-serif text-[var(--color-dark)] mb-8 text-center">
            Vận Chuyển & Giao Hàng
          </h1>

          <div className="bg-white p-8 rounded-sm shadow-sm space-y-8">
            <section>
              <h2 className="text-2xl font-serif text-[var(--color-primary)] mb-4">
                Phạm Vị Giao Hàng
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed">
                Chúng tôi giao hàng toàn quốc, bao gồm cả các vùng sâu vùng xa. 
                Đối với đơn hàng quốc tế, vui lòng liên hệ trực tiếp để biết chi tiết.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-[var(--color-primary)] mb-4">
                Thời Gian Giao Hàng
              </h2>
              <ul className="text-[var(--color-muted)] leading-relaxed space-y-2 list-disc list-inside">
                <li>Nội thành Hà Nội, TP.HCM: 1-2 ngày</li>
                <li>Các tỉnh thành khác: 2-5 ngày</li>
                <li>Vùng sâu vùng xa: 5-7 ngày</li>
                <li>Sản phẩm đặt làm riêng: 7-14 ngày</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-[var(--color-primary)] mb-4">
                Phí Vận Chuyển
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed">
                Miễn phí vận chuyển cho đơn hàng từ 2.000.000đ trở lên. 
                Đơn hàng dưới 2.000.000đ: phí vận chuyển 30.000đ - 50.000đ tùy khu vực.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-[var(--color-primary)] mb-4">
                Đóng Gói
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed">
                Sản phẩm được đóng gói cẩn thận với lớp bảo vệ đặc biệt để tránh hư hỏng trong quá trình vận chuyển.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

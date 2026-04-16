import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hướng Dẫn Mua Hàng | Nghệ Nhân",
  description: "Hướng dẫn mua hàng chi tiết tại Nghệ Nhân - từ chọn sản phẩm đến thanh toán",
};

export default function HuongDanMuaHang() {
  return (
    <div className="min-h-screen bg-[#fffbf5] py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-serif text-[var(--color-dark)] mb-8 text-center">
            Hướng Dẫn Mua Hàng
          </h1>

          <div className="bg-white p-8 rounded-sm shadow-sm space-y-8">
            <section>
              <h2 className="text-2xl font-serif text-[var(--color-primary)] mb-4">
                1. Chọn Sản Phẩm
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed">
                Duyệt qua danh mục tranh thêu, phụ kiện thêu hoặc khóa học. Sử dụng bộ lọc để tìm sản phẩm theo danh mục, giá hoặc màu sắc.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-[var(--color-primary)] mb-4">
                2. Thêm Vào Giỏ Hàng
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed">
                Chọn màu sắc và kích thước (nếu có), sau đó nhấn "Thêm vào giỏ". Bạn có thể tiếp tục mua sắm hoặc tiến hành thanh toán.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-[var(--color-primary)] mb-4">
                3. Thanh Toán
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed">
                Điền thông tin giao hàng, chọn phương thức thanh toán (COD, chuyển khoản, thẻ tín dụng). Xem lại đơn hàng trước khi xác nhận.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-[var(--color-primary)] mb-4">
                4. Nhận Xác Nhận
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed">
                Sau khi đặt hàng, bạn sẽ nhận được email xác nhận. Chúng tôi sẽ liên hệ để xác nhận đơn hàng trong vòng 24h.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

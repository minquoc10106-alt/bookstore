import React, { useState } from 'react';
import { X, ShieldCheck, RefreshCw, Truck, Lock, FileText } from 'lucide-react';

export const PolicyModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('return'); // return, shipping, privacy

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-100 relative max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Chính Sách &amp; Điều Khoản</h3>
            <p className="text-xs text-slate-500">
              Cam kết quyền lợi và trải nghiệm an toàn tuyệt đối cho người mua
            </p>
          </div>
        </div>

        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 mb-6 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('return')}
            className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'return'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <RefreshCw className="w-4 h-4" /> Chính Sách Đổi Trả
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'shipping'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Truck className="w-4 h-4" /> Giao Hàng &amp; Kiểm Hàng
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'privacy'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lock className="w-4 h-4" /> Bảo Mật Thông Tin
          </button>
        </div>

        {/* Tab Contents */}
        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          {activeTab === 'return' && (
            <div className="space-y-3 animate-fade-in">
              <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl font-medium">
                ✅ Cam kết 1 đổi 1 miễn phí trong vòng <strong>7 ngày</strong> kể từ khi nhận hàng.
              </div>
              <h5 className="font-bold text-slate-800 text-sm">Điều kiện đổi trả:</h5>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Sách bị rách, gãy gáy, mất trang hoặc lỗi in ấn từ phía nhà xuất bản.</li>
                <li>Giao nhầm tên sách, sai số lượng so với đơn hàng đã đặt.</li>
                <li>Sách còn nguyên vẹn, chưa qua sử dụng hoặc đánh dấu.</li>
              </ul>
              <h5 className="font-bold text-slate-800 text-sm">Quy trình xử lý:</h5>
              <p>Quý khách chỉ cần gọi hotline <strong>1900 8888</strong> hoặc nhắn tin qua trang Liên Hệ, nhân viên hỗ trợ sẽ tới tận nhà thu hồi và giao sách mới.</p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-3 animate-fade-in">
              <div className="p-3 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl font-medium">
                🚀 Miễn phí giao hàng cho tất cả các đơn hàng trên <strong>200.000 VNĐ</strong> toàn quốc.
              </div>
              <h5 className="font-bold text-slate-800 text-sm">Thời gian giao hàng:</h5>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li><strong>TP.Đà Nẵng:</strong> Giao siêu tốc trong 24 giờ.</li>
                <li><strong>Các Tỉnh/Thành phố khác:</strong> Từ 2 - 4 ngày làm việc.</li>
              </ul>
              <h5 className="font-bold text-slate-800 text-sm">Quyền kiểm hàng (Đồng kiểm):</h5>
              <p>Quý khách hoàn toàn được quyền mở bưu phẩm kiểm tra sách trước khi thanh toán cho nhân viên giao hàng.</p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-3 animate-fade-in">
              <div className="p-3 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl font-medium">
                🔒 Thông tin cá nhân của bạn được bảo mật tuyệt đối mã hóa qua Supabase Database.
              </div>
              <h5 className="font-bold text-slate-800 text-sm">Mục đích thu thập dữ liệu:</h5>
              <p>Chúng tôi chỉ sử dụng Email, Số điện thoại và Địa chỉ của bạn cho mục đích xác nhận đơn hàng, giao hàng và gửi mã ưu đãi nếu có.</p>
              <h5 className="font-bold text-slate-800 text-sm">Cam kết bảo mật:</h5>
              <p>Không bao giờ chia sẻ, bán hay tiết lộ thông tin khách hàng cho bên thứ ba vì bất kỳ mục đích thương mại nào.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

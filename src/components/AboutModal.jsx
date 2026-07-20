import React from 'react';
import { X, BookOpen, Sparkles, Award, ShieldCheck, HeartHandshake, Users } from 'lucide-react';

export const AboutModal = ({ isOpen, onClose }) => {
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
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Về BookVerse</h3>
            <p className="text-xs text-slate-500">
              Nhà sách trực tuyến thế hệ mới • Kiến tạo văn hóa đọc hiện đại
            </p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl">
            <h4 className="font-extrabold text-indigo-950 text-base mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" /> Sứ Mệnh Của Chúng Tôi
            </h4>
            <p className="text-xs text-indigo-900/90 leading-relaxed">
              BookVerse được thành lập với mục tiêu mang những tri thức tinh hoa nhất thế giới về Lập trình, Công nghệ, Kinh tế và Kỹ năng sống tới độc giả Việt Nam. Chúng tôi cam kết 100% sách chính hãng, giao hàng siêu tốc và trải nghiệm mua sắm trực tuyến vượt trội trên mọi thiết bị.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 border border-slate-200/80 rounded-2xl bg-slate-50 text-center space-y-2">
              <Award className="w-8 h-8 text-indigo-600 mx-auto" />
              <h5 className="font-bold text-slate-900 text-xs">Sách Chính Hãng</h5>
              <p className="text-[11px] text-slate-500">Cam kết nhập trực tiếp từ các NXB uy tín hàng đầu.</p>
            </div>

            <div className="p-4 border border-slate-200/80 rounded-2xl bg-slate-50 text-center space-y-2">
              <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto" />
              <h5 className="font-bold text-slate-900 text-xs">Đổi Trả Dễ Dàng</h5>
              <p className="text-[11px] text-slate-500">Hỗ trợ 1 đổi 1 trong 7 ngày nếu sách lỗi từ nhà sản xuất.</p>
            </div>

            <div className="p-4 border border-slate-200/80 rounded-2xl bg-slate-50 text-center space-y-2">
              <HeartHandshake className="w-8 h-8 text-rose-500 mx-auto" />
              <h5 className="font-bold text-slate-900 text-xs">Tận Tâm Phục Vụ</h5>
              <p className="text-[11px] text-slate-500">Đội ngũ hỗ trợ 24/7 luôn sẵn sàng tư vấn bạn.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4 text-indigo-500" /> Hơn 50.000+ độc giả tin dùng
            </span>
            <span className="font-semibold text-indigo-600">BookVerse Team</span>
          </div>
        </div>
      </div>
    </div>
  );
};

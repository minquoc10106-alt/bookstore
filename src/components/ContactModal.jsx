import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';

export const ContactModal = ({ isOpen, onClose, onShowToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      onShowToast('Cảm ơn bạn! Tin nhắn phản hồi đã được gửi tới BookVerse.', 'success');
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
            <MessageSquare className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Liên Hệ Với Chúng Tôi</h3>
            <p className="text-xs text-slate-500">
              Giải đáp mọi thắc mắc của bạn 24/7
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Info Card */}
          <div className="md:col-span-5 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-5 space-y-4 shadow-lg flex flex-col justify-between">
            <div>
              <h4 className="font-extrabold text-sm text-indigo-200 mb-3">BookVerse Store</h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>123 Xô Viết Nghệ Tĩnh</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Hotline: 1900 8888</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>hotro@bookverse.vn</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>8:00 - 21:00 (Tất cả các ngày)</span>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-indigo-800/60 text-[11px] text-slate-400">
              Phản hồi siêu tốc trong vòng 15 phút.
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="md:col-span-7 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Họ và Tên
              </label>
              <input
                type="text"
                required
                placeholder="Nguyễn Văn A"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Email Liên Hệ
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Nội Dung Tin Nhắn
              </label>
              <textarea
                required
                rows={3}
                placeholder="Cần hỗ trợ về đơn hàng, góp ý sách..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/25 transition-all text-xs flex items-center justify-center gap-2"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Gửi Tin Nhắn
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

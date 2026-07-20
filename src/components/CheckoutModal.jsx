import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, CheckCircle2, ShieldCheck, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/orderService';

export const CheckoutModal = ({ isOpen, onClose, onShowToast, onOrderSuccess }) => {
  const { cart, totalAmount, clearCart } = useCart();
  const { user, profile } = useAuth();

  const [shippingAddress, setShippingAddress] = useState(profile?.address || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [guestEmail, setGuestEmail] = useState(user?.email || '');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!shippingAddress.trim() || !phone.trim()) {
      alert('Vui lòng điền đầy đủ địa chỉ giao hàng và số điện thoại.');
      return;
    }

    setSubmitting(true);

    const { error } = await createOrder({
      userId: user?.id || null,
      guestEmail: user?.email || guestEmail,
      shippingAddress,
      phone,
      cartItems: cart,
      totalAmount
    });

    setSubmitting(false);

    if (error) {
      onShowToast('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại!', 'error');
    } else {
      clearCart();
      onShowToast('Tạo đơn hàng mới thành công! Cảm ơn bạn.', 'success');
      onClose();
      if (onOrderSuccess) onOrderSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Xác Nhận Đặt Hàng</h3>
            <p className="text-xs text-slate-500">
              Đơn hàng sẽ được ghi trực tiếp vào bảng <code className="font-mono text-indigo-600">orders</code> &amp; <code className="font-mono text-indigo-600">order_items</code>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Email Nhận Thông Tin
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                disabled={Boolean(user?.email)}
                placeholder="user@example.com"
                value={user?.email || guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all disabled:opacity-75"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Số Điện Thoại Nhận Hàng *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="tel"
                required
                placeholder="0912 345 678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Địa Chỉ Giao Hàng Chi Tiết *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <textarea
                required
                rows={2}
                placeholder="Số nhà, tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Phương Thức Thanh Toán
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label 
                className={`p-3 border rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'cod' 
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold' 
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="hidden"
                />
                <CreditCard className="w-4 h-4 text-indigo-600" />
                <span className="text-xs">Thanh toán COD khi nhận hàng</span>
              </label>

              <label 
                className={`p-3 border rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'qr' 
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold' 
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="qr"
                  checked={paymentMethod === 'qr'}
                  onChange={() => setPaymentMethod('qr')}
                  className="hidden"
                />
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span className="text-xs">Chuyển khoản QR Ngân Hàng</span>
              </label>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
            <div className="text-xs font-bold text-slate-700 mb-1">Tóm Tắt Đơn Hàng ({cart.length} mặt hàng)</div>
            {cart.map(({ book, quantity }) => (
              <div key={book.id} className="flex justify-between text-xs text-slate-600">
                <span className="truncate max-w-[240px]">{quantity}x {book.title}</span>
                <span className="font-semibold">{formatPrice((book.sale_price || book.price) * quantity)}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-indigo-600">
              <span>Tổng Tiền Đơn Hàng:</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/25 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {submitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>Xác Nhận Đặt Hàng • {formatPrice(totalAmount)}</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

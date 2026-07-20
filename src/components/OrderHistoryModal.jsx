import React, { useState, useEffect } from 'react';
import { X, Package, Calendar, MapPin, Phone, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { fetchUserOrders } from '../services/orderService';

export const OrderHistoryModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && user) {
      setLoading(true);
      fetchUserOrders(user.id).then(({ data }) => {
        setOrders(data || []);
        setLoading(false);
      });
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-100 relative max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Lịch Sử Đơn Hàng</h3>
            <p className="text-xs text-slate-500">
              Danh sách đơn hàng của tài khoản <span className="font-semibold text-indigo-600">{user?.email}</span>
            </p>
          </div>
        </div>

        {loading ? (
          <div className="py-12 flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-medium">Bạn chưa có đơn hàng nào.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div 
                key={order.id}
                className="p-4 border border-slate-200/80 rounded-2xl bg-slate-50/50 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-indigo-600 text-sm">
                      Mã Đơn: #{order.id}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(order.created_at)}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                    <Clock className="w-3.5 h-3.5" /> {order.status === 'pending' ? 'Đang xử lý' : order.status}
                  </span>
                </div>

                <div className="py-3 space-y-2">
                  {order.order_items?.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-800">
                          {item.books?.title || `Sách ID #${item.book_id}`} x{item.quantity}
                        </span>
                      </div>
                      <span className="font-semibold text-slate-700">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-200 flex flex-wrap justify-between items-center text-xs text-slate-500">
                  <div className="space-y-0.5">
                    <p className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {order.shipping_address}
                    </p>
                    <p className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" /> {order.phone}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Tổng cộng:</span>
                    <div className="text-base font-extrabold text-indigo-600">
                      {formatPrice(order.total_amount)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

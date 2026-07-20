import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = ({ isOpen, onClose, onOpenCheckout }) => {
  const { cart, removeFromCart, updateQuantity, totalAmount, totalItemsCount } = useCart();

  if (!isOpen) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg">Giỏ Hàng Của Bạn</h2>
                <p className="text-xs text-slate-500 font-medium">
                  Có {totalItemsCount} sản phẩm
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 bg-indigo-50 text-indigo-400 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-slate-800 text-base">Giỏ hàng chưa có sách nào</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Hãy chọn các cuốn sách yêu thích của bạn!
                </p>
              </div>
            ) : (
              cart.map(({ book, quantity }) => {
                const price = book.sale_price || book.price;
                const coverSrc = book.cover_url || book.local_jpg;
                return (
                  <div 
                    key={book.id}
                    className="flex gap-4 p-3 border border-slate-100 rounded-2xl bg-white hover:border-indigo-100 shadow-sm transition-all"
                  >
                    <img
                      src={coverSrc}
                      alt={book.title}
                      className="w-16 h-22 object-cover rounded-xl shrink-0 bg-slate-100"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-bold text-slate-900 text-xs line-clamp-2 leading-tight">
                            {book.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(book.id)}
                            className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                            title="Xóa mục này"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{book.author}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
                        <span className="font-extrabold text-indigo-600 text-xs">
                          {formatPrice(price)}
                        </span>

                        <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 p-0.5">
                          <button
                            onClick={() => updateQuantity(book.id, quantity - 1)}
                            className="p-1 hover:bg-white rounded text-slate-600 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-bold text-xs text-slate-800">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(book.id, quantity + 1)}
                            className="p-1 hover:bg-white rounded text-slate-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Tạm tính ({totalItemsCount} cuốn):</span>
                  <span className="font-medium text-slate-700">{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Phí vận chuyển:</span>
                  <span className="font-medium text-emerald-600">Miễn phí</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Tổng tiền thanh toán:</span>
                  <span className="text-indigo-600">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/25 transition-all text-sm flex items-center justify-center gap-2"
              >
                Tiến Hành Thanh Toán
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

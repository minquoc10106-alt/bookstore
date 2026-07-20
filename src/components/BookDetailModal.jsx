import React, { useState } from 'react';
import { X, ShoppingCart, Star, ShieldCheck, Truck, BookOpen, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const DEFAULT_COVERS = {
  'Công nghệ': 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600',
  'Kinh tế': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600',
  'Văn học': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
  'Kỹ năng sống': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
  'Thiếu nhi': 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600'
};

export const BookDetailModal = ({ book, isOpen, onClose, onShowToast }) => {
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);
  const { addToCart } = useCart();

  if (!isOpen || !book) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(book, quantity);
    onShowToast(`Đã thêm ${quantity} cuốn "${book.title}" vào giỏ hàng!`, 'success');
    onClose();
  };

  const fallbackUrl = DEFAULT_COVERS[book.category] || DEFAULT_COVERS['Kỹ năng sống'];
  const coverSrc = imgError ? fallbackUrl : (book.cover_url || book.local_jpg || fallbackUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-100 relative overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-5 bg-slate-100 rounded-2xl overflow-hidden aspect-[3/4] relative shadow-md">
            <img
              src={coverSrc}
              alt={book.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {book.category}
            </span>
          </div>

          <div className="md:col-span-7 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 text-amber-500 font-semibold text-sm mb-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-slate-800 font-bold">{book.rating || 4.8}</span>
              </div>

              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-snug">
                {book.title}
              </h2>

              <p className="text-sm text-indigo-600 font-medium mt-1 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Tác giả: {book.author}
              </p>

              <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl flex items-baseline gap-3">
                <span className="text-2xl font-black text-indigo-600">
                  {formatPrice(book.sale_price || book.price)}
                </span>
                {book.sale_price && (
                  <span className="text-sm text-slate-400 line-through font-medium">
                    {formatPrice(book.price)}
                  </span>
                )}
              </div>

              <div className="mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Mô Tả Sản Phẩm
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {book.description || 'Cuốn sách tuyệt vời cung cấp nhiều tri thức hữu ích và giá trị sâu sắc.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="flex items-center gap-2 p-2 bg-emerald-50 text-emerald-800 text-xs rounded-xl font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  Sách chính hãng 100%
                </div>
                <div className="flex items-center gap-2 p-2 bg-indigo-50 text-indigo-800 text-xs rounded-xl font-medium">
                  <Truck className="w-4 h-4 text-indigo-600 shrink-0" />
                  Giao nhanh 24h
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">Số lượng:</span>
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 hover:bg-white rounded-lg text-slate-600 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(book.stock || 99, quantity + 1))}
                    className="p-1.5 hover:bg-white rounded-lg text-slate-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/25 transition-all text-sm flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Thêm Vào Giỏ Hàng • {formatPrice((book.sale_price || book.price) * quantity)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

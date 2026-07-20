import React, { useState } from 'react';
import { ShoppingCart, Star, Eye, BookOpen } from 'lucide-react';
import { useCart } from '../context/CartContext';

const DEFAULT_COVERS = {
  'Công nghệ': 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600',
  'Kinh tế': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600',
  'Văn học': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
  'Kỹ năng sống': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
  'Thiếu nhi': 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600'
};

export const BookCard = ({ book, onQuickView, onShowToast }) => {
  const { addToCart } = useCart();
  const [imgError, setImgError] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(book, 1);
    onShowToast(`Đã thêm "${book.title}" vào giỏ hàng!`, 'success');
  };

  const discountPercent = book.sale_price 
    ? Math.round(((book.price - book.sale_price) / book.price) * 100) 
    : 0;

  // Smart image resolution: if error or missing, fallback to category high-res cover
  const fallbackUrl = DEFAULT_COVERS[book.category] || DEFAULT_COVERS['Kỹ năng sống'];
  const coverSrc = imgError ? fallbackUrl : (book.cover_url || book.local_jpg || fallbackUrl);

  return (
    <div 
      onClick={() => onQuickView(book)}
      className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden flex items-center justify-center">
        <img
          src={coverSrc}
          alt={book.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Category Pill */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-indigo-700 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {book.category}
        </span>

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className="absolute top-3 right-3 bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-md">
            -{discountPercent}%
          </span>
        )}

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onQuickView(book); }}
            className="p-2.5 bg-white text-slate-800 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-colors"
            title="Xem chi tiết"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold mb-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{book.rating || 4.8}</span>
            <span className="text-slate-400 font-normal">| Kho: {book.stock}</span>
          </div>

          <h3 className="font-bold text-slate-900 text-sm line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug">
            {book.title}
          </h3>

          <p className="text-xs text-slate-500 mt-1 font-medium">
            {book.author}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-base font-extrabold text-indigo-600">
              {formatPrice(book.sale_price || book.price)}
            </div>
            {book.sale_price && (
              <div className="text-xs text-slate-400 line-through">
                {formatPrice(book.price)}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="p-2.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1.5 text-xs font-semibold"
            title="Thêm vào giỏ hàng"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Thêm</span>
          </button>
        </div>
      </div>
    </div>
  );
};

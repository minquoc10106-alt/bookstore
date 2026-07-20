import React, { useState } from 'react';
import { ShoppingCart, Star, Eye, ImageOff } from 'lucide-react';
import { useCart } from '../context/CartContext';

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

  // Primary image source (supports local /images/*.jpg or online URL)
  const coverSrc = book.cover_url || book.local_jpg;

  return (
    <div 
      onClick={() => onQuickView(book)}
      className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[3/4] bg-indigo-950/90 overflow-hidden flex items-center justify-center">
        {!imgError ? (
          <img
            src={coverSrc}
            alt={book.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="p-4 text-center text-indigo-200 flex flex-col items-center">
            <ImageOff className="w-8 h-8 opacity-60 mb-2" />
            <span className="text-[11px] font-bold line-clamp-2">{book.title}</span>
            <span className="text-[9px] opacity-75 mt-1">Cần file .jpg trong public/images/</span>
          </div>
        )}
        
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

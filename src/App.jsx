import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { BookCard } from './components/BookCard';
import { BookDetailModal } from './components/BookDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';
import { AboutModal } from './components/AboutModal';
import { PolicyModal } from './components/PolicyModal';
import { ContactModal } from './components/ContactModal';
import { Toast } from './components/Toast';
import { fetchBooks } from './services/bookService';
import { BookOpen, FileImage, ShieldCheck, PhoneCall, Info, Sparkles, Heart } from 'lucide-react';

const MainApp = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [isSupabaseConfigOpen, setIsSupabaseConfigOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedBookDetail, setSelectedBookDetail] = useState(null);

  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 4000);
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchBooks(selectedCategory, searchQuery).then(({ data }) => {
      if (isMounted) {
        if (data) setBooks(data);
        setLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSupabaseConfig={() => setIsSupabaseConfigOpen(true)}
        onOpenOrderHistory={() => setIsOrderHistoryOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenPolicy={() => setIsPolicyOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onShowToast={showToast}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroBanner 
          onExploreClick={() => {
            const el = document.getElementById('book-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} 
        />



        <div id="book-section">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalResults={books.length}
          />
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-slate-500 mt-4">Đang tải danh sách sách từ BookVerse...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs">
            <BookOpen className="w-12 h-12 text-indigo-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">Không tìm thấy sách</h3>
            <button
              onClick={() => { setSelectedCategory('Tất cả'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 font-bold rounded-xl text-xs hover:bg-indigo-100 transition-colors"
            >
              Xem toàn bộ
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onQuickView={setSelectedBookDetail}
                onShowToast={showToast}
              />
            ))}
          </div>
        )}
      </main>

      {/* Enhanced Footer with Links */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-extrabold text-lg mb-3">
              <BookOpen className="w-5 h-5 text-indigo-400" /> BookVerse 
            </div>
            <p className="text-xs leading-relaxed">
              Ứng dụng bán sách trực tuyến.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Về BookVerse</h4>
            <ul className="text-xs space-y-2">
              <li>
                <button onClick={() => setIsAboutOpen(true)} className="hover:text-indigo-400 transition-colors">
                  Giới thiệu BookVerse
                </button>
              </li>
              <li>
                <button onClick={() => setIsPolicyOpen(true)} className="hover:text-indigo-400 transition-colors">
                  Chính sách đổi trả 7 ngày
                </button>
              </li>
              <li>
                <button onClick={() => setIsPolicyOpen(true)} className="hover:text-indigo-400 transition-colors">
                  Chính sách bảo mật thông tin
                </button>
              </li>
              <li>
                <button onClick={() => setIsPolicyOpen(true)} className="hover:text-indigo-400 transition-colors">
                  Chính sách vận chuyển toàn quốc
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Hỗ Trợ &amp; Liên Hệ</h4>
            <ul className="text-xs space-y-2">
              <li className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" /> Hotline: 1900 8888
              </li>
              <li className="flex items-center gap-2">
                <button onClick={() => setIsContactOpen(true)} className="hover:text-indigo-400 transition-colors text-left">
                  Gửi tin nhắn phản hồi
                </button>
              </li>
              <li>Địa chỉ: 123 Đường Xô Viết Nghệ Tĩnh, Quận Hải Châu, TP. Đà Nẵng</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-800/80 text-center text-xs text-slate-500">
          © 2026 BookVerse • All rights reserved.
        </div>
      </footer>

      {/* Modals */}
      <BookDetailModal
        book={selectedBookDetail}
        isOpen={Boolean(selectedBookDetail)}
        onClose={() => setSelectedBookDetail(null)}
        onShowToast={showToast}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onShowToast={showToast}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onShowToast={showToast}
      />

      <OrderHistoryModal
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
      />

      <SupabaseConfigModal
        isOpen={isSupabaseConfigOpen}
        onClose={() => setIsSupabaseConfigOpen(false)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <PolicyModal
        isOpen={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onShowToast={showToast}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </AuthProvider>
  );
}

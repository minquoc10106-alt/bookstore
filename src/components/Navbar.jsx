import React, { useState } from 'react';
import { BookOpen, ShoppingBag, User, LogOut, Package, Database, ChevronDown, Info, ShieldCheck, PhoneCall, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { isSupabaseConnected } from '../lib/supabase';

export const Navbar = ({ 
  onOpenCart, 
  onOpenAuth, 
  onOpenSupabaseConfig, 
  onOpenOrderHistory,
  onOpenAbout,
  onOpenPolicy,
  onOpenContact,
  onOpenAdmin,
  onShowToast 
}) => {
  const { user, profile, signOut } = useAuth();
  const { totalItemsCount } = useCart();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const isConnected = isSupabaseConnected();

  const handleSignOut = async () => {
    await signOut();
    setUserDropdownOpen(false);
    onShowToast('Đã đăng xuất tài khoản.', 'info');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1">
              Book<span className="text-indigo-600">Verse</span>
            </span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600">
          <button 
            onClick={onOpenAbout} 
            className="hover:text-indigo-600 transition-colors flex items-center gap-1 py-1"
          >
            <Info className="w-3.5 h-3.5" /> Về Chúng Tôi
          </button>
          <button 
            onClick={onOpenPolicy} 
            className="hover:text-indigo-600 transition-colors flex items-center gap-1 py-1"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Chính Sách
          </button>
          <button 
            onClick={onOpenContact} 
            className="hover:text-indigo-600 transition-colors flex items-center gap-1 py-1"
          >
            <PhoneCall className="w-3.5 h-3.5" /> Liên Hệ
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-2xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 transition-all active:scale-95 flex items-center gap-2"
            title="Giỏ hàng"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-xs font-bold hidden md:inline">Giỏ Hàng</span>
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-indigo-600/30 animate-pulse">
                {totalItemsCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pl-3 pr-2 rounded-2xl bg-slate-100 hover:bg-slate-200/80 transition-colors border border-slate-200"
              >
                <img
                  src={profile?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'}
                  alt="Avatar"
                  className="w-7 h-7 rounded-full object-cover border border-indigo-400"
                />
                <span className="text-xs font-bold text-slate-800 max-w-[100px] truncate hidden sm:inline">
                  {profile?.full_name || user.email.split('@')[0]}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-slide-up"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {profile?.full_name || 'Người dùng'}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenOrderHistory();
                    }}
                    className="w-full px-4 py-2.5 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2 font-medium transition-colors"
                  >
                    <Package className="w-4 h-4 text-slate-400" /> Lịch Sử Đơn Hàng
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenAbout();
                    }}
                    className="w-full px-4 py-2.5 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex lg:hidden items-center gap-2 font-medium transition-colors"
                  >
                    <Info className="w-4 h-4 text-slate-400" /> Về Chúng Tôi
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenPolicy();
                    }}
                    className="w-full px-4 py-2.5 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex lg:hidden items-center gap-2 font-medium transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-slate-400" /> Chính Sách
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenContact();
                    }}
                    className="w-full px-4 py-2.5 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex lg:hidden items-center gap-2 font-medium transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-slate-400" /> Liên Hệ
                  </button>

                  <div className="border-t border-slate-100 my-1"></div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onOpenAdmin();
                    }}
                    className="w-full px-4 py-2.5 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2 font-medium transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-400" /> Trang Quản Trị (Admin)
                  </button>

                  <div className="border-t border-slate-100 my-1"></div>

                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Đăng Xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-md shadow-indigo-600/25 transition-all text-xs flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Đăng Nhập / Đăng Ký</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

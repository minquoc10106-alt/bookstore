import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, Package, ShoppingBag, DollarSign, ArrowLeft, Save, X, 
  CheckCircle2, Clock, Truck, ShieldAlert, BookOpen, Layers
} from 'lucide-react';
import { createBook, updateBook, deleteBook } from '../services/bookService';
import { fetchAllOrders, updateOrderStatus } from '../services/orderService';

export const AdminPanel = ({ books, onRefreshBooks, onBackToStore, onShowToast }) => {
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, books, orders
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Form states for Book Add/Edit
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [stock, setStock] = useState(10);
  const [category, setCategory] = useState('Công nghệ');
  const [coverUrl, setCoverUrl] = useState('');
  const [description, setDescription] = useState('');

  // Fetch all orders on load or tab change
  const loadOrders = () => {
    setOrdersLoading(true);
    fetchAllOrders().then(({ data }) => {
      setOrders(data || []);
      setOrdersLoading(false);
    });
  };

  useEffect(() => {
    if (activeTab === 'orders' || activeTab === 'dashboard') {
      loadOrders();
    }
  }, [activeTab]);

  const handleOpenAddModal = () => {
    setEditingBook(null);
    setTitle('');
    setAuthor('');
    setPrice('');
    setSalePrice('');
    setStock(15);
    setCategory('Công nghệ');
    setCoverUrl('');
    setDescription('');
    setBookModalOpen(true);
  };

  const handleOpenEditModal = (book) => {
    setEditingBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setPrice(book.price);
    setSalePrice(book.sale_price || '');
    setStock(book.stock || 10);
    setCategory(book.category);
    setCoverUrl(book.cover_url || '');
    setDescription(book.description || '');
    setBookModalOpen(true);
  };

  const handleSaveBook = async (e) => {
    e.preventDefault();
    if (!title || !author || !price) {
      alert('Vui lòng điền tiêu đề, tác giả và giá tiền!');
      return;
    }

    const payload = {
      title,
      author,
      price: Number(price),
      sale_price: salePrice ? Number(salePrice) : null,
      stock: Number(stock),
      category,
      cover_url: coverUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
      description
    };

    if (editingBook) {
      // Edit mode
      const { error } = await updateBook(editingBook.id, payload);
      if (error) {
        onShowToast('Cập nhật sách thất bại. Vui lòng thử lại!', 'error');
      } else {
        onShowToast(`Đã cập nhật sách "${title}" thành công!`, 'success');
        setBookModalOpen(false);
        onRefreshBooks();
      }
    } else {
      // Add mode
      const { error } = await createBook(payload);
      if (error) {
        onShowToast('Thêm sách thất bại. Vui lòng thử lại!', 'error');
      } else {
        onShowToast(`Đã thêm sách mới "${title}" thành công!`, 'success');
        setBookModalOpen(false);
        onRefreshBooks();
      }
    }
  };

  const handleDeleteBook = async (bookId, bookTitle) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa cuốn sách "${bookTitle}"?`)) {
      const { error } = await deleteBook(bookId);
      if (error) {
        onShowToast('Xóa sách thất bại!', 'error');
      } else {
        onShowToast('Đã xóa sách khỏi hệ thống!', 'success');
        onRefreshBooks();
      }
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const { error } = await updateOrderStatus(orderId, newStatus);
    if (error) {
      onShowToast('Cập nhật trạng thái đơn hàng thất bại!', 'error');
    } else {
      onShowToast(`Đã cập nhật đơn hàng #${orderId} sang trạng thái "${newStatus}"!`, 'success');
      loadOrders();
    }
  };

  // Calculations for Dashboard Stats
  const totalRevenue = orders
    .filter(o => o.status === 'delivered' || o.status === 'pending' || o.status === 'processing' || o.status === 'shipped')
    .reduce((sum, o) => sum + Number(o.total_amount), 0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-amber-50 text-amber-700 border-amber-200',
      processing: 'bg-blue-50 text-blue-700 border-blue-200',
      shipped: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      cancelled: 'bg-rose-50 text-rose-700 border-rose-200'
    };
    const labels = {
      pending: 'Chờ xử lý',
      processing: 'Đang chuẩn bị',
      shipped: 'Đang giao',
      delivered: 'Đã giao thành công',
      cancelled: 'Đã hủy'
    };
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${styles[status]}`}>
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm tracking-tight">Khu Vực Quản Trị (Admin)</h2>
              <p className="text-[10px] text-indigo-300 -mt-0.5">Quản lý kho sách và đơn hàng</p>
            </div>
          </div>

          <button
            onClick={onBackToStore}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" /> Quay Lại Cửa Hàng
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-950'
            }`}
          >
            <Layers className="w-4 h-4" /> Bảng Điều Khiển (Dashboard)
          </button>
          <button
            onClick={() => setActiveTab('books')}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'books'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-950'
            }`}
          >
            <Package className="w-4 h-4" /> Quản Lý Kho Sách
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-950'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Quản Lý Đơn Hàng ({orders.length})
          </button>
        </div>

        {/* 1. Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 border border-slate-200/80 rounded-2xl shadow-xs flex items-center gap-4">
                <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Doanh Thu Hệ Thống</h4>
                  <p className="text-xl md:text-2xl font-black text-slate-800 mt-1">{formatPrice(totalRevenue)}</p>
                </div>
              </div>

              <div className="bg-white p-6 border border-slate-200/80 rounded-2xl shadow-xs flex items-center gap-4">
                <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tổng Đơn Đặt Hàng</h4>
                  <p className="text-xl md:text-2xl font-black text-slate-800 mt-1">{orders.length} Đơn</p>
                </div>
              </div>

              <div className="bg-white p-6 border border-slate-200/80 rounded-2xl shadow-xs flex items-center gap-4">
                <div className="p-4 bg-indigo-100 text-indigo-600 rounded-2xl">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Đầu Sách Đang Bán</h4>
                  <p className="text-xl md:text-2xl font-black text-slate-800 mt-1">{books.length} Cuốn</p>
                </div>
              </div>
            </div>

            {/* Recent Orders List in Dashboard */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
              <h3 className="font-extrabold text-slate-900 text-sm mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" /> Đơn Hàng Mới Đặt Gần Đây
              </h3>
              {ordersLoading ? (
                <div className="py-8 flex justify-center"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>
              ) : orders.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">Chưa có đơn hàng nào.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold">
                        <th className="pb-3">Mã đơn</th>
                        <th className="pb-3">Email khách</th>
                        <th className="pb-3">Địa chỉ giao</th>
                        <th className="pb-3">Tổng tiền</th>
                        <th className="pb-3">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map(o => (
                        <tr key={o.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                          <td className="py-3 font-semibold text-indigo-600">#{o.id}</td>
                          <td className="py-3 font-medium">{o.guest_email || 'Thành viên'}</td>
                          <td className="py-3 text-slate-500 max-w-[200px] truncate">{o.shipping_address}</td>
                          <td className="py-3 font-bold">{formatPrice(o.total_amount)}</td>
                          <td className="py-3">{getStatusBadge(o.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. Books Tab (Quản lý kho sách) */}
        {activeTab === 'books' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-slate-900 text-sm">Danh Sách Sách Trong Kho ({books.length})</h3>
              <button
                onClick={handleOpenAddModal}
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-600/20 active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" /> Thêm Sách Mới
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold pb-2">
                    <th className="pb-3 w-16">Bìa</th>
                    <th className="pb-3">Tiêu đề sách / Tác giả</th>
                    <th className="pb-3">Thể loại</th>
                    <th className="pb-3 text-right">Giá gốc / Sale</th>
                    <th className="pb-3 text-center">Tồn kho</th>
                    <th className="pb-3 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map(b => (
                    <tr key={b.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                      <td className="py-3">
                        <img src={b.cover_url} alt="" className="w-9 h-12 object-cover rounded bg-slate-100" />
                      </td>
                      <td className="py-3">
                        <div className="font-bold text-slate-900 leading-snug">{b.title}</div>
                        <div className="text-[11px] text-slate-400 font-medium">{b.author}</div>
                      </td>
                      <td className="py-3 font-semibold text-indigo-600">{b.category}</td>
                      <td className="py-3 text-right font-bold">
                        <div>{formatPrice(b.sale_price || b.price)}</div>
                        {b.sale_price && <div className="text-[10px] text-slate-400 line-through font-normal">{formatPrice(b.price)}</div>}
                      </td>
                      <td className="py-3 text-center font-bold text-slate-700">{b.stock}</td>
                      <td className="py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenEditModal(b)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Sửa sách"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBook(b.id, b.title)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Xóa sách"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Orders Tab (Quản lý đơn hàng) */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm">Quản Lý Toàn Bộ Đơn Hàng ({orders.length})</h3>
            
            {ordersLoading ? (
              <div className="py-12 flex justify-center"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>
            ) : orders.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">Chưa có đơn hàng nào.</p>
            ) : (
              <div className="space-y-4">
                {orders.map(o => (
                  <div key={o.id} className="p-4 border border-slate-200/80 rounded-2xl bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-3">
                      <div className="font-bold text-slate-950 text-xs flex items-center gap-1">
                        Mã: <span className="text-indigo-600 font-extrabold">#{o.id}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{new Date(o.created_at).toLocaleString('vi-VN')}</div>
                      <div className="text-[11px] text-slate-500 font-semibold truncate mt-1">{o.guest_email || 'Thành viên'}</div>
                    </div>

                    <div className="md:col-span-4 text-xs">
                      <div className="text-slate-700 font-medium">SĐT: <strong>{o.phone}</strong></div>
                      <div className="text-slate-400 text-[11px] truncate max-w-[240px]">Địa chỉ: {o.shipping_address}</div>
                    </div>

                    <div className="md:col-span-2">
                      <span className="text-[10px] text-slate-400 block">Tổng tiền:</span>
                      <strong className="text-indigo-600 text-sm font-extrabold">{formatPrice(o.total_amount)}</strong>
                    </div>

                    <div className="md:col-span-3 flex justify-between items-center gap-3">
                      <div>{getStatusBadge(o.status)}</div>
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg text-xs font-semibold px-2 py-1 outline-none text-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      >
                        <option value="pending">Chờ xử lý</option>
                        <option value="processing">Đang chuẩn bị</option>
                        <option value="shipped">Đang giao</option>
                        <option value="delivered">Đã giao</option>
                        <option value="cancelled">Đã hủy</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Book Add/Edit Modal */}
      {bookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setBookModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-extrabold text-slate-900 mb-6">
              {editingBook ? `Chỉnh Sửa Sách: ${editingBook.title}` : 'Thêm Đầu Sách Mới'}
            </h3>

            <form onSubmit={handleSaveBook} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Tiêu Đề Sách *</label>
                  <input
                    type="text" required placeholder="Ví dụ: Đắc Nhân Tâm"
                    value={title} onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Tác Giả *</label>
                  <input
                    type="text" required placeholder="Ví dụ: Dale Carnegie"
                    value={author} onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Giá Bán Gốc (đ) *</label>
                  <input
                    type="number" required min={0} placeholder="Ví dụ: 120000"
                    value={price} onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Giá Khuyến Mãi (đ)</label>
                  <input
                    type="number" min={0} placeholder="Bỏ trống nếu không sale"
                    value={salePrice} onChange={(e) => setSalePrice(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Số Lượng Kho *</label>
                  <input
                    type="number" required min={0} placeholder="Ví dụ: 25"
                    value={stock} onChange={(e) => setStock(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Thể Loại *</label>
                  <select
                    value={category} onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl outline-none font-semibold text-slate-700"
                  >
                    <option value="Công nghệ">Công nghệ</option>
                    <option value="Kinh tế">Kinh tế</option>
                    <option value="Văn học">Văn học</option>
                    <option value="Kỹ năng sống">Kỹ năng sống</option>
                    <option value="Thiếu nhi">Thiếu nhi</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Đường Dẫn Bìa Ảnh (URL / local)</label>
                  <input
                    type="text" placeholder="/images/dac-nhan-tam.jpg"
                    value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 mb-1">Mô Tả Đầu Sách</label>
                <textarea
                  rows={3} placeholder="Mô tả nội dung tóm tắt của cuốn sách..."
                  value={description} onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 bg-slate-50 focus:bg-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/25 transition-all text-xs flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> Lưu Thông Tin Sách
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

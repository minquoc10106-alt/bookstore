import { supabase, isSupabaseConnected } from '../lib/supabase';
import { MOCK_BOOKS } from './mockData';

// Helper to get local mock books
const getLocalMockBooks = () => {
  const saved = localStorage.getItem('bv2_mock_books');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  localStorage.setItem('bv2_mock_books', JSON.stringify(MOCK_BOOKS));
  return MOCK_BOOKS;
};

export const fetchBooks = async (category = 'Tất cả', searchQuery = '') => {
  if (!isSupabaseConnected()) {
    let books = getLocalMockBooks();
    if (category && category !== 'Tất cả') {
      books = books.filter(b => b.category === category);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      books = books.filter(b => 
        b.title.toLowerCase().includes(q) || 
        b.author.toLowerCase().includes(q)
      );
    }
    return { data: books, error: null };
  }

  try {
    let query = supabase.from('books').select('*').order('id', { ascending: true });

    if (category && category !== 'Tất cả') {
      query = query.eq('category', category);
    }

    if (searchQuery.trim()) {
      query = query.or(`title.ilike.%${searchQuery}%,author.ilike.%${searchQuery}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.warn('Supabase query fallback to mock data:', err.message);
    let books = getLocalMockBooks();
    if (category && category !== 'Tất cả') {
      books = books.filter(b => b.category === category);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      books = books.filter(b => 
        b.title.toLowerCase().includes(q) || 
        b.author.toLowerCase().includes(q)
      );
    }
    return { data: books, error: null };
  }
};

// Admin CRUD Book Services
export const createBook = async (bookData) => {
  if (!isSupabaseConnected()) {
    const books = getLocalMockBooks();
    const newBook = {
      id: Date.now(),
      rating: 4.8,
      ...bookData,
      price: Number(bookData.price),
      sale_price: bookData.sale_price ? Number(bookData.sale_price) : null,
      stock: Number(bookData.stock || 10)
    };
    localStorage.setItem('bv2_mock_books', JSON.stringify([...books, newBook]));
    return { data: newBook, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('books')
      .insert({
        ...bookData,
        price: Number(bookData.price),
        sale_price: bookData.sale_price ? Number(bookData.sale_price) : null,
        stock: Number(bookData.stock || 10)
      })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating book in Supabase:', error);
    return { data: null, error };
  }
};

export const updateBook = async (bookId, bookData) => {
  if (!isSupabaseConnected()) {
    const books = getLocalMockBooks();
    const updatedBooks = books.map(b => 
      b.id === bookId 
        ? { ...b, ...bookData, price: Number(bookData.price), sale_price: bookData.sale_price ? Number(bookData.sale_price) : null, stock: Number(bookData.stock || 10) }
        : b
    );
    localStorage.setItem('bv2_mock_books', JSON.stringify(updatedBooks));
    const updated = updatedBooks.find(b => b.id === bookId);
    return { data: updated, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('books')
      .update({
        ...bookData,
        price: Number(bookData.price),
        sale_price: bookData.sale_price ? Number(bookData.sale_price) : null,
        stock: Number(bookData.stock || 10)
      })
      .eq('id', bookId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating book in Supabase:', error);
    return { data: null, error };
  }
};

export const deleteBook = async (bookId) => {
  if (!isSupabaseConnected()) {
    const books = getLocalMockBooks();
    const filtered = books.filter(b => b.id !== bookId);
    localStorage.setItem('bv2_mock_books', JSON.stringify(filtered));
    return { error: null };
  }

  try {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', bookId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting book from Supabase:', error);
    return { error };
  }
};

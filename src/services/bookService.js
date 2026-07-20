import { supabase, isSupabaseConnected } from '../lib/supabase';
import { MOCK_BOOKS } from './mockData';

export const fetchBooks = async (category = 'Tất cả', searchQuery = '') => {
  if (!isSupabaseConnected()) {
    let books = [...MOCK_BOOKS];
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
    let books = [...MOCK_BOOKS];
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

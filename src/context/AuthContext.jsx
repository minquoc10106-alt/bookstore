import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConnected } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId, userEmail) => {
    if (!isSupabaseConnected()) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        setProfile(data);
      } else {
        const newProfile = {
          id: userId,
          email: userEmail,
          full_name: userEmail.split('@')[0],
          avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
        };
        await supabase.from('profiles').upsert(newProfile);
        setProfile(newProfile);
      }
    } catch (err) {
      console.error('Profile query error:', err);
    }
  };

  useEffect(() => {
    if (!isSupabaseConnected()) {
      const savedMockUser = localStorage.getItem('bv2_mock_user');
      if (savedMockUser) {
        const parsed = JSON.parse(savedMockUser);
        setUser(parsed);
        setProfile(parsed);
      }
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        await fetchProfile(currentUser.id, currentUser.email);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password, fullName) => {
    if (!isSupabaseConnected()) {
      const mockUser = {
        id: 'mock-usr-' + Date.now(),
        email,
        full_name: fullName || email.split('@')[0],
        avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
      };
      localStorage.setItem('bv2_mock_user', JSON.stringify(mockUser));
      setUser(mockUser);
      setProfile(mockUser);
      return { data: { user: mockUser }, error: null };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (error) throw error;

      if (data?.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          email: data.user.email,
          full_name: fullName || data.user.email.split('@')[0],
          avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
        });
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signIn = async (email, password) => {
    if (!isSupabaseConnected()) {
      const mockUser = {
        id: 'mock-usr-1',
        email,
        full_name: email.split('@')[0],
        avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
      };
      localStorage.setItem('bv2_mock_user', JSON.stringify(mockUser));
      setUser(mockUser);
      setProfile(mockUser);
      return { data: { user: mockUser }, error: null };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data?.user) {
        await fetchProfile(data.user.id, data.user.email);
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    if (!isSupabaseConnected()) {
      localStorage.removeItem('bv2_mock_user');
      setUser(null);
      setProfile(null);
      return;
    }

    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import { supabase, isSupabaseConnected } from '../lib/supabase';

export const createOrder = async ({ userId, guestEmail, shippingAddress, phone, cartItems, totalAmount }) => {
  if (!isSupabaseConnected()) {
    const mockOrder = {
      id: Date.now(),
      created_at: new Date().toISOString(),
      user_id: userId || null,
      guest_email: guestEmail || 'guest@example.com',
      total_amount: totalAmount,
      shipping_address: shippingAddress,
      phone,
      status: 'pending',
      order_items: cartItems.map((item, idx) => ({
        id: Date.now() + idx,
        book_id: item.book.id,
        book: item.book,
        quantity: item.quantity,
        price: item.book.sale_price || item.book.price
      }))
    };

    const existingMockOrders = JSON.parse(localStorage.getItem('bv2_mock_orders') || '[]');
    localStorage.setItem('bv2_mock_orders', JSON.stringify([mockOrder, ...existingMockOrders]));

    return { data: mockOrder, error: null };
  }

  try {
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId || null,
        guest_email: guestEmail || null,
        total_amount: totalAmount,
        shipping_address: shippingAddress,
        phone,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) throw orderError;

    const orderItemsPayload = cartItems.map(item => ({
      order_id: orderData.id,
      book_id: item.book.id,
      quantity: item.quantity,
      price: item.book.sale_price || item.book.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsPayload);

    if (itemsError) throw itemsError;

    return { data: orderData, error: null };
  } catch (error) {
    console.error('Error creating order in Supabase:', error);
    return { data: null, error };
  }
};

export const fetchUserOrders = async (userId) => {
  if (!isSupabaseConnected()) {
    const mockOrders = JSON.parse(localStorage.getItem('bv2_mock_orders') || '[]');
    return { data: mockOrders, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          quantity,
          price,
          books (
            id,
            title,
            cover_url,
            author
          )
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching orders:', error);
    const mockOrders = JSON.parse(localStorage.getItem('bv2_mock_orders') || '[]');
    return { data: mockOrders, error: null };
  }
};

// Admin Order Management Services
export const fetchAllOrders = async () => {
  if (!isSupabaseConnected()) {
    const mockOrders = JSON.parse(localStorage.getItem('bv2_mock_orders') || '[]');
    return { data: mockOrders, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          quantity,
          price,
          books (
            id,
            title,
            cover_url,
            author
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching all orders for admin:', error);
    const mockOrders = JSON.parse(localStorage.getItem('bv2_mock_orders') || '[]');
    return { data: mockOrders, error: null };
  }
};

export const updateOrderStatus = async (orderId, status) => {
  if (!isSupabaseConnected()) {
    const mockOrders = JSON.parse(localStorage.getItem('bv2_mock_orders') || '[]');
    const updated = mockOrders.map(o => 
      o.id === orderId ? { ...o, status } : o
    );
    localStorage.setItem('bv2_mock_orders', JSON.stringify(updated));
    return { error: null };
  }

  try {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error updating order status:', error);
    return { error };
  }
};

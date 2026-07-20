import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('bv2_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('bv2_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.book.id === book.id);
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        const newQty = newCart[existingIndex].quantity + quantity;
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: Math.min(newQty, book.stock || 99)
        };
        return newCart;
      } else {
        return [...prevCart, { book, quantity }];
      }
    });
  };

  const removeFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter((item) => item.book.id !== bookId));
  };

  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.book.id === bookId
          ? { ...item, quantity: Math.min(quantity, item.book.stock || 99) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const totalAmount = cart.reduce((total, item) => {
    const itemPrice = item.book.sale_price || item.book.price;
    return total + itemPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        totalAmount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

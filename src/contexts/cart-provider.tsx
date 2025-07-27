"use client";

import type { ReactNode } from 'react';
import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { CartItem, Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (sku: string, size: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartCount: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedItems = localStorage.getItem('cart');
      if (storedItems) {
        setCartItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      setCartItems([]);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  const addToCart = useCallback(
    (product: Product, size: string) => {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find(
          (item) => item.sku === product.sku && item.selectedSize === size
        );

        if (existingItem) {
          return prevItems.map((item) =>
            item.sku === product.sku && item.selectedSize === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [
            ...prevItems,
            { ...product, quantity: 1, selectedSize: size },
          ];
        }
      });
      toast({
        title: "Añadido al carrito",
        description: `${product.title} ha sido añadido a tu carrito.`,
      });
    },
    [toast]
  );

  const removeFromCart = useCallback((sku: string, size: string) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.sku === sku && item.selectedSize === size)
      )
    );
     toast({
        title: "Artículo eliminado",
        description: `El artículo ha sido eliminado de tu carrito.`,
        variant: "destructive"
      });
  }, [toast]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    cartCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
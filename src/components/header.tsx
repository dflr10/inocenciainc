"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingCart as ShoppingCartIcon, Brush } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';
import ShoppingCart from './shopping-cart';

export default function Header() {
  const { cartCount, setIsCartOpen } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="mr-4 flex">
            <a href="/" className="flex items-center space-x-2">
              <Brush className="h-6 w-6 text-primary" />
              <span className="font-bold">Inocencia Studio</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsCartOpen(true)}
              aria-label="Abrir carrito de compras"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              {isMounted && cartCount > 0 && (
                <Badge
                  variant="default"
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-1 text-xs"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>
      <ShoppingCart />
    </>
  );
}
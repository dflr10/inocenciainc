"use client";

import React from 'react';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from './ui/scroll-area';
import { useCart } from '@/hooks/use-cart';
import { Trash2 } from 'lucide-react';
import { Separator } from './ui/separator';

export default function ShoppingCart() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    totalPrice,
  } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Carrito de Compras</SheetTitle>
        </SheetHeader>
        <Separator />
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-6 p-6">
                {cartItems.map((item) => (
                  <div key={`${item.sku}-${item.selectedSize}`} className="flex items-center space-x-4">
                    <div className="relative h-28 w-28 overflow-hidden rounded-md">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                        data-ai-hint="product image"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <span className="font-semibold">{item.title}</span>
                      <span className="text-sm text-muted-foreground">
                        Color: {item.color}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Talla: {item.selectedSize}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {item.quantity} x {formatPrice(item.price)}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.sku, item.selectedSize)}
                      aria-label={`Eliminar ${item.title}`}
                      className="hover:bg-destructive hover:text-destructive-foreground"

                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="bg-secondary p-6">
              <div className="flex w-full flex-col gap-4">
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <Button className="w-full">Finalizar Compra</Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center p-6">
            <div className="text-center">
              <h3 className="text-lg font-medium">Tu carrito está vacío</h3>
              <p className="text-sm text-muted-foreground">
                Añade algunos productos para empezar.
              </p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
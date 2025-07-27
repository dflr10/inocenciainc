"use client";

import React, { useState, useEffect } from 'react';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface ProductDetailsProps {
  product: Product;
}

const colorMap: { [key: string]: string } = {
  Negro: 'black',
  'Verde Limon': '#CFFB00',
  Blanco: 'white',
  Miel: '#8C5D30',
  Multicolor: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)',
  Mora: '#5F3D55 ',
  Crema: '#F5F5DC',
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(product.color);
  const { addToCart } = useCart();

  useEffect(() => {
    setSelectedSize(null);
    setSelectedColor(product.color);
  }, [product.id, product.color]);

  const handleAddToCart = () => {
    if (product && selectedSize) {
      addToCart(product, selectedSize);
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  
  const hasDiscount = product.fullPrice && product.fullPrice > product.price;

  return (
    <div className="flex flex-col space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">{product.brand}</p>
        <h1 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
          {product.title}
        </h1>
      </div>

      <div className="flex items-baseline space-x-2">
        {hasDiscount ? (
          <>
            <span className="text-xl text-gray-500 line-through">
              {formatPrice(product.fullPrice)}
            </span>
            <span className="text-3xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
          </>
        ) : (
          <span className="text-3xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
        )}
      </div>
      

      <div className="flex items-center space-x-4">
        <Badge variant="outline">SKU: {product.sku}</Badge>
      </div>

      <div>
        <h3 className="text-sm font-medium">Color: <span className="font-normal">{selectedColor}</span></h3>
        <div className="mt-2 flex flex-wrap gap-3">
          {product.availableColors?.map((color) => (
            <button
              key={color}
              type="button"
              className={cn(
                'h-10 w-10 rounded-full border-2 transition-all duration-200 ease-in-out transform hover:scale-110',
                selectedColor === color ? 'ring-2 ring-primary ring-offset-2 border-primary' : 'border-gray-300',
                color === 'Blanco' && 'border-gray-400'
              )}
              style={{
                background: colorMap[color] || color.toLowerCase(),
              }}
              onClick={() => setSelectedColor(color)}
              aria-label={`Seleccionar color ${color}`}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium">Tallas Disponibles</h3>
        <RadioGroup
          value={selectedSize ?? ''}
          onValueChange={setSelectedSize}
          className="mt-2 flex flex-wrap gap-2"
        >
          {Array.isArray(product.sizes) &&
            product.sizes.filter(Boolean).map((size) => (
            <Label
              key={size}
              htmlFor={`size-${size}-${product.id}`}
              className={cn(
                'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border p-3 text-sm font-medium transition-all duration-200 ease-in-out',
                'shadow-md hover:shadow-xl hover:-translate-y-1',
                selectedSize === size
                  ? 'border-primary bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'bg-card text-card-foreground'
              )}
            >
              <RadioGroupItem value={size} id={`size-${size}-${product.id}`} className="sr-only" />
              {size}
            </Label>
          ))}
        </RadioGroup>
      </div>

      <Button
        size="lg"
        onClick={handleAddToCart}
        disabled={!selectedSize}
        className="w-full shadow-lg transform hover:scale-105 transition-transform"
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        {selectedSize ? 'Añadir al carrito' : 'Selecciona una talla'}
      </Button>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Detalles del Producto</AccordionTrigger>
          <AccordionContent>
            <div 
              className="prose prose-sm max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: product.details }}
            ></div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
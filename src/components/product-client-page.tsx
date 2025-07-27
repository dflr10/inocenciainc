"use client";

import type { Product } from '@/lib/types';
import ImageGallery from './image-gallery';
import ProductDetails from './product-details';
import RelatedProducts from './related-products';
import { Separator } from './ui/separator';

interface ProductClientPageProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductClientPage({
  product,
  relatedProducts,
}: ProductClientPageProps) {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <ImageGallery images={product.images} title={product.title} />
        </div>
        <div className="lg:col-span-3">
          <ProductDetails product={product} />
        </div>
      </div>
      <Separator className="my-12" />
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}
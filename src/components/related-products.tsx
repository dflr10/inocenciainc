
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { CardBody, CardContainer, CardItem } from './ui/3d-card';

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  
  const truncateTitle = (title: string) => {
    if (title.length > 29) {
      return title.substring(0, 29) + '...';
    }
    return title;
  };

  const validProducts = products.filter(p => p && p.id);

  if (!validProducts.length) {
    return null;
  }

  return (
    <section>
      <h2 className="font-headline text-2xl font-bold tracking-tight md:text-3xl">
        También te podría gustar
      </h2>
      <Carousel
        opts={{ align: 'start', loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {validProducts.map((product) => {
            const hasDiscount = product.fullPrice && product.fullPrice > product.price;
            return (
              <CarouselItem key={product.id} className="basis-full pl-4 md:basis-1/2 lg:basis-1/3">
                <Link href={`/?id=${product.id}`}>
                  <CardContainer className="w-full">
                    <CardBody className="group/card relative flex h-[28rem] w-full flex-col justify-between rounded-xl border border-black/[0.1] p-6 hover:shadow-2xl dark:border-white/[0.2] dark:bg-black dark:hover:shadow-emerald-500/[0.1]">
                      <div>
                        <CardItem
                          translateZ="50"
                          className="text-xl font-bold text-neutral-600 dark:text-white"
                        >
                          {truncateTitle(product.title)}
                        </CardItem>
                        <CardItem
                          as="p"
                          translateZ="60"
                          className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
                        >
                          {product.brand}
                        </CardItem>
                        <CardItem translateZ="100" className="mt-4 w-full">
                            <div className="relative aspect-square h-60 w-full rounded-xl bg-white">
                              <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="rounded-xl object-contain group-hover/card:shadow-xl"
                                data-ai-hint="product fashion"
                              />
                            </div>
                        </CardItem>
                      </div>
                      <div className="mt-8 flex items-center justify-between">
                        <CardItem
                          translateZ={20}
                          as="div"
                          className="flex flex-col items-start px-4 py-2"
                        >
                          {hasDiscount ? (
                            <>
                              <span className="text-sm text-gray-500 line-through">
                                {formatPrice(product.fullPrice)}
                              </span>
                              <span className="text-lg font-bold text-primary">
                                {formatPrice(product.price)}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-primary">
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </CardItem>
                        <CardItem
                          translateZ={20}
                          as="button"
                          className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
                        >
                          Ver producto
                        </CardItem>
                      </div>
                    </CardBody>
                  </CardContainer>
                </Link>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="left-[-1.5rem]" />
        <CarouselNext className="right-[-1.5rem]" />
      </Carousel>
    </section>
  );
}

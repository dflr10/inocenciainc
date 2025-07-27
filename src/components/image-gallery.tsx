"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';
import { CardBody, CardContainer, CardItem } from './ui/3d-card';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  useEffect(() => {
    if (!mainApi) {
      return;
    }

    const handleSelect = (api: CarouselApi) => {
      if (api) {
        setCurrent(api.selectedScrollSnap());
        
        // Add is-active class to the current slide
        api.slideNodes().forEach((slide, index) => {
          if (index === api.selectedScrollSnap()) {
            slide.classList.add('is-active');
          } else {
            slide.classList.remove('is-active');
          }
        });
      }
    };
    
    mainApi.on("select", handleSelect);
    // Initial setup
    handleSelect(mainApi);

    return () => {
      mainApi.off("select", handleSelect);
    };
  }, [mainApi]);


  const handleThumbClick = (index: number) => {
    mainApi?.scrollTo(index);
    setCurrent(index);
  }

  if (!Array.isArray(images) || images.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <Card className="overflow-hidden rounded-lg shadow-lg">
          <CardContent className="relative aspect-square p-0">
            <Image
              src="https://placehold.co/600x600.png"
              alt="Imagen de marcador de posición"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
              priority
              data-ai-hint="placeholder"
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Carousel 
        plugins={[plugin.current]}
        opts={{ loop: true }}
        setApi={setMainApi} 
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
               <CardContainer className="w-full" containerClassName="py-0 pb-4">
                 <CardBody className="group/card relative flex h-full w-full flex-col justify-between rounded-xl border border-black/[0.1] bg-white p-8 hover:shadow-2xl dark:border-white/[0.2] dark:bg-black dark:hover:shadow-emerald-500/[0.1]">
                    <CardItem translateZ="100" className="mt-4 w-full">
                       <div className="relative aspect-square h-full w-full rounded-xl bg-white">
                        <Image
                          src={img}
                          alt={`${title} - imagen ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="rounded-xl object-contain group-hover/card:shadow-xl"
                          priority={index === 0}
                          data-ai-hint="product apparel"
                        />
                      </div>
                    </CardItem>
                  </CardBody>
                </CardContainer>
            </CarouselItem>
          ))}
        </CarouselContent>
         <CarouselPrevious className="left-4" />
         <CarouselNext className="right-4" />
      </Carousel>

      <div className="grid grid-cols-6 gap-2">
          {images.map((img, index) => (
              <Card 
                  key={index}
                  className={cn(
                      'overflow-hidden rounded-md cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105',
                      current === index ? 'ring-2 ring-primary ring-offset-2' : 'ring-1 ring-transparent hover:ring-primary/50'
                  )}
                  onClick={() => handleThumbClick(index)}
              >
                  <CardContent className="relative aspect-square p-0">
                  <Image
                      src={img}
                      alt={`Miniatura de ${title} ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 20vw, 10vw"
                      className="object-contain"
                      data-ai-hint="product apparel"
                  />
                  </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}

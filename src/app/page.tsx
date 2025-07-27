import ProductClientPage from '@/components/product-client-page';
import type { Product } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

async function getProductData(productId?: string): Promise<Product | null> {
  const id = productId || '125829257';
  try {
    const res = await fetch(
      `https://api-frontend-production.up.railway.app/api/products/${id}`
    );
    if (!res.ok) {
      console.error(`Failed to fetch product: ${res.status} ${res.statusText}`);
      return null;
    }
    const data = await res.json();
    const product = Array.isArray(data) ? data[0] : data;

    if (!product || !product.productId || !product.items || product.items.length === 0) {
      console.error('Invalid product data received:', product);
      return null;
    }

    const firstItem = product.items?.[0];
    if (!firstItem) return null;

    const imageUrl = firstItem.images?.[0]?.imageUrl;

    const availableColors = Array.from(new Set(product.items.map((item: any) => item.Color?.[0]).filter(Boolean)));
    const sizes = Array.from(new Set(product.items.map((item: any) => item.Talla?.[0]).filter(Boolean)));

    return {
      id: String(product.productId),
      sku: firstItem.itemId || '',
      title: product.productName || 'Sin título',
      brand: product.brand || 'Marca Desconocida',
      image: imageUrl || "https://placehold.co/600x600.png",
      images: firstItem.images?.map((img: any) => img.imageUrl).filter(Boolean) || [],
      price: firstItem.sellers?.[0]?.commertialOffer?.Price || 0,
      fullPrice: firstItem.sellers?.[0]?.commertialOffer?.ListPrice || 0,
      color: firstItem.Color?.[0] || 'No especificado',
      availableColors,
      sizes,
      details: product.description || '<p>No hay detalles disponibles.</p>',
      stock: firstItem.sellers?.[0]?.commertialOffer?.AvailableQuantity || 0,
    };
  } catch (error) {
    console.error('An error occurred while fetching product data:', error);
    return null;
  }
}

async function getRelatedProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      'https://api-frontend-production.up.railway.app/api/products?ft=tenis'
    );
    if (!res.ok) {
       console.error(`Failed to fetch related products: ${res.status} ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    if (!Array.isArray(data)) {
      console.error('Related products data is not an array:', data);
      return [];
    }

    const allProducts = data
      .filter(Boolean) 
      .map((product: any): Product | null => {
        if (!product || typeof product.productId === 'undefined' || !product.items || product.items.length === 0) {
          return null;
        }
        
        const firstItem = product.items[0];
        if (!firstItem) return null;

        const imageUrl = firstItem.images?.[0]?.imageUrl;
        const availableColors = Array.from(new Set(product.items.map((item: any) => item.Color?.[0]).filter(Boolean)));
        const sizes = Array.from(new Set(product.items.map((item: any) => item.Talla?.[0]).filter(Boolean)));
        
        return {
          id: String(product.productId),
          sku: firstItem.itemId || '',
          title: product.productName || 'Sin título',
          brand: product.brand || 'Marca Desconocida',
          image: imageUrl || "https://placehold.co/400x400.png",
          images: firstItem.images?.map((img: any) => img.imageUrl).filter(Boolean) || [],
          price: firstItem.sellers?.[0]?.commertialOffer?.Price || 0,
          fullPrice: firstItem.sellers?.[0]?.commertialOffer?.ListPrice || 0,
          color: firstItem.Color?.[0] || 'No especificado',
          availableColors,
          sizes,
          details: product.description || '<p>No hay detalles disponibles.</p>',
          stock: firstItem.sellers?.[0]?.commertialOffer?.AvailableQuantity || 0,
        };
      })
      .filter((p): p is Product => p !== null);

      return allProducts;

  } catch (error) {
    console.error('An error occurred while fetching related products:', error);
    return [];
  }
}

interface HomeProps {
  searchParams: {
    id?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const [product, relatedProducts] = await Promise.all([
    getProductData(searchParams.id),
    getRelatedProducts(),
  ]);

  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error al Cargar el Producto</AlertTitle>
          <AlertDescription>
            No pudimos cargar la información del producto. Por favor, inténtalo de nuevo más tarde.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const filteredRelatedProducts = product.id 
    ? relatedProducts.filter(p => p.id !== product.id)
    : relatedProducts;

  return (
    <ProductClientPage product={product} relatedProducts={filteredRelatedProducts} />
  );
}

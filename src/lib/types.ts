export interface Product {
  id: string;
  sku: string;
  title: string;
  brand: string;
  image: string;
  images: string[];
  price: number;
  fullPrice: number;
  color: string;
  availableColors: string[];
  sizes: string[];
  details: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

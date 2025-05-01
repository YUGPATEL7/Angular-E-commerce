export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  rating: number;
  reviews: any[];
  inStock: boolean;
}

export interface Review {
  id: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
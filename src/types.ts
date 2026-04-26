export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'dogs' | 'cats' | 'accessories' | 'wellness';
  image: string;
  description: string;
  isPopular?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

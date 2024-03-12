export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  colors: string[];
  category: string;
  company: string;
  priceAfterDiscount?: number;
  sold: number;
  user?: string;
}

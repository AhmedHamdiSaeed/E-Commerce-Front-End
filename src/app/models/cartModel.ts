export interface CartItem {
    product: string; 
    quantity: number;
    price: number; 
    _id: string; 
  }
  
  export interface Cart {
    _id: string; 
    cartItems: CartItem[];
    user: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    totalPrice: number; 
  }
  
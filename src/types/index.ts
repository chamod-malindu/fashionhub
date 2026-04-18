export interface Color {
  name: string;  
  hex: string;   
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Men' | 'Women' | 'Kids' | 'Other';
  image: string;      
  colors: Color[];
  sizes: string[];      // ["S", "M", "L", "XL", "XXL"]
  description?: string;
}

export interface CartItem {
  cartItemId: string;  
  productId: string;
  name: string;
  image: string;
  color: string;       
  size: string;     
  price: number;
  quantity: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
}


export interface Order {
  orderId: string;
  userId: string;
  items: CartItem[];
  deliveryFee: number;
  totalItems: number;    
  totalPayment: number;  
  status: 'paid';        
  createdAt: string;     
}

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };
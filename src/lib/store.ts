import { randomUUID } from 'crypto';
import type { Product, Cart, CartItem, Order } from '@/types';

export const products: Product[] = [
  {
    id: 'prod_001',
    name: 'Tagerine Shirt',
    price: 240.32,
    category: 'Men',
    image: '/images/Rectangle-980.png',
    colors: [
      { name: 'Yellow', hex: '#F5A623' },
      { name: 'Navy',   hex: '#1E3A5F' },
      { name: 'Grey',   hex: '#9CA3AF' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'A relaxed-fit shirt with a tropical print.',
  },
  {
    id: 'prod_002',
    name: 'Leather Coart',
    price: 325.36,
    category: 'Women',
    image: '/images/Rectangle-981.png',
    colors: [
      { name: 'Yellow', hex: '#F5A623' },
      { name: 'Black',  hex: '#111827' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A structured leather coat with clean tailoring.',
  },
  {
    id: 'prod_003',
    name: 'Tagerine Shirt',
    price: 126.47,
    category: 'Men',
    image: '/images/shirt-1.jpg',
    colors: [
      { name: 'Rust',   hex: '#C2410C' },
      { name: 'Yellow', hex: '#F5A623' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Casual short-sleeve shirt in a warm rust tone.',
  },
  {
    id: 'prod_004',
    name: 'Leather Coart',
    price: 257.85,
    category: 'Men',
    image: '/images/Rectangle-983.png',
    colors: [
      { name: 'Yellow', hex: '#F5A623' },
      { name: 'Grey',   hex: '#9CA3AF' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Tailored leather coat for a refined look.',
  },
  {
    id: 'prod_005',
    name: 'Premium Tagerine Shirt',
    price: 257.85,
    category: 'Men',
    image: '/images/shirt-2.jpg',
    colors: [
      { name: 'Yellow', hex: '#F5A623' },
      { name: 'Navy',   hex: '#1E3A5F' },
      { name: 'Grey',   hex: '#9CA3AF' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Our best-selling tropical print shirt in premium fabric.',
  },
];

// In-Memory Cart Store 

const carts = new Map<string, Cart>();

export function getCart(userId: string): Cart {
  if (!carts.has(userId)) {
    carts.set(userId, { userId, items: [] });
  }
  return carts.get(userId)!;
}

export function addToCart(
  userId: string,
  item: Omit<CartItem, 'cartItemId'>
): Cart {
  const cart = getCart(userId);

  const existing = cart.items.find(
    (i) =>
      i.productId === item.productId &&
      i.size === item.size &&
      i.color === item.color
  );

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.items.push({ ...item, cartItemId: randomUUID() });
  }

  return cart;
}

export function clearCart(userId: string): void {
  carts.set(userId, { userId, items: [] });
}

// In-Memory Order Store

const orders = new Map<string, Order>();

export function createOrder(userId: string, cart: Cart): Order {
  const DELIVERY_FEE = 12.00;
  const totalItems = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order: Order = {
    orderId: `#${Math.floor(100000 + Math.random() * 900000)}`,
    userId,
    items: [...cart.items],
    deliveryFee: DELIVERY_FEE,
    totalItems,
    totalPayment: totalItems + DELIVERY_FEE,
    status: 'paid', 
    createdAt: new Date().toISOString(),
  };

  orders.set(order.orderId, order);
  return order;
}
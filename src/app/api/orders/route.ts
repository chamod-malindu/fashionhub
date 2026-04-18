import { NextResponse } from 'next/server';
import { MOCK_USER_ID } from '@/lib/mock-auth';
import { getCart, createOrder, clearCart } from '@/lib/store';
import type { ApiResponse, Order } from '@/types';

export async function POST() {
  const cart = getCart(MOCK_USER_ID);

  if (cart.items.length === 0) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: 'Your cart is empty' },
      { status: 400 }
    );
  }

  const order = createOrder(MOCK_USER_ID, cart);
  clearCart(MOCK_USER_ID);

  return NextResponse.json<ApiResponse<Order>>(
    { success: true, data: order },
    { status: 201 }
  );
}
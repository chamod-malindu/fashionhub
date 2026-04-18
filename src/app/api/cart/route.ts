import { NextRequest, NextResponse } from 'next/server';
import { MOCK_USER_ID } from '@/lib/mock-auth';
import { getCart, addToCart } from '@/lib/store';
import type { ApiResponse, Cart } from '@/types';


export async function GET() {
  const cart = getCart(MOCK_USER_ID);

  return NextResponse.json<ApiResponse<Cart>>({
    success: true,
    data: cart,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { productId, name, image, color, size, price, quantity } = body;

  // Validate — never trust client input
  if (!productId || !name || !image || !color || !size || price == null) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: 'Missing required fields: productId, name, image, color, size, price' },
      { status: 400 }
    );
  }

  const updatedCart = addToCart(MOCK_USER_ID, {
    productId: String(productId),
    name: String(name),
    image: String(image),
    color: String(color),
    size: String(size),
    price: Number(price),
    quantity: Number(quantity) || 1,
  });

  return NextResponse.json<ApiResponse<Cart>>({
    success: true,
    data: updatedCart,
  });
}
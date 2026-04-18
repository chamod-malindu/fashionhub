'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, Trash2 } from 'lucide-react';
import OrderSummary from '@/components/OrderSummary';
import type { Cart, CartItem } from '@/types';

const DELIVERY_FEE = 12.00;

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      const res = await fetch('/api/cart');
      const json = await res.json();
      if (json.success) setCart(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCart(); }, []);

  const itemTotal = cart
    ? cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    : 0;

  const itemCount = cart
    ? cart.items.reduce((sum, i) => sum + i.quantity, 0)
    : 0;

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          className="w-10 h-10 flex items-center justify-center -ml-1"
        >
          <ArrowLeft size={24} color="#111827" strokeWidth={2} />
        </button>
        <span className="text-base font-semibold text-gray-900">Cart</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 px-5 overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-5">My Orders</h2>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !cart || cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-gray-400 text-sm">Your cart is empty</p>
            <button
              onClick={() => router.push('/explore')}
              className="text-orange-500 text-sm font-semibold"
            >
              Browse products →
            </button>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <div className="divide-y divide-gray-100">
              {cart.items.map((item: CartItem, index: number) => (
                <div key={item.cartItemId} className="flex gap-4 py-4">

                  {/* Thumbnail */}
                  <div className="relative w-[88px] h-[88px] rounded-2xl overflow-hidden bg-[#F0EBE3] shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-top"
                      sizes="88px"
                    />
                  </div>

                  {/* Item details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 leading-snug">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{item.color}</p>
                    <p className="text-xs text-gray-400">Size {item.size}</p>
                    <p className="text-base font-bold text-gray-900 mt-2">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Right side */}
                  <div className="flex flex-col items-end justify-between shrink-0">
                    {index === 1 ? (
                      <div className="flex gap-2 mt-auto">
                        <button
                          aria-label="Save for later"
                          className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center"
                        >
                          <Heart size={16} color="white" fill="white" />
                        </button>
                        <button
                          aria-label="Remove item"
                          className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center"
                        >
                          <Trash2 size={16} color="white" strokeWidth={2} />
                        </button>
                      </div>
                    ) : (
                      <p className="text-base font-bold text-gray-900 mt-auto">
                        {item.quantity}x
                      </p>
                    )}
                  </div>

                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="mt-2 mb-8">
              <OrderSummary
                itemCount={itemCount}
                itemTotal={itemTotal}
                deliveryFee={DELIVERY_FEE}
              />
            </div>
          </>
        )}
      </div>

      {/* Checkout Now button */}
      {cart && cart.items.length > 0 && (
        <div className="px-5 py-6 border-t border-gray-100">
          <button
            onClick={() => router.push('/checkout')}
            className="w-full py-4 rounded-full bg-orange-500 text-white font-semibold text-sm"
          >
            Checkout Now
          </button>
        </div>
      )}

    </div>
  );
}
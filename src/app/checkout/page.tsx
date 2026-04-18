'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Clock, Check } from 'lucide-react';
import OrderSummary from '@/components/OrderSummary';
import type { Cart, Order } from '@/types';

const DELIVERY_FEE = 12.00;

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [paying, setPaying] = useState(false);
  const [voucher, setVoucher] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/cart');
        const json = await res.json();
        if (json.success) setCart(json.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  const itemTotal = cart
    ? cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    : 0;

  const itemCount = cart
    ? cart.items.reduce((sum, i) => sum + i.quantity, 0)
    : 0;

  const handlePayNow = async () => {
    setPaying(true);
    try {
      const res = await fetch('/api/orders', { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        setOrder(json.data);
      } else {
        alert(json.error ?? 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      alert('Could not connect to the server');
    } finally {
      setPaying(false);
    }
  };

  // Order success screen 
  if (order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-8 gap-6 bg-white text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <Check size={36} color="#22C55E" strokeWidth={2.5} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">Order Placed!</h2>
          <p className="text-sm text-gray-400 mt-2">
            Your order ID is{' '}
            <span className="font-bold text-gray-900">{order.orderId}</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Payment simulated successfully ✓
          </p>
          <p className="text-sm font-semibold text-gray-900 mt-3">
            Total paid: ${order.totalPayment.toFixed(2)}
          </p>
        </div>

        <button
          onClick={() => router.push('/explore')}
          className="w-full py-4 rounded-full bg-orange-500 text-white font-semibold text-sm"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // Main checkout UI 
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
        <span className="text-base font-semibold text-gray-900">Checkout</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 space-y-6 pb-6">

        {/* Delivery Address */}
        <section>
          <p className="text-xs text-gray-400 mb-3">Delivery Address</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Map pin icon */}
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <MapPin size={24} color="#22C55E" fill="#22C55E" strokeWidth={0} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 leading-snug">
                  25/3 Housing Estate,
                </p>
                <p className="text-sm font-semibold text-gray-900">Sylhet</p>
              </div>
            </div>
            <button className="text-sm text-gray-400 font-medium">Change</button>
          </div>

          {/* Delivery time */}
          <div className="flex items-center gap-2 mt-4">
            <Clock size={16} color="#9CA3AF" strokeWidth={1.5} />
            <p className="text-sm text-gray-500">Delivered in next 7 days</p>
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* Payment Method */}
        <section>
          <p className="text-xs text-gray-400 mb-4">Payment Method</p>
          <div className="flex items-center gap-4 flex-wrap">
            {/* VISA */}
            <span className="text-[#1A1F71] font-extrabold text-lg tracking-tight">
              VISA
            </span>
            {/* AMERICAN EXPRESS */}
            <div className="bg-[#2E77BC] rounded px-1.5 py-0.5">
              <p className="text-white text-[7px] font-bold leading-tight tracking-tight">
                AMERICAN<br />EXPRESS
              </p>
            </div>
            {/* Mastercard */}
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-red-500 opacity-90" />
              <div className="w-7 h-7 rounded-full bg-yellow-400 opacity-90" />
            </div>
            {/* PayPal */}
            <span className="text-sm font-bold">
              <span className="text-[#003087]">Pay</span>
              <span className="text-[#009CDE]">Pal</span>
            </span>
            {/* Apple Pay */}
            <span className="text-sm font-semibold text-gray-900">
              Apple Pay
            </span>
          </div>
        </section>

        {/* Add Voucher */}
        <input
          type="text"
          value={voucher}
          onChange={(e) => setVoucher(e.target.value)}
          placeholder="Add Voucher"
          className="w-full border border-gray-200 rounded-2xl px-4 py-4 text-sm text-gray-400 placeholder-gray-300 text-center focus:outline-none focus:border-orange-300"
        />

        {/* Note */}
        <p className="text-xs leading-relaxed">
          <span className="text-red-500 font-semibold">Note : </span>
          <span className="text-gray-500">
            Use your order id at the payment. Your Id will appear after you
            place the order. If you forget to include your order id we
            can&apos;t confirm the payment.
          </span>
        </p>

        {/* Order Summary */}
        <OrderSummary
          itemCount={itemCount}
          itemTotal={itemTotal}
          deliveryFee={DELIVERY_FEE}
        />

      </div>

      {/* Pay Now button */}
      <div className="px-5 py-6 border-t border-gray-100">
        <button
          onClick={handlePayNow}
          disabled={paying || !cart || cart.items.length === 0}
          className="w-full py-4 rounded-full bg-orange-500 text-white font-semibold text-sm disabled:opacity-60"
        >
          {paying ? 'Processing...' : 'Pay Now'}
        </button>
      </div>

    </div>
  );
}
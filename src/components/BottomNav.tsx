'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Home, Search, ShoppingBag, Settings } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);

  // Load cart count
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/cart');
        const json = await res.json();
        if (json.success) {
          const count = (json.data?.items ?? []).reduce(
            (sum: number, i: { quantity: number }) => sum + i.quantity,
            0
          );
          setCartCount(count);
        }
      } catch { 
        
      }
    };
    load();
  }, [pathname]); 

  const tabs = [
    {
      href: '/explore',
      label: 'Home',
      icon: (active: boolean) => (
        <Home size={22} color={active ? '#F97316' : '#9CA3AF'} fill={active ? '#F97316' : 'none'} />
      ),
    },
    {
      href: '/search',
      label: 'Search',
      icon: (active: boolean) => (
        <Search size={22} color={active ? '#F97316' : '#9CA3AF'} strokeWidth={2} />
      ),
    },
    {
      href: '/cart',
      label: 'Cart',
      icon: (active: boolean) => (
        <div className="relative">
          <ShoppingBag size={22} color={active ? '#F97316' : '#9CA3AF'} strokeWidth={2} />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-orange-500 text-white text-[9px] font-bold flex items-center justify-center">
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </div>
      ),
    },
    {
      href: '/settings',
      label: 'Settings',
      icon: (active: boolean) => (
        <Settings size={22} color={active ? '#F97316' : '#9CA3AF'} strokeWidth={2} />
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-gray-100 px-8 py-3 z-50">
      <div className="flex justify-between items-center">
        {tabs.map(({ href, label, icon }) => {
          const active = pathname === href || pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 min-w-[44px]"
            >
              {icon(active)}
              <span
                className={`text-[10px] font-medium leading-none ${
                  active ? 'text-orange-500' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
              {active && (
                <span className="w-1 h-1 rounded-full bg-orange-500" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
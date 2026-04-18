import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FashionHub",
  description: "Find the best trendy collections",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Centre the mobile layout on desktop */}
        <div className="min-h-screen bg-gray-100 flex justify-center">
          <div className="w-full max-w-[390px] bg-white min-h-screen relative">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

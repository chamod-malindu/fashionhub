import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
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
    <html lang="en" className={nunito.className}>
      <body>
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

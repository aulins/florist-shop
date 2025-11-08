"use client";

import Link from "next/link";
import { Flower2, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function Header() {
    const items = useCartStore((state) => state.items);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-pink-100">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <img src="/logo.png" alt="Florist Logo" className="h-16 md:h-20 w-auto object-contain hover:scale-105 transition-transform duration-300" />
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-gray-700 hover:text-pink-500 transition text-lg font-medium relative group">
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 group-hover:w-full transition-all duration-300" />
                        </Link>
                        <Link href="/#products" className="text-gray-700 hover:text-pink-500 transition text-lg font-medium relative group">
                            Products
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 group-hover:w-full transition-all duration-300" />
                        </Link>
                        <Link href="/#about" className="text-gray-700 hover:text-pink-500 transition text-lg font-medium relative group">
                            About
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 group-hover:w-full transition-all duration-300" />
                        </Link>
                    </nav>

                    {/* Cart Button */}
                    <Link
                        href="/checkout"
                        className="relative bg-gradient-to-r from-pink-400 to-rose-400 text-white px-6 py-3 rounded-full hover:from-pink-500 hover:to-rose-500 transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2 group"
                    >
                        <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
                        <span className="font-semibold">Cart</span>
                        {totalItems > 0 && <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">{totalItems}</span>}
                    </Link>
                </div>
            </div>
        </header>
    );
}

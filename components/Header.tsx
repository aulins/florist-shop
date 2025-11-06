"use client";

import Link from "next/link";
import { Flower2 } from "lucide-react";
import CartButton from "./CartButton";

export default function Header() {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-pink-600">
                        <Flower2 className="w-8 h-8" />
                        <span>Florist Shop</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-gray-700 hover:text-pink-600 transition">
                            Home
                        </Link>
                        <Link href="/#products" className="text-gray-700 hover:text-pink-600 transition">
                            Products
                        </Link>
                        <Link href="/#about" className="text-gray-700 hover:text-pink-600 transition">
                            About
                        </Link>
                    </nav>

                    <CartButton />
                </div>
            </div>
        </header>
    );
}

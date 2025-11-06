"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import Cart from "./Cart";

export default function CartButton() {
    const [isOpen, setIsOpen] = useState(false);
    const getTotalItems = useCartStore((state) => state.getTotalItems);
    const totalItems = getTotalItems();

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="relative p-2 hover:bg-gray-100 rounded-full transition">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{totalItems}</span>}
            </button>

            <Cart isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}

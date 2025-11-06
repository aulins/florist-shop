"use client";

import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem);
    const router = useRouter();

    const handleAddToCart = () => {
        addItem(product);
        toast.success(`${product.name} added to cart!`);
    };

    const handleBuyNow = () => {
        addItem(product);
        router.push("/checkout");
    };

    return (
        <div className="flex gap-4">
            <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-pink-100 text-pink-600 py-4 rounded-lg font-semibold hover:bg-pink-200 transition disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
            </button>

            <button onClick={handleBuyNow} disabled={product.stock === 0} className="flex-1 bg-pink-600 text-white py-4 rounded-lg font-semibold hover:bg-pink-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed">
                Buy Now
            </button>
        </div>
    );
}

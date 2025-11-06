"use client";

import { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem(product);
        toast.success(`${product.name} added to cart!`);
    };

    return (
        <Link href={`/products/${product.id}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                    <Image src={product.image_url} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute top-2 right-2 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold">{product.category}</div>
                </div>

                <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-pink-600 transition">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-pink-600">{formatCurrency(product.price)}</p>
                            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                        </div>

                        <button onClick={handleAddToCart} disabled={product.stock === 0} className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed">
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}

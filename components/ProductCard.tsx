"use client";

import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);
    const [isLiked, setIsLiked] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem(product);
        toast.success(
            <div className="flex items-center gap-2">
                <span>✨</span>
                <span>{product.name} added to cart!</span>
            </div>,
            {
                style: {
                    background: "#fce7f3",
                    color: "#9f1239",
                    border: "1px solid #fbcfe8",
                },
            }
        );
    };

    const formatCurrency = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <Link href={`/products/${product.id}`}>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-pink-100 hover:border-pink-300">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-pink-50 to-rose-50">
                    <Image src={product.image_url} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xs font-semibold rounded-full shadow-lg">{product.category}</span>
                    </div>

                    {/* Like Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setIsLiked(!isLiked);
                        }}
                        className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg"
                        aria-label="Like product"
                    >
                        <Heart className={`w-5 h-5 transition-all duration-300 ${isLiked ? "fill-pink-500 text-pink-500 scale-110" : "text-gray-400"}`} />
                    </button>

                    {/* Stock Badge */}
                    {product.stock < 5 && product.stock > 0 && (
                        <div className="absolute bottom-3 left-3">
                            <span className="px-3 py-1 bg-rose-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">Only {product.stock} left!</span>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-pink-500 transition-colors line-clamp-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">{formatCurrency(product.price)}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                Stock: <span className={product.stock < 5 ? "text-rose-500 font-semibold" : ""}>{product.stock}</span>
                            </p>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className="bg-gradient-to-r from-pink-400 to-rose-400 text-white p-3 rounded-full hover:from-pink-500 hover:to-rose-500 transition-all duration-300 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed hover:scale-110 shadow-lg disabled:shadow-none"
                        >
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-200/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
            </div>
        </Link>
    );
}

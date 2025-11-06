"use client";

import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
    const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
    const total = getTotalPrice();

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />

            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold">Shopping Cart</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <ShoppingBag className="w-16 h-16 mb-4" />
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-lg">
                                    <div className="relative w-20 h-20 flex-shrink-0">
                                        <Image src={item.image_url} alt={item.name} fill className="object-cover rounded" />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-semibold text-sm">{item.name}</h3>
                                        <p className="text-pink-600 font-bold">{formatCurrency(item.price)}</p>

                                        <div className="flex items-center gap-2 mt-2">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-white rounded">
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-white rounded">
                                                <Plus className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => removeItem(item.id)} className="ml-auto p-1 hover:bg-red-50 text-red-600 rounded">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t p-4 space-y-4">
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total:</span>
                            <span className="text-pink-600">{formatCurrency(total)}</span>
                        </div>

                        <Link href="/checkout" onClick={onClose} className="block w-full bg-pink-600 text-white text-center py-3 rounded-lg hover:bg-pink-700 transition font-semibold">
                            Checkout
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}

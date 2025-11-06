"use client";

import { CheckCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order_id");

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto text-center">
                <div className="mb-6 flex justify-center">
                    <CheckCircle className="w-24 h-24 text-green-500" />
                </div>

                <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>

                <p className="text-gray-600 mb-2">Thank you for your order</p>

                {orderId && <p className="text-sm text-gray-500 mb-8">Order ID: {orderId}</p>}

                <p className="text-gray-600 mb-8">We&apos;ll send you a confirmation email shortly. Your beautiful flowers will be delivered soon!</p>

                <button onClick={() => router.push("/")} className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition">
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}

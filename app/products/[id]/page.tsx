import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import AddToCartButton from "./AddToCartButton";

async function getProduct(id: string) {
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single();

    if (error || !data) {
        return null;
    }

    return data as Product;
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id);

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image src={product.image_url} alt={product.name} fill className="object-cover" priority />
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="mb-4">
                            <span className="inline-block bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-sm font-semibold">{product.category}</span>
                        </div>

                        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                        <p className="text-3xl font-bold text-pink-600 mb-6">{formatCurrency(product.price)}</p>

                        <p className="text-gray-600 mb-6 text-lg leading-relaxed">{product.description}</p>

                        <div className="mb-6">
                            <p className="text-gray-700">
                                <span className="font-semibold">Stock:</span> {product.stock > 0 ? <span className="text-green-600">{product.stock} available</span> : <span className="text-red-600">Out of stock</span>}
                            </p>
                        </div>

                        <AddToCartButton product={product} />

                        <div className="mt-8 border-t pt-8">
                            <h3 className="font-bold mb-4">Product Details</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>✓ Bunga segar pilihan berkualitas tinggi</li>
                                <li>✓ Dikemas dengan rapi dan cantik</li>
                                <li>✓ Gratis kartu ucapan</li>
                                <li>✓ Pengiriman same-day available</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

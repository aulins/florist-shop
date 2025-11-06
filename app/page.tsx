import { supabase } from "@/lib/supabase";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/types";
import { Flower2, Heart, Truck, Shield } from "lucide-react";

async function getProducts() {
    const { data, error } = await supabase.from("products").select("*").eq("is_active", true).order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching products:", error);
        return [];
    }

    return data as Product[];
}

export default async function Home() {
    const products = await getProducts();

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl font-bold mb-6 text-gray-900">Beautiful Flowers for Every Occasion</h1>
                        <p className="text-xl text-gray-600 mb-8">Handcrafted bouquets and buckets made with love and fresh flowers</p>
                        <a href="#products" className="inline-block bg-pink-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-pink-700 transition">
                            Shop Now
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="inline-block p-4 bg-pink-100 rounded-full mb-4">
                                <Flower2 className="w-8 h-8 text-pink-600" />
                            </div>
                            <h3 className="font-bold mb-2">Fresh Flowers</h3>
                            <p className="text-gray-600 text-sm">100% bunga segar pilihan</p>
                        </div>

                        <div className="text-center">
                            <div className="inline-block p-4 bg-pink-100 rounded-full mb-4">
                                <Heart className="w-8 h-8 text-pink-600" />
                            </div>
                            <h3 className="font-bold mb-2">Handcrafted</h3>
                            <p className="text-gray-600 text-sm">Dibuat dengan penuh cinta</p>
                        </div>

                        <div className="text-center">
                            <div className="inline-block p-4 bg-pink-100 rounded-full mb-4">
                                <Truck className="w-8 h-8 text-pink-600" />
                            </div>
                            <h3 className="font-bold mb-2">Fast Delivery</h3>
                            <p className="text-gray-600 text-sm">Pengiriman cepat & aman</p>
                        </div>

                        <div className="text-center">
                            <div className="inline-block p-4 bg-pink-100 rounded-full mb-4">
                                <Shield className="w-8 h-8 text-pink-600" />
                            </div>
                            <h3 className="font-bold mb-2">Secure Payment</h3>
                            <p className="text-gray-600 text-sm">Pembayaran terpercaya</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section id="products" className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Our Products</h2>
                        <p className="text-gray-600">Pilih bucket atau bouquet favorit Anda</p>
                    </div>

                    {products.length === 0 ? <p className="text-center text-gray-500">No products available</p> : <ProductGrid products={products} />}
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6">About Us</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Florist Shop adalah toko bunga yang menyediakan berbagai macam bucket dan bouquet bunga segar untuk berbagai acara spesial Anda. Setiap rangkaian dibuat dengan penuh cinta dan perhatian terhadap detail untuk
                            memberikan pengalaman terbaik bagi pelanggan kami.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

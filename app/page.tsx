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
        <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 py-24">
                {/* Sparkle Animated Background */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    {/* Layer warna transparan glass effect */}
                    <div className="absolute inset-0 bg-white/30 backdrop-blur-2xl" />

                    {/* Sparkle bokeh bergerak */}
                    {[...Array(25)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-pink-300/40 rounded-full animate-sparkle"
                            style={{
                                width: `${Math.random() * 4 + 2}px`,
                                height: `${Math.random() * 4 + 2}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${Math.random() * 6 + 6}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="max-w-3xl mx-auto bg-white/40 backdrop-blur-md rounded-2xl p-10 shadow-lg border border-pink-200/40 animate-fade-up">
                        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">Beautiful Flowers for Every Occasion</h1>
                        <p className="text-xl text-gray-700 mb-8">
                            Handcrafted bouquets and gifts made with <span className="text-pink-400 animate-pulse">💖</span>
                        </p>
                        <a
                            href="#products"
                            className="inline-block bg-gradient-to-r from-pink-400 to-rose-400 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-pink-500 hover:to-rose-500 transition transform hover:scale-105 shadow-lg"
                        >
                            Shop Now
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center group hover:scale-105 transition-transform duration-300">
                            <div className="inline-block p-4 bg-pink-100 rounded-full mb-4 group-hover:bg-pink-200 transition-colors">
                                <Flower2 className="w-8 h-8 text-pink-500" />
                            </div>
                            <h3 className="font-bold mb-2 text-gray-800">Fresh Flowers</h3>
                            <p className="text-gray-600 text-sm">100% bunga segar pilihan</p>
                        </div>

                        <div className="text-center group hover:scale-105 transition-transform duration-300">
                            <div className="inline-block p-4 bg-pink-100 rounded-full mb-4 group-hover:bg-pink-200 transition-colors">
                                <Heart className="w-8 h-8 text-pink-500" />
                            </div>
                            <h3 className="font-bold mb-2 text-gray-800">Handcrafted</h3>
                            <p className="text-gray-600 text-sm">Dibuat dengan penuh cinta</p>
                        </div>

                        <div className="text-center group hover:scale-105 transition-transform duration-300">
                            <div className="inline-block p-4 bg-pink-100 rounded-full mb-4 group-hover:bg-pink-200 transition-colors">
                                <Truck className="w-8 h-8 text-pink-500" />
                            </div>
                            <h3 className="font-bold mb-2 text-gray-800">Fast Delivery</h3>
                            <p className="text-gray-600 text-sm">Pengiriman cepat & aman</p>
                        </div>

                        <div className="text-center group hover:scale-105 transition-transform duration-300">
                            <div className="inline-block p-4 bg-pink-100 rounded-full mb-4 group-hover:bg-pink-200 transition-colors">
                                <Shield className="w-8 h-8 text-pink-500" />
                            </div>
                            <h3 className="font-bold mb-2 text-gray-800">Secure Payment</h3>
                            <p className="text-gray-600 text-sm">Pembayaran terpercaya</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section id="products" className="py-16 bg-gradient-to-b from-white to-pink-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">Our Products</h2>
                        <p className="text-gray-600">Pilih bucket atau bouquet favorit Anda</p>
                    </div>

                    {products.length === 0 ? <p className="text-center text-gray-500">No products available</p> : <ProductGrid products={products} />}
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">About Us</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            HeyGifts Fleur adalah toko bunga yang menyediakan berbagai macam bouquet bunga untuk berbagai acara spesial Anda. Setiap rangkaian dibuat dengan penuh cinta dan perhatian terhadap detail untuk memberikan
                            pengalaman terbaik bagi pelanggan kami.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

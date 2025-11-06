import { Flower2, Instagram, Facebook, Mail, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Flower2 className="w-8 h-8 text-pink-400" />
                            <span className="text-xl font-bold">Florist Shop</span>
                        </div>
                        <p className="text-gray-400">Menyediakan berbagai macam bucket dan bouquet bunga segar untuk berbagai acara spesial Anda.</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4">Contact</h3>
                        <div className="space-y-2 text-gray-400">
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span>+62 812-3456-7890</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span>hello@floristshop.com</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-pink-400 transition">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="hover:text-pink-400 transition">
                                <Facebook className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 Florist Shop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Florist Shop - Beautiful Flower Bouquets & Buckets",
    description: "Order fresh flower bouquets and buckets for any occasion",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />
                <Toaster position="top-right" />
            </body>
        </html>
    );
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    image_url: string;
    is_active: boolean;
    created_at: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Customer {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface Order {
    id: string;
    order_number: string;
    customer_id: string;
    total_amount: number;
    status: string;
    payment_status: string;
    shipping_address: string;
    notes: string;
    created_at: string;
}

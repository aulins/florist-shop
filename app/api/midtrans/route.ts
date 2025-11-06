import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateOrderNumber } from "@/lib/utils";

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY!;
const MIDTRANS_API_URL = "https://app.sandbox.midtrans.com/snap/v1/transactions";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { customer, items, total } = body;

        // 1. Create customer in database
        const { data: customerData, error: customerError } = await supabase
            .from("customers")
            .upsert(
                {
                    email: customer.email,
                    name: customer.name,
                    phone: customer.phone,
                    address: customer.address,
                },
                {
                    onConflict: "email",
                }
            )
            .select()
            .single();

        if (customerError) throw customerError;

        // 2. Create order
        const orderNumber = generateOrderNumber();

        const { data: orderData, error: orderError } = await supabase
            .from("orders")
            .insert({
                customer_id: customerData.id,
                order_number: orderNumber,
                total_amount: total,
                shipping_address: customer.address,
                notes: customer.notes || "",
            })
            .select()
            .single();

        if (orderError) throw orderError;

        // 3. Create order items
        const orderItems = items.map((item: any) => ({
            order_id: orderData.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.price * item.quantity,
        }));

        const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

        if (itemsError) throw itemsError;

        // 4. Create Midtrans transaction
        const midtransPayload = {
            transaction_details: {
                order_id: orderNumber,
                gross_amount: total,
            },
            customer_details: {
                first_name: customer.name,
                email: customer.email,
                phone: customer.phone,
            },
            item_details: items.map((item: any) => ({
                id: item.product_id,
                name: item.product_name,
                price: item.price,
                quantity: item.quantity,
            })),
        };

        const midtransResponse = await fetch(MIDTRANS_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + Buffer.from(MIDTRANS_SERVER_KEY + ":").toString("base64"),
            },
            body: JSON.stringify(midtransPayload),
        });

        const midtransData = await midtransResponse.json();

        if (!midtransResponse.ok) {
            throw new Error("Midtrans error: " + JSON.stringify(midtransData));
        }

        return NextResponse.json({
            token: midtransData.token,
            order_id: orderNumber,
            redirect_url: midtransData.redirect_url,
        });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 });
    }
}

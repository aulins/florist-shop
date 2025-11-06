import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY!;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Verify signature
        const { order_id, status_code, gross_amount, signature_key } = body;
        const mySignature = crypto.createHash("sha512").update(`${order_id}${status_code}${gross_amount}${MIDTRANS_SERVER_KEY}`).digest("hex");

        if (mySignature !== signature_key) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
        }

        // Update order status
        const { transaction_status, order_id: orderNumber } = body;

        let paymentStatus = "unpaid";
        let orderStatus = "pending";

        if (transaction_status === "capture" || transaction_status === "settlement") {
            paymentStatus = "paid";
            orderStatus = "processing";
        } else if (transaction_status === "pending") {
            paymentStatus = "unpaid";
            orderStatus = "pending";
        } else if (transaction_status === "deny" || transaction_status === "expire" || transaction_status === "cancel") {
            paymentStatus = "failed";
            orderStatus = "cancelled";
        }

        // Update order
        await supabase
            .from("orders")
            .update({
                payment_status: paymentStatus,
                status: orderStatus,
                updated_at: new Date().toISOString(),
            })
            .eq("order_number", orderNumber);

        // Save payment record
        await supabase.from("payments").insert({
            midtrans_order_id: orderNumber,
            transaction_id: body.transaction_id,
            gross_amount: parseFloat(gross_amount),
            payment_type: body.payment_type,
            transaction_status: transaction_status,
            transaction_time: body.transaction_time,
        });

        return NextResponse.json({ message: "Notification processed" });
    } catch (error) {
        console.error("Notification error:", error);
        return NextResponse.json({ error: "Failed to process notification" }, { status: 500 });
    }
}

// app/api/mollie/prepare/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const orderData = await req.json();

    // Basic validation
    if (!orderData.email || !orderData.items?.length) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    const supabase = createClient();
    const tempId = uuidv4();

    const { error } = await (await supabase)
      .from("temp_pending_orders")
      .insert({
        id: tempId,
        order_data: orderData,
        expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
      });

    if (error) throw error;

    return NextResponse.json({ tempId });
  } catch (err: any) {
    console.error("Prepare order error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
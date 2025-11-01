

// import { NextResponse } from "next/server";
// import createMollieClient from "@mollie/api-client";
// import { createClient } from "@/utils/supabase/server";

// export async function POST(req: Request) {
//   try {
//     const mollie = createMollieClient({
//       apiKey: process.env.MOLLIE_API_KEY!,
//     });
//     const supabase = createClient();

//     const formData = await req.formData();
//     const paymentId = formData.get("id") as string;
//     if (!paymentId) return NextResponse.json({ error: "Missing payment ID" }, { status: 400 });

//     const payment = await mollie.payments.get(paymentId);
//     const metadata = payment.metadata as any;
//     const orderData = metadata?.orderData;

//     if (!orderData) {
//       console.warn("⚠️ No order data in metadata for payment:", paymentId);
//       return NextResponse.json({ message: "No order data" });
//     }

//     // Check if order already exists (avoid duplicates)
//     const { data: existing } = await (await supabase)
//       .from("orders")
//       .select("id")
//       .eq("payment_id", paymentId)
//       .single();

//     // Map Mollie → Admin status
//     let mappedStatus = "pending";
//     switch (payment.status) {
//       case "paid":
//         mappedStatus = "processing";
//         break;
//       case "failed":
//       case "expired":
//       case "canceled":
//         mappedStatus = "cancelled";
//         break;
//       default:
//         mappedStatus = "pending";
//     }

//     if (!existing && payment.status === "paid") {
//       // ✅ Insert new order only after successful payment
//       await (await supabase).from("orders").insert({
//         email: orderData.email,
//         first_name: orderData.firstName,
//         last_name: orderData.lastName,
//         phone: orderData.phone,
//         shipping_address: orderData.shippingAddress,
//         shipping_city: orderData.shippingCity,
//         shipping_postcode: orderData.shippingPostcode,
//         shipping_country: orderData.shippingCountry,
//         billing_address: orderData.billingIsSame
//           ? orderData.shippingAddress
//           : orderData.billingAddress,
//         billing_city: orderData.billingIsSame
//           ? orderData.shippingCity
//           : orderData.billingCity,
//         billing_postcode: orderData.billingIsSame
//           ? orderData.shippingPostcode
//           : orderData.billingPostcode,
//         billing_country: orderData.billingIsSame
//           ? orderData.shippingCountry
//           : orderData.billingCountry,
//         payment_method: "mollie",
//         delivery_method: orderData.deliveryMethod,
//         special_instructions: orderData.specialInstructions,
//         subtotal: Number(orderData.totals?.subtotal || 0),
//         delivery_fee: Number(orderData.totals?.deliveryFee || 0),
//         total: Number(orderData.totals?.total || 0),
//         status: mappedStatus,
//         items: orderData.items || [],
//         payment_id: paymentId,
//       });
//     } else if (existing) {
//       // ✅ Update existing order status if already inserted
//       await (await supabase).from("orders").update({ status: mappedStatus }).eq("payment_id", paymentId);
//     }

//     return new Response("OK", { status: 200 });
//   } catch (err: any) {
//     console.error("❌ Mollie webhook error:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// app/api/mollie/webhooks/mollie/route.ts
import { NextResponse } from "next/server";
import createMollieClient from "@mollie/api-client";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const mollie = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY! });
    const supabase = createClient();

    const formData = await req.formData();
    const paymentId = formData.get("id") as string;
    if (!paymentId) return NextResponse.json({ error: "Missing payment ID" }, { status: 400 });

    const payment = await mollie.payments.get(paymentId);
    const { tempId } = payment.metadata as { tempId: string };

    if (!tempId) {
      console.warn("No tempId in metadata for payment:", paymentId);
      return new Response("OK", { status: 200 });
    }

    // Fetch temp order
    const { data: tempOrder, error } = await (await supabase)
      .from("temp_pending_orders")
      .select("order_data, payment_id")
      .eq("id", tempId)
      .single();

    if (error || !tempOrder) {
      console.warn("Temp order not found or expired:", tempId);
      return new Response("OK", { status: 200 });
    }

    // Prevent duplicate processing
    if (tempOrder.payment_id && tempOrder.payment_id !== paymentId) {
      return new Response("OK", { status: 200 });
    }

    let status = "pending";
    if (payment.status === "paid") status = "processing";
    else if (["failed", "expired", "canceled"].includes(payment.status)) status = "cancelled";

    if (payment.status === "paid") {
      const orderData = tempOrder.order_data;

      // Insert final order
      const { error: insertError } = await (await supabase).from("orders").insert({
        email: orderData.email,
        first_name: orderData.firstName,
        last_name: orderData.lastName,
        phone: orderData.phone,
        shipping_address: orderData.shippingAddress,
        shipping_city: orderData.shippingCity,
        shipping_postcode: orderData.shippingPostcode,
        shipping_country: orderData.shippingCountry,
        billing_address: orderData.billingIsSame
          ? orderData.shippingAddress
          : orderData.billingAddress,
        billing_city: orderData.billingIsSame
          ? orderData.shippingCity
          : orderData.billingCity,
        billing_postcode: orderData.billingIsSame
          ? orderData.shippingPostcode
          : orderData.billingPostcode,
        billing_country: orderData.billingIsSame
          ? orderData.shippingCountry
          : orderData.billingCountry,
        payment_method: "mollie",
        delivery_method: orderData.deliveryMethod,
        special_instructions: orderData.specialInstructions,
        subtotal: Number(orderData.totals.subtotal),
        delivery_fee: Number(orderData.totals.deliveryFee),
        total: Number(orderData.totals.total),
        status,
        items: orderData.items,
        payment_id: paymentId,
      });

      if (insertError) throw insertError;
    }

    // Always delete temp order
    await (await supabase).from("temp_pending_orders").delete().eq("id", tempId);

    return new Response("OK", { status: 200 });
  } catch (err: any) {
    console.error("Mollie webhook error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
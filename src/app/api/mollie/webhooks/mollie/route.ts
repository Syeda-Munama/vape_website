// import { NextResponse, type NextRequest } from "next/server"
// import createMollieClient from "@mollie/api-client"
// import { createClient } from "@/utils/supabase/server"

// // Mollie sends application/x-www-form-urlencoded body: "id=tr_xxxxx"
// export async function POST(req: NextRequest) {
//   try {
//     const apiKey = "test_7WdG67fGEyQWcS4gu2HKUtfzqw5hJv" 
//     if (!apiKey) {
//       return NextResponse.json({ error: "Missing MOLLIE_API_KEY" }, { status: 500 })
//     }

//     const raw = await req.text()
//     const id = new URLSearchParams(raw).get("id")
//     if (!id) {
//       return NextResponse.json({ error: "Missing payment id" }, { status: 400 })
//     }

//     const client = createMollieClient({ apiKey })
//     const payment = await client.payments.get(id)

//     // Map Mollie status to our order status
//     let newStatus: string | null = null
//     if (payment.status === "paid") newStatus = "paid"
//     else if (payment.status === "canceled") newStatus = "cancelled"
//     else if (payment.status === "failed" || payment.status === "expired") newStatus = "failed"
//     else if (payment.status === "authorized" || payment.status === "pending") newStatus = null // keep pending

//     if (newStatus) {
//       const supabase = createClient()
//       const updates: Record<string, any> = {
//         status: newStatus,
//         // store payment id into existing field used previously for intent id
//         stripe_payment_intent_id: payment.id,
//       }
//       await (await supabase).from("orders").update(updates).eq("stripe_session_id", id).eq("status", "pending")
//     }

//     return NextResponse.json({ received: true })
//   } catch (e: any) {
//     console.error("Mollie webhook error:", e)
//     return NextResponse.json({ error: e.message || "Server error" }, { status: 500 })
//   }
// }

import { NextResponse, type NextRequest } from "next/server";
import createMollieClient from "@mollie/api-client";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  try {
    // Read raw form data quickly
    const raw = await req.text();
    const id = new URLSearchParams(raw).get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing payment id" }, { status: 400 });
    }

    // ✅ Respond immediately so Mollie doesn't time out
    const immediateResponse = NextResponse.json({ received: true });

    // Do the heavy logic asynchronously (no await before return)
    (async () => {
      const apiKey = process.env.MOLLIE_API_KEY;
      if (!apiKey) {
        console.error("Missing MOLLIE_API_KEY");
        return;
      }
      const client = createMollieClient({ apiKey });
      const payment = await client.payments.get(id);

      let newStatus: string | null = null;
      if (payment.status === "paid") newStatus = "paid";
      else if (payment.status === "canceled") newStatus = "cancelled";
      else if (payment.status === "failed" || payment.status === "expired") newStatus = "failed";

      if (newStatus) {
        const supabase = createClient();
        await (await supabase)
          .from("orders")
          .update({
            status: newStatus,
            stripe_payment_intent_id: payment.id,
          })
          .eq("stripe_session_id", id)
          .eq("status", "pending");
      }
    })();

    return immediateResponse; // 🔥 respond fast (under 100 ms)
  } catch (e: any) {
    console.error("Mollie webhook error:", e);
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}


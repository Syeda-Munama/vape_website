// import { NextResponse, type NextRequest } from "next/server"
// import createMollieClient from "@mollie/api-client"
// import { createClient } from "@/utils/supabase/server"

// function isLocalhostOrigin(origin: string) {
//   try {
//     const url = new URL(origin)
//     const host = url.hostname
//     return host === "localhost" || host === "127.0.0.1" || host.endsWith(".local")
//   } catch {
//     return true
//   }
// }

// function requirePublicHttps(urlString: string, label: string) {
//   const url = new URL(urlString)
//   const isHttps = url.protocol === "https:"
//   const isLoopback = url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname.endsWith(".local")
//   if (!isHttps || isLoopback) {
//     throw new Error(`${label} must be a public HTTPS URL (got "${urlString}")`)
//   }
// }

// function resolveBaseUrl(req: NextRequest) {
//   const origin = req.nextUrl.origin
//   // Prefer explicit base when developing locally
//   const envBase = process.env.MOLLIE_BASE_URL || process.env.APP_BASE_URL || process.env.NEXT_PUBLIC_APP_URL
//   if (isLocalhostOrigin(origin)) {
//     if (!envBase) {
//       throw new Error(
//         "No public base URL configured. Set MOLLIE_BASE_URL (e.g. your ngrok/Cloudflare Tunnel or deployed domain).",
//       )
//     }
//     requirePublicHttps(envBase, "MOLLIE_BASE_URL")
//     return envBase.replace(/\/$/, "")
//   }
//   // In production/preview, trust the request origin
//   if (!origin.startsWith("https://")) {
//     // Some dev proxies may send http; enforce https for Mollie
//     const httpsOrigin = origin.replace("http://", "https://")
//     return httpsOrigin.replace(/\/$/, "")
//   }
//   return origin.replace(/\/$/, "")
// }

// function resolveUrls(req: NextRequest) {
//   const base = resolveBaseUrl(req)

//   // Allow explicit overrides
//   const webhookUrl = process.env.MOLLIE_WEBHOOK_URL || `${base}/api/mollie/webhooks/mollie`
//   const redirectUrl = process.env.MOLLIE_REDIRECT_URL || `${base}/checkout/success`

//   requirePublicHttps(webhookUrl, "webhookUrl")
//   requirePublicHttps(redirectUrl, "redirectUrl")

//   return { base, webhookUrl, redirectUrl }
// }

// // Create a Mollie client using server-side env var
// function mollie() {
//   const apiKey = process.env.MOLLIE_API_KEY ;
//   if (!apiKey) throw new Error("Missing MOLLIE_API_KEY")
//   return createMollieClient({ apiKey })
// }

// export async function POST(req: NextRequest) {
//   try {
//     const supabase = createClient()
//     const { orderData } = (await req.json()) as {
//       orderData: any
//     }

//     // Basic validation
//     const total = Number(orderData?.totals?.total ?? 0)
//     if (!orderData?.email || !total || total <= 0) {
//       return NextResponse.json({ error: "Invalid order data" }, { status: 400 })
//     }

//     const { webhookUrl, redirectUrl } = resolveUrls(req)

//     // Optionally get logged-in user (guest checkout supported)
//     const { data: auth } = await (await supabase).auth.getUser()

//     // Create a pending order record
//     const { data: pendingOrder, error: insertErr } = await (await supabase)
//       .from("orders")
//       .insert({
//         user_id: auth?.user?.id ?? null,
//         email: orderData.email,
//         first_name: orderData.firstName,
//         last_name: orderData.lastName,
//         phone: orderData.phone,
//         shipping_address: orderData.shippingAddress,
//         shipping_city: orderData.shippingCity,
//         shipping_postcode: orderData.shippingPostcode,
//         shipping_country: orderData.shippingCountry,
//         billing_address: orderData.billingIsSame ? orderData.shippingAddress : orderData.billingAddress,
//         billing_city: orderData.billingIsSame ? orderData.shippingCity : orderData.billingCity,
//         billing_postcode: orderData.billingIsSame ? orderData.shippingPostcode : orderData.billingPostcode,
//         billing_country: orderData.billingIsSame ? orderData.shippingCountry : orderData.billingCountry,
//         payment_method: "mollie",
//         delivery_method: orderData.deliveryMethod,
//         special_instructions: orderData.specialInstructions,
//         subtotal: Number(orderData.totals?.subtotal || 0),
//         delivery_fee: Number(orderData.totals?.deliveryFee || 0),
//         total: Number(orderData.totals?.total || 0),
//         status: "pending",
//         items: orderData.items || [],
//       })
//       .select()
//       .single()

//     if (insertErr) throw insertErr

//     // Create a Mollie payment
//     const client = mollie()
//     const payment = await client.payments.create({
//       amount: {
//         currency: "GBP",
//         value: total.toFixed(2),
//       },
//       description: `Order ${pendingOrder.id}`,
//       redirectUrl,
//       webhookUrl,
//       metadata: {
//         orderId: pendingOrder.id,
//         email: orderData.email,
//       },
//     })

//     // Save Mollie payment id in existing column (stripe_session_id) for cross-page lookup
//     await (await supabase).from("orders").update({ stripe_session_id: payment.id }).eq("id", pendingOrder.id)

//     const redirectCheckout = (payment as any)?._links?.checkout?.href as string | undefined
//     if (!redirectCheckout) {
//       // fail safe: delete pending order to avoid orphans if payment doesn't have a checkout URL
//       await (await supabase).from("orders").delete().eq("id", pendingOrder.id)
//       return NextResponse.json({ error: "Failed to create Mollie checkout URL" }, { status: 500 })
//     }

//     return NextResponse.json({
//       redirectUrl: redirectCheckout,
//       paymentId: payment.id,
//       orderId: pendingOrder.id,
//     })
//   } catch (e: any) {
//     const message = e?.message || "Server error"
//     console.error("mollie/create-payment error:", e)
//     // Provide clearer message when webhook URL is invalid
//     if (message.includes("public HTTPS URL") || message.toLowerCase().includes("webhook url")) {
//       return NextResponse.json(
//         {
//           error:
//             message +
//             " Tip: In development, expose your app with ngrok or Cloudflare Tunnel and set MOLLIE_BASE_URL to the public https URL.",
//         },
//         { status: 422 },
//       )
//     }
//     return NextResponse.json({ error: message }, { status: 500 })
//   }
// }
import { NextResponse, type NextRequest } from "next/server";
import createMollieClient from "@mollie/api-client";
import { createClient } from "@/utils/supabase/server";

/* ---------- Helper Functions ---------- */
function isLocalhostOrigin(origin: string) {
  try {
    const url = new URL(origin);
    const host = url.hostname;
    return host === "localhost" || host === "127.0.0.1" || host.endsWith(".local");
  } catch {
    return true;
  }
}

function requirePublicHttps(urlString: string, label: string) {
  const url = new URL(urlString);
  const isHttps = url.protocol === "https:";
  const isLoopback =
    url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname.endsWith(".local");

  if (!isHttps || isLoopback) {
    throw new Error(`${label} must be a public HTTPS URL (got "${urlString}")`);
  }
}

function resolveBaseUrl(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const envBase =
    process.env.MOLLIE_BASE_URL ||
    process.env.APP_BASE_URL ||
    process.env.NEXT_PUBLIC_APP_URL;

  if (isLocalhostOrigin(origin)) {
    if (!envBase) {
      throw new Error(
        "No public base URL configured. Set MOLLIE_BASE_URL (e.g. your ngrok/Cloudflare Tunnel or deployed domain)."
      );
    }
    requirePublicHttps(envBase, "MOLLIE_BASE_URL");
    return envBase.replace(/\/$/, "");
  }

  if (!origin.startsWith("https://")) {
    const httpsOrigin = origin.replace("http://", "https://");
    return httpsOrigin.replace(/\/$/, "");
  }

  return origin.replace(/\/$/, "");
}

function resolveUrls(req: NextRequest) {
  const base = resolveBaseUrl(req);

  const webhookUrl =
    process.env.MOLLIE_WEBHOOK_URL || `${base}/api/mollie/webhooks/mollie`;
  const redirectUrl =
    process.env.MOLLIE_REDIRECT_URL || `${base}/checkout/success`;

  requirePublicHttps(webhookUrl, "webhookUrl");
  requirePublicHttps(redirectUrl, "redirectUrl");

  return { base, webhookUrl, redirectUrl };
}

function getMollieClient() {
  const apiKey = process.env.MOLLIE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing MOLLIE_API_KEY. Please add it to your environment variables.");
  }
  return createMollieClient({ apiKey });
}

/* ---------- Main Route ---------- */
export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const { orderData } = (await req.json()) as { orderData: any };

    const total = Number(orderData?.totals?.total ?? 0);
    if (!orderData?.email || !total || total <= 0) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    const { webhookUrl, redirectUrl } = resolveUrls(req);

    // ✅ Step 1: Validate Mollie API key and attempt payment creation first
    let payment;
    try {
      const client = getMollieClient();
      payment = await client.payments.create({
        amount: {
          currency: "GBP",
          value: total.toFixed(2),
        },
        description: `Order for ${orderData.email}`,
        redirectUrl,
        webhookUrl,
        metadata: {
          email: orderData.email,
        },
      });
    } catch (mollieErr: any) {
      console.error("❌ Mollie payment creation failed:", mollieErr);
      const msg = mollieErr?.message || "Failed to create payment with Mollie. Check API key.";
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    // ✅ Step 2: Only proceed if Mollie payment succeeded
    const redirectCheckout = (payment as any)?._links?.checkout?.href;
    if (!redirectCheckout) {
      return NextResponse.json(
        { error: "Failed to create Mollie checkout URL." },
        { status: 500 }
      );
    }

    // ✅ Step 3: Get logged-in user (guest checkout allowed)
    const { data: auth } = await (await supabase).auth.getUser();

    // ✅ Step 4: Insert order only after successful Mollie payment
    const { data: newOrder, error: insertErr } = await (await supabase)
      .from("orders")
      .insert({
        user_id: auth?.user?.id ?? null,
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
        subtotal: Number(orderData.totals?.subtotal || 0),
        delivery_fee: Number(orderData.totals?.deliveryFee || 0),
        total,
        status: "pending", // safer until webhook confirms payment
        items: orderData.items || [],
        // stripe_session_id: payment.id,
      })
      .select()
      .single();

    if (insertErr) throw insertErr;

    // ✅ Step 5: Return redirect URL
    return NextResponse.json({
      redirectUrl: redirectCheckout,
      paymentId: payment.id,
      orderId: newOrder.id,
    });
  } catch (e: any) {
    console.error("💥 Mollie create-payment error:", e);
    return NextResponse.json(
      { error: e?.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}

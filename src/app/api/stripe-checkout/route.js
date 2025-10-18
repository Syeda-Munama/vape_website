// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe( process.env.STRIPE_SECRET_KEY
// );

// export async function POST(req) {
//   // const { userId, totalAmount, totalQuantity } = await req.json();
// const { orderData } = await req.json();
// const totalQuantity = orderData?.items?.reduce((sum, item) => sum + item.quantity, 0)
//   // ✅ Stripe expects integer in pence (e.g., £16.94 = 1694)
//   let fullName = orderData.first_name + " " + orderData.last_name
//   const totalAmountInPence = Math.round(orderData.total * 100); // whole integer
//   const unitAmountInPence = Math.round(totalAmountInPence /totalQuantity
// ); // also integer

//   const session = await stripe.checkout.sessions.create({
//     success_url: "http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}",
//     cancel_url: "http://localhost:3000/cancel",
//     line_items: [
//       {
//         price_data: {
//           currency: "gbp",
//           product_data: {
//             name: "Vape Purchase",
//             description: `Purchase of ${totalQuantity} items`,
//           },
//           unit_amount: unitAmountInPence, // ✅ must be integer
//         },
//         quantity: totalQuantity,
//       },
//     ],
//     mode: "payment",
//     metadata:{
//       user_id:orderData.user_id ,
//       email:orderData.email, 
//       fullName: fullName,
//       phone: orderData.phone,
//       address: orderData.address,
//       city: orderData.city,
//       postcode: orderData.postcode,
//       shipping_address: orderData.shipping_address,
//       shipping_city: orderData.shipping_city,
//       shipping_postcode: orderData.shipping_postcode,
//       shipping_country: orderData.shipping_country,
//       special_instructions: orderData.special_instructions,
//       delivery_fee: orderData.delivery_fee,
//       subtotal: orderData.subtotal,
//       total: orderData.total,
//       // items: JSON.stringify(orderData.items), // convert items to string for metadata
//       delivery_method: orderData.delivery_method,
//       payment_method: orderData.payment_method,
//       subtotal: orderData.subtotal,
//       total: orderData.total,
//       status: "pending", // initial status
//     }
//   });

//   return NextResponse.json({ message: session.url }); // return session URL to redirect from frontend
// }

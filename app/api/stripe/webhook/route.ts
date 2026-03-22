import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error("Webhook signature failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await dbConnect();

      const userId = session.metadata?.userId;
      const products = JSON.parse(session.metadata?.products || "[]");

      await Order.create({
        userId,
        products: products.map((p: any) => ({
          productId: p.productId,
          quantity: p.quantity,
        })),
        paymentInfo: {
          id: session.payment_intent as string,
          gateway: "Stripe",
          status: "completed",
        },
        shippingAddress: {
          street: session.customer_details?.address?.line1 || "",
          city: session.customer_details?.address?.city || "",
          state: session.customer_details?.address?.state || "",
          postalCode: session.customer_details?.address?.postal_code || "",
          country: session.customer_details?.address?.country || "",
        },
        totalAmount: (session.amount_total || 0) / 100,
      });

      console.log("Order created successfully");
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  }

  return NextResponse.json({ received: true });
}
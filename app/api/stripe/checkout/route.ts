import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-02-25.clover",
});

interface CartEntry {
  item: {
    _id: string;
    name: string;
    images: string[];
    price: number;
  };
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const { cartItems, userId } = await req.json();

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cartItems.map((entry: CartEntry) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: entry.item.name,
            images: entry.item.images,
          },
          unit_amount: Math.round(entry.item.price * 100),
        },
        quantity: entry.quantity,
      })),
      metadata: {
        userId,
        products: JSON.stringify(
          cartItems.map((entry: CartEntry) => ({
            productId: entry.item._id,
            quantity: entry.quantity,
          }))
        ),
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

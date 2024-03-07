import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

const calculateOrderAmount = (items: CartProductType[]) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    // Include request for potential authentication

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { items, payment_intent_id } = body;

    const total = calculateOrderAmount(items) * 100;
    const orderData = {
      user: { connect: { id: currentUser.id } },
      amount: total,
      currency: "usd",
      status: "pending",
      deliveryStatus: "pending",
      paymentIntentId: payment_intent_id,
      products: items,
    };

    if (payment_intent_id) {
      // Update existing payment intent and order
      const updatedIntent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total }
      );

      const updatedOrder = await prisma.order.update({
        where: { paymentIntentId: payment_intent_id },
        data: { amount: total, products: items },
        select: { id: true }, // Only retrieve necessary field
      });

      if (!updatedOrder?.id) {
        return NextResponse.json(
          { error: "Invalid payment intent" },
          { status: 400 }
        );
      }

      return NextResponse.json({ paymentIntent: updatedIntent });
    } else {
      // Create new payment intent and order
      const paymentIntent = await stripe?.paymentIntents.create({
        amount: total,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });

      orderData.paymentIntentId = paymentIntent.id;
      await prisma?.order.create({ data: orderData });

      return NextResponse?.json({ paymentIntent });
    }
  } catch (error) {
    console.error(error);
    return NextResponse?.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

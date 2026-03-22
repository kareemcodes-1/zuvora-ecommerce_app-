import { Schema, model, models, InferSchemaType, Model } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],
    paymentInfo: {
      id: { type: String },
      gateway: { type: String },
      status: { type: String },
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    totalAmount: Number,
  },
  { timestamps: true }
);

export type OrderDocument = InferSchemaType<typeof orderSchema>;

const Order: Model<OrderDocument> = models.Order || model<OrderDocument>("Order", orderSchema);

export default Order;
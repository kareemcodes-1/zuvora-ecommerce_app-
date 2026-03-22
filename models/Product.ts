import { Schema, model, models, InferSchemaType, Model } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    collectionId: { type: Schema.Types.ObjectId, ref: "Collection", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String },
    price: { type: Number, required: true },
    sizes: [{ type: String }],
    inStock: { type: Boolean, required: true, default: true },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export type ProductDocument = InferSchemaType<typeof productSchema>;

const Product: Model<ProductDocument> =
  models.Product || model<ProductDocument>("Product", productSchema);

export default Product;
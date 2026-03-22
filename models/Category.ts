import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    collectionId: { type: Schema.Types.ObjectId, ref: "Collection", required: true },
  },
  { timestamps: true }
);

export type ICategory = InferSchemaType<typeof CategorySchema>;

const Category: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
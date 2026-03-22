import { Schema, model, models, Types, InferSchemaType, Model } from "mongoose";

const collectionSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  description: { type: String },
  images: [{ type: String }],
}, { timestamps: true });

export type CollectionDocument = InferSchemaType<typeof collectionSchema>;

const Collection: Model<CollectionDocument> =
  models.Collection || model<CollectionDocument>("Collection", collectionSchema);

export default Collection;
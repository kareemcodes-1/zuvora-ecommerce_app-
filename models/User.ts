import { Schema, model, models, InferSchemaType, Model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof userSchema>;

const User: Model<UserDocument> = models.User || model<UserDocument>("User", userSchema);

export default User;
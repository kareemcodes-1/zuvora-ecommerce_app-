import { Schema, model, Document, models, Types } from "mongoose";

export type Collection = {
  _id: Types.ObjectId;
  name: string;
  userId: Types.ObjectId;
  description: string;
  images: Array<string>;
}

export type Product = {
  _id: string;
  name: string;
  collectionId: string;
  categoryId: string;
  userId: string;
  description: string;
  price: number;
  sizes: Array<string>;
  inStock: boolean;
  images: Array<string>;
}

export type Category = {
  _id: string;
  name: string;
  collectionId: string;
};


export type PaymentInfo = { id?: string; gateway?: string; status?: string; };
 export type ShippingAddress = { street?: string; city?: string; state?: string; postalCode?: string; country?: string; };

 export type OrderProduct = {
  productId: Product;   // <-- here is one big issue
  quantity: number;
};

export type Order = {
  userId: User;         // <-- also a "full object" instead of ObjectId
  products: OrderProduct[];
  paymentInfo?: PaymentInfo;
  shippingAddress?: ShippingAddress;
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: string;
};

export type User = {
    // _id?: string,
    name: string,
    email: string,
    password: string;
}

export type Cart = {
    product: Product;
    quantity: number;
}
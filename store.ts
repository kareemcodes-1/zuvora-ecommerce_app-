import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "../types";
import { Types } from "mongoose";

interface CartItem {
  item: Product;
  selectedSize: string;
  quantity: number;
}

interface CartStore {
  cartItems: CartItem[];
  isCartOpen: boolean;                          // ADD
  setCartOpen: (open: boolean) => void;         // ADD
  addItem: (item: CartItem) => void;
  removeItem: (idToRemove: string) => void;
  increaseQuantity: (idToIncrease: string) => void;
  decreaseQuantity: (idToDecrease: string) => void;
  clearCart: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      isCartOpen: false,                        // ADD
      setCartOpen: (open) => set({ isCartOpen: open }), // ADD
      addItem: (data: CartItem) => {
        const { item, quantity, selectedSize } = data;
        const currentItems = get().cartItems; // all the items already in cart
       const isExisting = currentItems.find(
  (cartItem) =>
    cartItem.item._id === item._id && cartItem.selectedSize === data.selectedSize
);

        if (isExisting) {
          return toast("Item already in cart");
        }

        set({ cartItems: [...currentItems, { item, selectedSize, quantity,}] });
        set({ isCartOpen: true });  
        toast.success("Item added to cart", { icon: "✅" });
      },
      removeItem: (idToRemove: string) => {
        const newCartItems = get().cartItems.filter(
          (cartItem) => cartItem.item._id !== idToRemove
        );
        set({ cartItems: newCartItems });
        toast.success("Item removed from cart");
      },
      increaseQuantity: (idToIncrease: string) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === idToIncrease
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        set({ cartItems: newCartItems });
        toast.success("Item quantity increased");
      },
      decreaseQuantity: (idToDecrease: string) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === idToDecrease
            ? { ...cartItem, quantity: Math.max(1, cartItem.quantity - 1) }
            : cartItem
        );
        set({ cartItems: newCartItems });
        toast.success("Item quantity decreased");
      },
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;


"use client";

import { createPortal, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import useCart from "@/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { priceFormatter } from "@/lib/priceFormatter";
import { FormStatus } from "react-dom";
import { Spinner } from "@/components/ui/spinner";

type CartModalProps = {
  openCartModal: boolean;
  setOpenCartModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CheckoutBtn = () => {
  const [pending, setPending] = useState(false);
  const { data: session } = useSession();
  const { cartItems } = useCart();
  const router = useRouter();

  const checkout = async () => {
    try {
      setPending(true);
      if (!session?.user) {
        router.push("/auth/login");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems, userId: session.user.id }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout failed", data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      onClick={checkout}
      disabled={pending}
      className="btn btn--filled-dark btn--icon-right !w-full !text-start"
      style={{ fontSize: 'clamp(1rem, 2vw, 2rem)', height: 'clamp(3rem, 5vw, 4.5rem)' }}
    >
      {pending ? <Spinner className="size-8" /> : "CHECKOUT"}
    </button>
  );
};



const CartModal = ({ openCartModal, setOpenCartModal }: CartModalProps) => {
  const { cartItems, removeItem, clearCart, increaseQuantity, isCartOpen, setCartOpen, decreaseQuantity } = useCart();
  const ref = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    if (!ref.current) return;

    if (openCartModal) {
      gsap.fromTo(
        ref.current,
        { x: "100%" },
        { x: 0, duration: 0.5, ease: "power3.out" }
      );
    } else {
      gsap.to(ref.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [openCartModal]);





  return createPortal(
    <div className="fixed top-0 right-0 h-screen lg:w-[50%] w-full z-[106] pointer-events-auto">
      <div
        ref={ref}
        className="flex flex-col h-full bg-white relative shadow-lg translate-x-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-[1.5rem] lg:px-8 pt-[1.5rem] lg:pt-8 pb-4">
          <h2 className="text-[1.3rem] lg:text-[1.7rem] text-black font-extralight tracking-wide">
            CART
          </h2>
          <div className="cursor-pointer" onClick={() => setOpenCartModal(false)}>
            <X size={24} strokeWidth={1} />
          </div>
        </div>

        {/* Cart items — scrollable */}
        <div className="flex-1 overflow-y-auto px-[1.5rem] lg:px-[2rem]">
          {cartItems.length > 0 ? (
            <div className="flex flex-col">
              {cartItems.map(({ item, quantity, selectedSize }, index) => (
                <div
                  key={index}
                  className="flex items-start gap-[1rem] w-full border-b border-black/8 py-[1.2rem] lg:py-[1.5rem]"
                >
                  {/* Image */}
                  <div className="w-[4.5rem] h-[4.5rem] lg:w-[5.5rem] lg:h-[5.5rem] bg-gray-100 rounded-[.5rem] flex-shrink-0 overflow-hidden relative">
                    <Image src={item.images[0]} alt={item.name} fill className="object-contain p-[.4rem]" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[.85rem] lg:text-[.95rem] font-[300] text-black">{item.name}</p>
                        <div className="flex items-center gap-[.5rem]">

                          <p className=" text-[.75rem] lg:text-[.8rem] text-black/40 font-[300] mt-[.2rem]">{selectedSize}</p>

                        </div>
                      </div>
                      <span className="text-[.85rem] lg:text-[.9rem] font-[300] text-black flex-shrink-0 ml-[1rem]">
                        {priceFormatter(item.price)}
                      </span>
                    </div>

                    {/* Quantity + Remove */}
                    <div className="flex items-center justify-between mt-[.8rem]">
                      <div className="flex items-center gap-[.75rem] lg:gap-[1rem] border border-black/15 rounded-full px-[.8rem] py-[.3rem]">
                        <button onClick={() => decreaseQuantity(item._id)}>
                          <Minus size={12} strokeWidth={1.5} className="cursor-pointer text-black/60 hover:text-black transition-colors" />
                        </button>
                        <span className="text-[.8rem] lg:text-[.85rem] font-[300] min-w-[1rem] text-center">{quantity}</span>
                        <button onClick={() => increaseQuantity(item._id)}>
                          <Plus size={12} strokeWidth={1.5} className="cursor-pointer text-black/60 hover:text-black transition-colors" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item._id)}>
                        <X size={16} strokeWidth={1.5} className="text-black/30 hover:text-black transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <h1 className="text-center font-[200] text-[1.5rem] lg:text-[2rem] uppercase text-black">
                Your cart is empty.
              </h1>
            </div>
          )}
        </div>

        {/* Subtotal + Footer */}
        {cartItems.length > 0 && (
          <>
            <div className="px-[1.5rem] lg:px-[2rem] pt-[1rem] pb-[.5rem] border-t border-black/8">
              <div className="flex justify-between items-center mb-[.5rem]">
                <span className="text-[.75rem] lg:text-[.8rem] text-black/50 font-[300]">Shipping</span>
                <span className="text-[.75rem] lg:text-[.8rem] text-black/50 font-[300]">At Checkout</span>
              </div>
              <div className="flex justify-between items-center mb-[1.5rem]">
                <span className="text-[.85rem] lg:text-[.95rem] font-[300]">Subtotal</span>
                <span className="text-[.85rem] lg:text-[.95rem] font-[300]">
                  {priceFormatter(cartItems.reduce((acc, { item, quantity }) => acc + item.price * quantity, 0))}
                </span>
              </div>
            </div>

            <div className="px-[1.5rem] lg:px-[2rem] pb-[2rem]">
              <CheckoutBtn />
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default CartModal;

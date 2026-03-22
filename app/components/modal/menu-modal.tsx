"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import CartModal from "./cart-modal";
import useCart from "@/store";
import { useSession, signOut } from "next-auth/react";
import gsap from "gsap";
import { FlipLink } from "@/lib/flip-links";
import { X } from "lucide-react";

type MenuModalProps = {
  openMenuModal: boolean;
  setOpenMenuModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuModal: React.FC<MenuModalProps> = ({
  openMenuModal,
  setOpenMenuModal,
}) => {
  const [openCartModal, setOpenCartModal] = useState(false);
  const { cartItems } = useCart();
  const { data: session } = useSession();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  useEffect(() => {
    if (!modalRef.current) return;

    if (openMenuModal) {
      gsap.fromTo(
        modalRef.current,
        { x: "-100%" },
        { x: 0, duration: 0.5, ease: "power3.out" }
      );
    } else {
      gsap.to(modalRef.current, {
        x: "-100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [openMenuModal]);

  return (
    <>
      {openCartModal && (
        <CartModal
          openCartModal={openCartModal}
          setOpenCartModal={setOpenCartModal}
        />
      )}

      <div
        ref={modalRef}
        className="fixed top-0 right-0 left-0 h-screen bg-white z-[10000] -translate-x-full"
      >
        {/* Close button */}
        <div className="flex justify-end p-5">
          <button
            onClick={() => setOpenMenuModal(false)}
            className="group relative flex items-center justify-center cursor-pointer"
          >
            <X strokeWidth={"1.25px"} />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-[1rem] text-black">
          <div className="flex items-start flex-col p-[1rem] lg:mt-[4rem] mt-[10rem] gap-[1rem]">
            <ul className="flex flex-col gap-[2rem] font-medium tracking-[.2rem]">
              <Link
                href="/"
                className="cursor-pointer telegraf font-[200] xl:text-[7rem] lg:text-[5rem] text-[3rem]"
              >
                <FlipLink>HOME</FlipLink>
              </Link>

              <Link
                href="/"
                className="cursor-pointer telegraf font-[200] xl:text-[7rem] lg:text-[5rem] text-[3rem]"
              >
                <FlipLink>ABOUT</FlipLink>
              </Link>

              <Link
                href="/products"
                className="cursor-pointer telegraf font-[200] xl:text-[7rem] lg:text-[5rem] text-[3rem]"
              >
                <FlipLink>CONTACT</FlipLink>
              </Link>

              {session ? (
                <>
                  <Link
                    href="/profile"
                    className="cursor-pointer telegraf font-[200] xl:text-[7rem] lg:text-[5rem] text-[3rem]"
                  >
                    <FlipLink>PROFILE</FlipLink>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="cursor-pointer telegraf font-[200] xl:text-[7rem] lg:text-[5rem] text-[3rem] text-left"
                  >
                    <FlipLink>LOGOUT</FlipLink>
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="cursor-pointer telegraf font-[200] xl:text-[7rem] lg:text-[5rem] text-[3rem]"
                >
                  <FlipLink>SIGN IN</FlipLink>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuModal;
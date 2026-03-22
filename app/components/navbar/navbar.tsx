"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import useCart from "@/store";
import { useSession, signOut } from "next-auth/react";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import MenuModal from "../modal/menu-modal";
import CartModal from "../modal/cart-modal";
import SearchModal from "../modal/search-modal";
import { Collection } from "@/types";
import { usePathname } from "next/navigation";

const Navbar = ({ collections }: { collections: Collection[] }) => {
  const [navScrolled, setNavScrolled] = useState(false);
  const [openMenuModal, setOpenMenuModal] = useState(false);
  const [openCartModal, setOpenCartModal] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);

  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isLight = !navScrolled && (
    pathname === "/" ||
    ["/contact", "/about"].some(route => pathname.startsWith(route))
  );

  const navLinks = useMemo(() => [
    {
      label: "Mens",
      href: `/collections/${collections?.find(c => c.name.toLowerCase() === "mens")?.name.toLowerCase() ?? "mens"}`,
    },
    {
      label: "Womens",
      href: `/collections/${collections?.find(c => c.name.toLowerCase() === "womens")?.name.toLowerCase() ?? "womens"}`,
    },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ], [collections]);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 150);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <>
      {openMenuModal && (
        <MenuModal openMenuModal={openMenuModal} setOpenMenuModal={setOpenMenuModal} />
      )}
      {openCartModal && (
        <CartModal openCartModal={openCartModal} setOpenCartModal={setOpenCartModal} />
      )}
      {openSearchModal && (
        <SearchModal openSearchModal={openSearchModal} setOpenSearchModal={setOpenSearchModal} />
      )}

      <header
        className={`fixed z-[105] py-[1.5rem] lg:py-[1.7rem] lg:px-[1.5rem] px-[1.2rem] top-0 right-0 left-0 transition-[.1] duration-300
          ${navScrolled
            ? "bg-[#f8f8f8] border border-gray-300 text-black"
            : isLight
              ? "bg-transparent text-white"
              : "bg-[#f8f8f8] text-black"
          }
        `}
      >
        <nav className="flex items-center justify-between w-full">
          <div className="flex items-center gap-[8rem]">
            <div className={`${isLight ? "text-white" : "text-black"} overflow-hidden lg:text-[1.2rem] text-[1.1rem] uppercase telegraf tracking-[.1rem]`}>
              <Link href="/" className="telegraf font-[500] uppercase">
                Zuvora
              </Link>
            </div>

            <div className={`${isLight ? "text-white" : "text-black"} lg:flex hidden items-center gap-[2rem]`}>
              {navLinks.map((link, index) => (
                <Link key={index} href={link.href} className="text-[1rem] font-[200]">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-[1rem] lg:gap-[1.5rem]">
            <button
              onClick={() => setOpenMenuModal((prev) => !prev)}
              className="block lg:hidden"
            >
              <Menu strokeWidth="1.25px" />
            </button>

            <button className="text-[1rem] uppercase" onClick={() => setOpenSearchModal(true)}>
              <Search strokeWidth="1.25px" />
            </button>
            <button className="text-[1rem] uppercase" onClick={() => setOpenCartModal(true)}>
              <ShoppingCart strokeWidth={"1.25px"} />
            </button>

            {status === "authenticated" ? (
              <div className="hidden lg:flex items-center gap-[1rem]">
                <Link href="/profile" className="text-[1rem] uppercase flex items-center gap-2">
                  <User strokeWidth={1.25} />
                </Link>
                <button className="text-[1rem] uppercase" onClick={handleLogout}>
                  LOGOUT
                </button>
              </div>
            ) : (
              <Link href="/auth/login" className="hidden lg:flex text-[1rem] uppercase">
                <User strokeWidth={"1.25px"} />
              </Link>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
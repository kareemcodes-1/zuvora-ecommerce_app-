"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, Search } from "lucide-react";
import { getProducts } from "@/app/actions/getProducts";
import { Product } from "../../../../types";
import Image from "next/image";
import { useRouter } from "next/navigation";

type SearchModalProps = {
  openSearchModal: boolean;
  setOpenSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function SearchModal({ openSearchModal, setOpenSearchModal }: SearchModalProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();

  // Fetch all products once
  useEffect(() => {
    (async () => {
      const data = await getProducts();
      setAllProducts(data);
    })();
  }, []);

  useEffect(() => {
  setSelectedIndex(-1);
}, [products]);

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") setOpenSearchModal(false);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, products.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    }
    if (e.key === "Enter" && selectedIndex >= 0) {
      handleSelect(products[selectedIndex]);
    }
  };
  document.addEventListener("keydown", handleKeyDown);
  return () => document.removeEventListener("keydown", handleKeyDown);
}, [selectedIndex, products]);

  // Filter on query change
  useEffect(() => {
    if (!query.trim()) {
      setProducts(allProducts.slice(0, 6));
      return;
    }
    const filtered = allProducts.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setProducts(filtered);
  }, [query, allProducts]);

  // GSAP animate in/out
  useEffect(() => {
    if (!ref.current || !overlayRef.current) return;
    if (openSearchModal) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(ref.current, { y: "-3%", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.4, ease: "power3.out" });
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
      gsap.to(ref.current, { y: "-3%", opacity: 0, duration: 0.3, ease: "power3.in" });
    }
  }, [openSearchModal]);

  const handleSelect = (product: Product) => {
    router.push(`/shop/p/${product.name.replace(/\s+/g, "-")}`);
    setOpenSearchModal(false);
    setQuery("");
  };

  return createPortal(
    <div className={`fixed inset-0 z-[2000000] ${openSearchModal ? "pointer-events-auto" : "pointer-events-none"}`}>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => setOpenSearchModal(false)}
        className="absolute inset-0 bg-black/60 opacity-0"
      />

      {/* Modal */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[90%] lg:w-[50rem]">
        <div
          ref={ref}
          className="bg-white rounded-[1.5rem] overflow-hidden shadow-2xl opacity-0"
        >
          {/* Search Input */}
          <div className="flex items-center gap-[1rem] px-[1.5rem] py-[1.2rem] border-b border-black/8">
            <Search size={18} strokeWidth={1.5} className="text-black/40 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 text-[1rem] telegraf font-[200] outline-none bg-transparent placeholder:text-black/30"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-black/30 hover:text-black transition-colors">
                <X size={16} />
              </button>
            )}

           {!query && (
            <button
    onClick={() => setOpenSearchModal(false)}
    className="text-black/30 hover:text-black transition-colors ml-[.5rem]"
  >
    <X size={18} strokeWidth={1.5} />
  </button>
           )} 
          </div>

          {/* Results */}
          <div className="max-h-[28rem] overflow-y-auto">
            {products.length > 0 ? (
              <>
                <p className="px-[1.5rem] pt-[1rem] pb-[.5rem] text-[.65rem] uppercase tracking-[.2em] text-black/30 font-[400]">
                  {query ? `${products.length} result${products.length !== 1 ? "s" : ""}` : "All Products"}
                </p>
                {products.map((product, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(product)}
                    className="w-full flex items-center gap-[1.2rem] px-[1.5rem] py-[.85rem] hover:bg-black/[0.03] transition-colors group text-left"
                  >
                    {/* Product image */}
                    <div className="w-[3.5rem] h-[3.5rem] bg-[#f0f0f0] rounded-[.6rem] flex-shrink-0 overflow-hidden relative">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain p-[.3rem]"
                      />
                    </div>

                    {/* Product info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[.95rem] telegraf font-[300] text-black truncate group-hover:text-black/70 transition-colors">
                        {product.name}
                      </p>
                      <p className="text-[.75rem] text-black/30 font-[300] mt-[.1rem]">
                        /shop/p/{product.name.replace(/\s+/g, "-").toLowerCase()}
                      </p>
                    </div>

                    {/* Price */}
                    <span className="text-[.85rem] telegraf font-[200] text-black/60 flex-shrink-0">
                      ${product.price}
                    </span>
                  </button>
                ))}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-[3rem] text-black/30">
                <Search size={28} strokeWidth={1} className="mb-[.75rem]" />
                <p className="text-[.9rem] telegraf font-[200]">No products found for "{query}"</p>
              </div>
            )}
          </div>

          {/* Footer hint */}
          <div className="px-[1.5rem] py-[.75rem] border-t border-black/5 flex items-center gap-[1.5rem]">
            <span className="text-[.65rem] uppercase tracking-[.15em] text-black/25 font-[300]">↵ to select</span>
            <span className="text-[.65rem] uppercase tracking-[.15em] text-black/25 font-[300]">esc to close</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default SearchModal;
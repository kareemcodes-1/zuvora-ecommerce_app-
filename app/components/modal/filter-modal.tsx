"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { X } from "lucide-react";
import useFilter, { SortOption } from "@/hooks/use-filter";

type FilterModalProps = {
  openFilterModal: boolean;
  setOpenFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "name-az", label: "Product name A→Z" },
  { value: "name-za", label: "Product name Z→A" },
  { value: "price-asc", label: "Price ascending" },
  { value: "price-desc", label: "Price descending" },
];

const FilterModal = ({ openFilterModal, setOpenFilterModal }: FilterModalProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { sort, sizes, setSort, toggleSize, clearFilters } = useFilter();

  useEffect(() => {
    if (!ref.current) return;
    if (openFilterModal) {
      gsap.fromTo(ref.current, { x: "100%" }, { x: 0, duration: 0.5, ease: "power3.out" });
    } else {
      gsap.to(ref.current, { x: "100%", duration: 0.4, ease: "power3.in" });
    }
  }, [openFilterModal]);

  return createPortal(
    <div className={`fixed top-0 right-0 h-screen lg:w-[50%] w-full z-[2000] ${openFilterModal ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        ref={ref}
        className="flex flex-col h-full bg-[#f8f8f8] relative shadow-lg translate-x-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4 border-b border-gray-100">
          <h2 className="text-[1.7rem] text-black font-extralight tracking-wide uppercase">
            Filter
          </h2>
          <div className="cursor-pointer" onClick={() => setOpenFilterModal(false)}>
            <X size={30} strokeWidth={1} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-[3rem]">
          <div className="w-full h-[1px] bg-black/10 mb-[3rem]" />

          {/* Sort By */}
          <div className="mb-[3.5rem]">
            <p className="text-[.7rem] uppercase tracking-[.25em] text-black/50 font-[400] mb-[1.5rem]">
              Sort by:
            </p>
            <div className="flex flex-col gap-[1rem]">
              {SORT_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  onClick={() => setSort(option.value)}
                  className="flex items-center gap-[1rem] cursor-pointer group"
                >
                  <div
                    className={`w-[1.4rem] h-[1.4rem] rounded-full border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                      sort === option.value
                        ? "border-black"
                        : "border-black/25 group-hover:border-black/50"
                    }`}
                  >
                    {sort === option.value && (
                      <div className="w-[.65rem] h-[.65rem] rounded-full bg-black" />
                    )}
                  </div>
                  <span
                    className={`telegraf font-[200] text-[1rem] transition-colors ${
                      sort === option.value ? "text-black" : "text-black/50"
                    }`}
                  >
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="w-full h-[1px] bg-black/10 mb-[3rem]" />

          {/* Size */}
          <div className="mb-[3.5rem]">
            <p className="text-[.7rem] uppercase tracking-[.25em] text-black/50 font-[400] mb-[1.5rem]">
              Size:
            </p>
            <div className="flex flex-wrap gap-[.6rem]">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-[1.2rem] py-[.5rem] rounded-full border text-[.85rem] telegraf font-[200] transition-all duration-200 ${
                    sizes.includes(size)
                      ? "bg-black text-white border-black"
                      : "bg-transparent text-black border-black/25 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-[3rem] py-[2rem] border-t border-black/10 flex gap-[1rem]">
          <button
            onClick={clearFilters}
            className="!text-start !text-[2rem] btn btn--filled-dark  btn--icon-right !w-full"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FilterModal;
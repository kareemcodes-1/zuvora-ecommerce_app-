"use client";
import { useEffect, useState, useRef } from "react";
import { Product, Category, Collection } from "@/types";
import FilterModal from "@/app/components/modal/filter-modal";
import useFilter from "@/hooks/use-filter";
import ProductCard from "@/app/components/products/product-card";
import { ChevronDown } from "lucide-react";

export default function CollectionProducts({
  collection,
  products,
  categories,
}: {
  collection: Collection;
  products: Product[];
  categories: Category[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { sort, sizes } = useFilter();

  const activeCategoryName =
    activeCategory === "All"
      ? "All"
      : categories.find((c) => c._id === activeCategory)?.name ?? "All";

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = [...products]
    .filter((p) => {
      const categoryMatch =
        activeCategory === "All" || p.categoryId === activeCategory;
      const sizeMatch =
        sizes.length === 0 || p.sizes?.some((s) => sizes.includes(s));
      return categoryMatch && sizeMatch;
    })
    .sort((a, b) => {
      if (sort === "name-az") return a.name.localeCompare(b.name);
      if (sort === "name-za") return b.name.localeCompare(a.name);
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <>
      {openFilterModal && (
        <FilterModal
          openFilterModal={openFilterModal}
          setOpenFilterModal={setOpenFilterModal}
        />
      )}

      <section className="min-h-screen w-full mt-[2rem] py-[4rem] pt-[6rem] lg:pt-[7rem] pb-[4rem] px-[1rem] lg:px-[2rem]">
        <div className="flex flex-col h-full gap-[1.5rem] lg:gap-[2rem]">

          {/* Heading */}
         <div className="flex gap-[1rem] flex-col mb-[1rem]">
           <h1 className="text-[2rem] md:text-[3.5rem] mb-[1rem] lg:text-[5.5rem] font-extralight leading-[1.1]">
            {(collection as any).name} COLLECTION
          </h1>

          {/* Filter Bar */}
          <div className="flex items-center justify-between w-full">

            {/* Desktop categories */}
            <div className="hidden lg:flex items-center gap-[2rem] pb-[1rem] flex-wrap">
              <button
                onClick={() => setActiveCategory("All")}
                className={`text-[1rem] transition-colors duration-200 ${
                  activeCategory === "All"
                    ? "text-black font-[500]"
                    : "text-black/40 font-[300] hover:text-black"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => setActiveCategory(category._id)}
                  className={`text-[1rem] transition-colors duration-200 ${
                    activeCategory === category._id
                      ? "text-black font-[500]"
                      : "text-black/40 font-[300] hover:text-black"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Mobile dropdown */}
            <div className="relative lg:hidden" ref={dropdownRef}>
              <button
                onClick={() => setOpenDropdown((prev) => !prev)}
                className="flex items-center gap-[.5rem] border border-black/20 rounded-full px-[1rem] py-[.5rem] text-[.85rem] font-[300]"
              >
                {activeCategoryName}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${openDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {openDropdown && (
                <div className="absolute top-[calc(100%+.5rem)] left-0 bg-white border border-black/10 rounded-[.75rem] shadow-md z-50 min-w-[10rem] py-[.5rem] flex flex-col">
                  <button
                    onClick={() => { setActiveCategory("All"); setOpenDropdown(false); }}
                    className={`px-[1rem] py-[.6rem] text-[.85rem] text-left transition-colors ${
                      activeCategory === "All" ? "font-[500] text-black" : "font-[300] text-black/50 hover:text-black"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category._id}
                      onClick={() => { setActiveCategory(category._id); setOpenDropdown(false); }}
                      className={`px-[1rem] py-[.6rem] text-[.85rem] text-left transition-colors ${
                        activeCategory === category._id ? "font-[500] text-black" : "font-[300] text-black/50 hover:text-black"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="cursor-pointer btn btn--dark btn--icon-right flex-shrink-0"
              onClick={() => setOpenFilterModal(true)}
            >
              Filter
            </button>
          </div>
         </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[0.75rem] lg:gap-[1rem]">
            {filteredProducts.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
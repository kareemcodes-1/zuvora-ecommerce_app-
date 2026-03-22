
import { create } from "zustand";

export type SortOption = "name-az" | "name-za" | "price-asc" | "price-desc";

interface FilterStore {
  sort: SortOption;
  sizes: string[];
  setSort: (sort: SortOption) => void;
  toggleSize: (size: string) => void;
  clearFilters: () => void;
}

const useFilter = create<FilterStore>((set, get) => ({
  sort: "name-az",
  sizes: [],
  setSort: (sort) => set({ sort }),
  toggleSize: (size) => {
    const current = get().sizes;
    set({
      sizes: current.includes(size)
        ? current.filter((s) => s !== size)
        : [...current, size],
    });
  },
  clearFilters: () => set({ sort: "name-az", sizes: [] }),
}));

export default useFilter;
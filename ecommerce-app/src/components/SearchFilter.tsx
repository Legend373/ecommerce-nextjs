"use client";
import { Product } from "@/types/product";
import { useState, useEffect } from "react";

interface SearchFilterProps {
  products: Product[];
  setFilteredProducts: (products: Product[]) => void;
}

export default function SearchFilter({
  products,
  setFilteredProducts,
}: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  useEffect(() => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  }, [searchTerm, categoryFilter, priceRange, products, setFilteredProducts]);

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col gap-10 md:flex-row ">
        <input
          type="text"
          placeholder="Search products..."
          className=" ml-48  px-6 py-2 border text-black rounded-md flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="px-4 py-2  border rounded-md"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <div className="flex items-center space-x-4">
          <span>${priceRange[0]}</span>
          <input
            type="range"
            min="0"
            max="1000"
            step="1"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([parseInt(e.target.value), priceRange[1]])
            }
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="1000"
            step="1"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full"
          />
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}

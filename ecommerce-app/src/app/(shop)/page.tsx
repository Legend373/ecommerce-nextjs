"use client";
import ProductCard from "@/components/ProductCard";
import SearchFilter from "@/components/SearchFilter";
import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { Product } from "@/types/product";

export default function ShopPage() {
  const { products, loading, error } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container text-center mx-auto px-4 py-8">
      <h1 className="text-3xl  text-gray-700 font-bold mb-8">Our Products</h1>

      <SearchFilter
        products={products}
        setFilteredProducts={setFilteredProducts}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <Link href={`/products/${product.id}`} className="flex-grow">
        <div className="relative h-48">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain  "
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-gray-600 font-semibold text-lg mb-1 p-2 hover:text-blue-600 line-clamp-2">
            {product.title}
          </h3>
        </Link>
        <p className=" text-gray-400 mb-2 line-clamp-2 flex-grow text-sm">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-black text-lg">
            ${product.price.toFixed(2)}
          </span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

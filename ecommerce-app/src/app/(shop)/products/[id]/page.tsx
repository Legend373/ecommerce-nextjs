// app/(shop)/products/[id]/page.tsx

import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import { Product } from "@/types/product";

type Props = {
  params: { id: string };
};

async function getProduct(id: number): Promise<Product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(Number(params.id));
  return {
    title: product?.title || "Product Not Found",
    description: product?.description || "",
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(Number(params.id));
  if (!product) notFound();

  return (
    <div className="container mx-auto p-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white shadow rounded">
          <Image
            src={product.image}
            alt={product.title}
            width={600}
            height={600}
            className="object-contain w-full h-auto"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl text-gray-700">${product.price}</p>
          <p className="text-gray-600">{product.description}</p>
          <div className="pt-4">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

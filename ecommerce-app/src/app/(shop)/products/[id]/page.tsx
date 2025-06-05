import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import Image from "next/image";
import { Product } from "@/types/product";

async function getProduct(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 3600 }, // Revalidate data every hour
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

export async function generateStaticParams() {
  // For dynamic pages without pre-rendered paths
  return [];
}

interface PageProps {
  params: Promise<{ id: string }>; // Update to use Promise
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function ProductPage({ params }: PageProps) {
  // Await the params promise
  const { id } = await params;

  // Safely parse and validate product ID
  const productId = Number(id);
  if (isNaN(productId)) {
    notFound();
  }

  // Fetch product data
  const product = await getProduct(productId);
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <Image
            src={product.image}
            alt={product.title}
            width={600}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl text-gray-800">${product.price.toFixed(2)}</p>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(product.rating.rate)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700">{product.description}</p>

          {/* Add to Cart */}
          <div className="pt-4">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

interface CartProps {
  showCheckout?: boolean; // Add this interface for the prop
}

export default function Cart({ showCheckout = true }: CartProps) {
  // Destructure with default value
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalPrice: number = cart.reduce(
    (sum: number, item: Product & { quantity: number }) =>
      sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl mb-4">Your cart is empty</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container  mx-auto px-4 py-12">
      <h1 className="text-gray-600 text-3xl font-bold mb-8 ">
        Your Shopping Cart
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Cart items list */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.id} className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <Link
                        href={`/products/${item.id}`}
                        className="text-gray-600 font-medium hover:text-blue-600"
                      >
                        {item.title}
                      </Link>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                        className="w-16 px-2 py-1 border rounded-md text-center"
                      />
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-800"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Conditionally render checkout section */}
        {showCheckout && (
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl text-black font-semibold mb-4">
              Order Summary
            </h2>
            <div className=" text-black space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

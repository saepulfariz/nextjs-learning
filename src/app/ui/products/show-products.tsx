import { Product } from "@/app/lib/definitions";
import Link from "next/link";

export default async function ShowProduct({ product }: { product: Product }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">
        {product.name}
      </h1>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-800 dark:text-white">
            Deskripsi:
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {product.description}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-lg font-medium text-gray-800 dark:text-white">
            Harga:
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Rp {product.price.toLocaleString()}
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/products"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Kembali ke Daftar Produk
          </Link>
        </div>
      </div>
    </div>
  );
}

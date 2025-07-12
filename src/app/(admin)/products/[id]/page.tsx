import Link from "next/link";
import { use } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "Produk A", description: "Deskripsi Produk A", price: 15000 },
  { id: 2, name: "Produk B", description: "Deskripsi Produk B", price: 20000 },
  { id: 3, name: "Produk C", description: "Deskripsi Produk C", price: 30000 },
  { id: 4, name: "Produk D", description: "Deskripsi Produk D", price: 25000 },
];

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="text-center text-red-500 px-4 py-16">
        <h1 className="text-3xl font-semibold text-center  text-red-500 dark:text-white mb-6">
          Produk tidak ditemukan!
        </h1>
      </div>
    );
  }

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

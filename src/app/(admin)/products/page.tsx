import Link from "next/link";
import { fetchProducts } from "@/app/lib/data";
import ListProducts from "@/app/ui/products/list-products";

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

export default async function Products() {
  const listProducts = await fetchProducts();
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-8">
        Daftar Produk
      </h1>

      <ListProducts listProducts={listProducts} />
    </div>
  );
}

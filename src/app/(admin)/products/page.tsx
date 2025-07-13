import { fetchProducts } from "@/app/lib/data";
import ListProducts from "@/app/ui/products/list-products";

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

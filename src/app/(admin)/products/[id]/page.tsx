import { fetchProductById } from "@/app/lib/data";
import ShowProduct from "@/app/ui/products/show-products";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = await fetchProductById(id);

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
    <>
      <ShowProduct product={product} />
    </>
  );
}

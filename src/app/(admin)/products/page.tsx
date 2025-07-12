import Link from "next/link";

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

export default function Products() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-8">
        Daftar Produk
      </h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-200">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-200">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-200">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                  {product.description}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                  Rp {product.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <Link href={`/products/${product.id}`}>
                    <p className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
                      Show
                    </p>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

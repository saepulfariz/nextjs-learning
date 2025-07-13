import { Product } from "@/app/lib/definitions";
import Link from "next/link";
export default async function ListProducts({
  listProducts,
}: {
  listProducts: Product[];
}) {
  return (
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
          {listProducts.map((product) => (
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
  );
}

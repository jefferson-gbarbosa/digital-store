import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useProductStore } from '../../../stores/productStore'

const ProductManagement = () => {
  const { products, fetchProducts, deleteProduct, loading } = useProductStore()

  // ✅ Buscar produtos apenas uma vez
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleDeleteProduct = async (productId: number) => {
    await deleteProduct(productId)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product Management</h2>

        <Link
          to="/admin/products/create"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
        >
          + Add Product
        </Link>
      </div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        {loading ? (
          <div className="p-6 text-center text-gray-500">
            Loading products...
          </div>
        ) : (
          <table className="min-w-full text-left text-dark-gray-2">
            <thead className="bg-light-gray-2 text-xs uppercase text-dark-gray">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b hover:bg-light-gray-1 transition-colors"
                  >
                    <td className="p-4 font-medium text-dark-gray whitespace-nowrap">
                      {product.name}
                    </td>
                    <td className="p-4">R$ {product.price.toFixed(2)}</td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4 flex items-center gap-2">
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="bg-warning text-white px-2 py-1 rounded hover:bg-warning-dark transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-tertiary text-white px-2 py-1 rounded hover:bg-tertiary-dark transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-400">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default ProductManagement

import { useState } from 'react'

type ProductImage = {
  url: string
  altText?: string
}

type ProductData = {
  name: string
  description: string
  price: number
  countInStock: number
  sku: string
  category: string
  brand: string
  sizes: string[]
  colors: string[]
  collections: string
  material: string
  gender: string
  imagens: ProductImage[]
}

function EditProductPage() {
  const [productData, setProductData] = useState<ProductData>({
    name: '',
    description: '',
    price: 0,
    countInStock: 0,
    sku: '',
    category: '',
    brand: '',
    sizes: [], // ✅ Agora o TS sabe que é string[]
    colors: [],
    collections: '',
    material: '',
    gender: '',
    imagens: [
      { url: 'https://picsum.photos/150?random=1', altText: 'Random Image 1' },
      { url: 'https://picsum.photos/150?random=2', altText: 'Random Image 2' },
    ],
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setProductData((prevData) => ({ ...prevData, [name]: value }))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageUpload = async (e: { target: { files: any } }) => {
    const file = e.target.files[0]
    console.log('Uploaded file:', file)
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log('Product Data Submitted:', productData)
  }
  return (
    <div className="max-w-5xl mx-auto p-6 shdow-md rouded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block font-semibold mb-2" htmlFor="name">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border border-light-gray rounded-md p-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            value={productData.description}
            name="description"
            onChange={handleChange}
            className="w-full border border-light-gray rounded-md p-2"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-light-gray rounded-md p-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2" htmlFor="countInStock">
            Count in Stock
          </label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-light-gray rounded-md p-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2" htmlFor="sku">
            SKU
          </label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-light-gray rounded-md p-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2" htmlFor="sizes">
            Sizes (comma-separated)
          </label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(', ')}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(',').map((size) => size.trim()),
              })
            }
            className="w-full border border-light-gray rounded-md p-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2" htmlFor="colors">
            Colors (comma-separated)
          </label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(', ')}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(',').map((color) => color.trim()),
              })
            }
            className="w-full border border-light-gray rounded-md p-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2" htmlFor="imagens">
            Upload Image
          </label>
          <input
            type="file"
            name="imagens"
            onChange={handleImageUpload}
            className="cursor-pointer"
          />
          <div className="flex gap-4 mt-4">
            {productData.imagens.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={image.altText || 'Product Image'}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green text-white px-4 py-2 rounded-md hover:bg-dark-gray-2 transition-colors cursor-pointer"
        >
          Update Product
        </button>
      </form>
    </div>
  )
}

export default EditProductPage

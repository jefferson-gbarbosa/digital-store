import z from 'zod'
import { InputField, InputRoot } from '../../../components/ui/Input'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm, SubmitHandler } from 'react-hook-form'

// Schema simplificado e compatível
const ProductSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  slug: z.string().min(1, 'Slug é obrigatório'),
  description: z.string().optional(),
  price: z.number().min(0, 'Preço deve ser positivo'),
  price_with_discount: z.number().min(0).optional(),
  stock: z.number().min(0, 'Estoque deve ser positivo'),
  enabled: z.boolean(),
  category_ids: z.array(z.number()),
  images: z.array(z.instanceof(File)).min(1, 'Selecione pelo menos uma imagem'),
  options: z.array(
    z.object({
      title: z.string().min(1, 'Título é obrigatório'),
      type: z.string().min(1, 'Tipo é obrigatório'),
      values: z.array(z.string().min(1, 'Valor não pode estar vazio')),
    }),
  ),
})

// Tipo para o formulário baseado no schema
type ProductFormData = z.infer<typeof ProductSchema>

function CreateProductPage() {
  const navigate = useNavigate()
  // const { createProduct, creating } = useProductStore()
  // const { categories, loading, fetchCategories } = useCategoryStore()
  const [previewImages, setPreviewImages] = useState<string[]>([])

  // useForm com tipo explícito e defaultValues compatíveis
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      price: 0,
      price_with_discount: 0,
      stock: 0,
      enabled: true,
      category_ids: [],
      images: [],
      options: [],
    },
  })

  // useEffect(() => {
  //   fetchCategories({ limit: -1 }) // busca todas as categorias
  // }, [fetchCategories])

  // Field Array para opções
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  })

  // Gerar slug a partir do nome
  const productName = watch('name')
  useEffect(() => {
    if (productName) {
      const slug = productName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      setValue('slug', slug, { shouldValidate: true })
    }
  }, [productName, setValue])

  // Upload de imagens
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const selectedFiles = Array.from(files)
    const previews = selectedFiles.map((f) => URL.createObjectURL(f))

    setPreviewImages((prev) => [...prev, ...previews])
    const current = watch('images') || []
    setValue('images', [...current, ...selectedFiles], { shouldValidate: true })
  }

  // Remover imagem do preview
  const removeImage = (index: number) => {
    const updated = watch('images').filter((_, i) => i !== index)
    setPreviewImages((prev) => prev.filter((_, i) => i !== index))
    setValue('images', updated, { shouldValidate: true })
  }

  // Envio do formulário - corrigido o tipo
  const onSubmit: SubmitHandler<ProductFormData> = async (formData) => {
    try {
      // ✅ Monta um objeto ProductInput (não FormData)
      const productInput = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description || '',
        price: formData.price,
        price_with_discount: formData.price_with_discount || 0,
        stock: formData.stock,
        enabled: formData.enabled,
        category_ids: formData.category_ids,
        images: formData.images, // deve ser File[]
        options: formData.options,
      }

      // Debug
      console.log('📦 Enviando ao backend:', productInput)

      // ✅ Chama a função da store (ela mesma transforma em FormData)
      // await createProduct(productInput)

      navigate('/admin/products')
    } catch (error) {
      console.error('Falha ao criar produto:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4">Adicionar Novo Produto</h3>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Nome do Produto */}
          <InputRoot label="Nome*" id="name" error={errors.name?.message}>
            <InputField
              type="text"
              placeholder="Digite o nome do produto"
              {...register('name')}
              error={!!errors.name}
            />
          </InputRoot>

          {/* Slug */}
          <InputRoot label="Slug*" id="slug" error={errors.slug?.message}>
            <InputField
              type="text"
              placeholder="identificador-do-produto"
              {...register('slug')}
              error={!!errors.slug}
            />
          </InputRoot>

          {/* Descrição */}
          <InputRoot
            label="Descrição"
            id="description"
            error={errors.description?.message}
          >
            <textarea
              {...register('description')}
              className="w-full border rounded px-3 py-2"
              rows={3}
              placeholder="Descrição do produto..."
            />
          </InputRoot>

          {/* Preço e Preço com Desconto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputRoot
              label="Preço (R$)*"
              id="price"
              error={errors.price?.message}
            >
              <InputField
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register('price', { valueAsNumber: true })}
                error={!!errors.price}
              />
            </InputRoot>

            <InputRoot
              label="Preço com Desconto (R$)"
              id="price_with_discount"
              error={errors.price_with_discount?.message}
            >
              <InputField
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register('price_with_discount', { valueAsNumber: true })}
                error={!!errors.price_with_discount}
              />
            </InputRoot>
          </div>

          {/* Estoque */}
          <InputRoot label="Estoque*" id="stock" error={errors.stock?.message}>
            <InputField
              type="number"
              min="0"
              {...register('stock', { valueAsNumber: true })}
              error={!!errors.stock}
            />
          </InputRoot>

          {/* Categorias */}
          <InputRoot
            label="Categorias*"
            id="categories"
            error={errors.category_ids?.message}
          >
            <select
              multiple
              className="w-full border rounded px-3 py-2"
              {...register('category_ids', {
                setValueAs: (val) => Array.from(val).map(Number),
              })}
            >
              {/* {loading ? (
                <option disabled>Carregando categorias...</option>
              ) : errors.category_ids ? (
                <option disabled>{errors.category_ids.message}</option>
              ) : categories.length > 0 ? (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option disabled>Nenhuma categoria encontrada</option>
              )} */}
            </select>
            <p className="text-sm text-gray-500 mt-1">
              Mantenha Ctrl pressionado para selecionar múltiplas categorias
            </p>
          </InputRoot>

          {/* Status Ativo */}
          <InputRoot label="Status" id="enabled">
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('enabled')}
                className="mr-2"
                defaultChecked
              />
              <span>Produto ativo</span>
            </div>
          </InputRoot>

          {/* Imagens */}
          <InputRoot
            label="Imagens*"
            id="images"
            error={errors.images?.message}
          >
            <InputField
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              error={!!errors.images}
            />
            <div className="flex gap-2 mt-2 flex-wrap">
              {previewImages.map((src, index) => (
                <div key={index} className="relative">
                  <img
                    src={src}
                    alt={`Preview ${index}`}
                    className="w-20 h-20 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            {previewImages.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">
                Nenhuma imagem selecionada
              </p>
            )}
          </InputRoot>

          {/* Opções do Produto */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Opções do Produto
              </label>
              <button
                type="button"
                onClick={() => append({ title: '', type: '', values: [] })}
                className="bg-primary text-white px-3 py-1 rounded text-sm cursor-pointer"
              >
                + Adicionar Opção
              </button>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border p-4 rounded mb-3 bg-gray-50"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div>
                    <InputField
                      {...register(`options.${index}.title`)}
                      placeholder="Título da opção (ex: Cor, Tamanho)"
                      className="w-full border rounded px-3 py-2"
                    />
                    {errors.options?.[index]?.title && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.options[index]?.title?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <InputField
                      {...register(`options.${index}.type`)}
                      placeholder="Tipo (ex: select, color, radio)"
                      className="w-full border rounded px-3 py-2"
                    />
                    {errors.options?.[index]?.type && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.options[index]?.type?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <InputField
                    placeholder="Valores separados por vírgula (ex: Vermelho,Azul,Verde)"
                    className="w-full border rounded px-3 py-2"
                    onChange={(e) => {
                      const values = e.target.value
                        .split(',')
                        .map((v) => v.trim())
                        .filter((v) => v.length > 0)
                      setValue(`options.${index}.values`, values)
                    }}
                  />
                  {errors.options?.[index]?.values && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.options[index]?.values?.message}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 text-sm mt-2 hover:text-red-700 cursor-pointer"
                >
                  Remover Opção
                </button>
              </div>
            ))}
          </div>

          {/* Botão de Submit */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="bg-warning  hover:bg-dark-gray-3 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              // disabled={creating}
              className="bg-primary hover:bg-tertiary text-white px-6 py-2 rounded cursor-pointer"
            >
              {/* {creating ? 'Criando Produto...' : 'Criar Produto'} */}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProductPage

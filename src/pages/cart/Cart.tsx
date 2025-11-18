import { useCartStore } from '../../stores/cartStore'

const formatPrice = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const Cart = () => {
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id)
      return
    }
    updateQuantity(id, newQuantity)
  }

  const handleRemoveItem = (id: string) => {
    removeItem(id)
  }

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-blue-light mb-6">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 3h2l.4 2M7 13h10l4-8H5.4"
              stroke="var(--color-dark-gray)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="10" cy="20" r="1" fill="var(--color-dark-gray)" />
            <circle cx="18" cy="20" r="1" fill="var(--color-dark-gray)" />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold text-dark-gray mb-2">
          Seu carrinho está vazio
        </h1>
        <p className="text-light-gray mb-6">
          Adicione produtos e eles aparecerão aqui para finalizar a compra.
        </p>

        <a
          href="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:opacity-95 transition-opacity font-medium"
        >
          Voltar para a loja
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      <h1 className="text-3xl font-medium text-dark-gray mb-6">Carrinho</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm divide-y">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-4 p-4 items-center"
              >
                <img
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  src={item.image || 'https://via.placeholder.com/300'}
                  alt={item.name}
                  className="w-36 h-36 object-cover rounded-md shadow-sm"
                />

                <div className="flex-1 flex flex-col sm:pl-4">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-dark-gray">
                      {item.name}
                    </h2>
                    <div className="text-dark-gray font-semibold ml-4">
                      {formatPrice(item.price)}
                    </div>
                  </div>

                  <p className="text-sm text-light-gray-2 mt-1">Em estoque</p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        aria-label="Diminuir quantidade"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="w-9 h-9 flex items-center justify-center border border-light-gray-2 rounded-md text-dark-gray hover:bg-gray-50 cursor-pointer"
                      >
                        -
                      </button>

                      <div className="w-10 text-center">{item.quantity}</div>

                      <button
                        aria-label="Aumentar quantidade"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="w-9 h-9 flex items-center justify-center border border-light-gray-2 rounded-md text-dark-gray hover:bg-gray-50 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-sm text-dark-gray-3">Total:</div>
                      <div className="text-lg font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-sm text-tertiary hover:text-error transition-colors cursor-pointer"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="w-full lg:w-96">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium text-dark-gray mb-4">
              Resumo do pedido
            </h3>

            <div className="flex items-center justify-between mb-2 text-sm text-dark-gray-3">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="flex items-center justify-between mb-4 text-sm text-dark-gray-3">
              <span>Frete</span>
              <span>Calculado no checkout</span>
            </div>

            <div className="border-t pt-4 mt-4 flex items-center justify-between">
              <div className="text-sm text-dark-gray-3">Total</div>
              <div className="text-xl font-semibold text-dark-gray">
                {formatPrice(subtotal)}
              </div>
            </div>

            <button className="w-full mt-6 bg-primary text-white font-semibold py-3 rounded-lg shadow-sm hover:opacity-95 transition-opacity cursor-pointer">
              Finalizar compra
            </button>

            <button className="w-full mt-3 border border-light-gray-2 text-dark-gray py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              Continuar comprando
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Cart

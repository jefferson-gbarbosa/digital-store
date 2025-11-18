function OrderManagement() {
  // const { orders, fetchOrders, updateOrderStatus } = useOrderStore()

  // useEffect(() => {
  //   fetchOrders()
  // }, [fetchOrders])

  // Manipula a mudança de status
  // const handleStatusChange = async (orderId: number, newStatus: string) => {
  //   // const a = await updateOrderStatus(orderId, newStatus)
  //   console.log(orderId)
  //   console.log(newStatus)
  // }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-dark-gray-2">
          <thead className="bg-light-gray-2 text-xs uppercase text-dark-gray">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-light-gray-1 cursor-pointer"
                >
                  <td className="py-4 px-4 font-medium text-dark-gray whitespace-nowrap">
                    #{order.id}
                  </td>
                  <td className="p-4">{order.user.firstname}</td>
                  <td className="p-4">{order.total_price}</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="bg-light-gray-3 border border-dark-gray-1 text-dark-gray text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleStatusChange(order.id, 'Delivered')}
                      className="bg-green text-white px-4 py-2 rounded hover:bg-dark-gray cursor-pointer transition-colors"
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-light-gray">
                  No Orders found.
                </td>
              </tr>
            )} */}
            No Orders found.
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderManagement

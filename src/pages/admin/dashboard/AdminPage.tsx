import { Link } from 'react-router-dom'

const AdminPage = () => {
  // const { orders, fetchOrders } = useOrderStore()
  // useEffect(() => {
  //   fetchOrders()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dasboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-2xl">$10000</p>
        </div>
        <div className="p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl">$200</p>
          <Link to="/admin/orders" className="text-blue hover:underline">
            Manage Orders
          </Link>
        </div>
        <div className="p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-2xl">100</p>
          <Link to="/admin/products" className="text-blue hover:underline">
            Manage Products
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-dark-gray-2">
            <thead className="bg-light-gray-2 text-xs uppercase text-dark-gray">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Total Price</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-light-gray-1 cursor-pointer"
                  >
                    <td className="p-4">{order.id}</td>
                    <td className="p-4">{order.user.firstname}</td>
                    <td className="p-4">{order.total_price}</td>
                    <td className="p-4">{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-light-gray">
                    No orders found.
                  </td>
                </tr>
              )} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default AdminPage

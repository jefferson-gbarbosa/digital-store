import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

export const AdminSideBar = () => {
  const { logout } = useAuthStore()
  const navigate = useNavigate()
  async function handleLogout() {
    await logout()
    navigate('/')
  }
  return (
    <div className="p-6">
      <div className="mb-6">
        <Link
          to="/admin"
          className="text-2xl font-medium text-white hover:text-gray-300"
        >
          Digital Store
        </Link>
      </div>
      <h2 className="text-xl font-medium mb-6 text-center">Admin Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? 'bg-dark-gray-2 text-white py-3 px-4 rounded flex items-center space-x-2'
              : 'text-light-gray hover:bg-dark-gray-3 hover:text-white py-3 px-4 rounded flex items-center space-x-2'
          }
        >
          <i className="pi pi-users" />
          <span>User</span>
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? 'bg-dark-gray-2 text-white py-3 px-4 rounded flex items-center space-x-2'
              : 'text-light-gray hover:bg-dark-gray-3 hover:text-white py-3 px-4 rounded flex items-center space-x-2'
          }
        >
          <i className="pi pi-box" />
          <span>Products</span>
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? 'bg-dark-gray-2 text-white py-3 px-4 rounded flex items-center space-x-2'
              : 'text-light-gray hover:bg-dark-gray-3 hover:text-white py-3 px-4 rounded flex items-center space-x-2'
          }
        >
          <i className="pi pi-shopping-cart" />
          <span>Orders</span>
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'bg-dark-gray-2 text-white py-3 px-4 rounded flex items-center space-x-2'
              : 'text-light-gray hover:bg-dark-gray-3 hover:text-white py-3 px-4 rounded flex items-center space-x-2'
          }
        >
          <i className="pi pi-home" />
          <span>Shop</span>
        </NavLink>
      </nav>
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full bg-primary hover:bg-tertiary text-white py-3 px-4 rounded flex items-center justify-center space-x-2 cursor-pointer"
        >
          <i className="pi pi-sign-out mr-2" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

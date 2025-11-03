import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import 'primeicons/primeicons.css'
import { AdminSideBar } from '../../../components/admin/AdminSideBar'

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative ">
      {/* Mobile Toggle Button */}
      <div className="flex md:hidden bg-dark-gray text-white p-4 z-20">
        <button onClick={toggleSidebar} className="cursor-pointer">
          <i className="pi pi-bars text-xl text-white" />
        </button>
        <h1 className="ml-4 text-xl font-medium">Admin Dashboard</h1>
      </div>
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-dark-gray opacity-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <div
        className={`min-h-screen w-64 bg-dark-gray text-white absolute md:relative transform p-4 flex flex-col justify-between ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}
      >
        <AdminSideBar />
      </div>
      <div className="flex-grow p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout

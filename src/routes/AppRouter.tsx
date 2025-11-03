import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../pages/layout'
import RegisterPage from '../pages/auth/RegisterPage'
import ProtectedRoute from './ProtectedRoute'
import AdminPage from '../pages/admin/dashboard/AdminPage'
import ProductManagement from '../pages/admin/products/ProductManagement'
import EditProductPage from '../pages/admin/products/EditProductPage'
import OrderManagement from '../pages/admin/orders/OrderManagement'
import UserPage from '../pages/profile/UserPage'
import HomePage from '../pages/home/HomePage'
import ProductListingPage from '../pages/admin/products/ProductListingPage'
import ProductViewPage from '../pages/admin/products/ProductViewPage'
import LoginPage from '../pages/auth/LoginPage'
import AdminLayout from '../pages/admin/layout/AdminLayout'
import UserManagement from '../pages/admin/users/UserManagement'
import EditUserPage from '../pages/admin/users/EditUserPage'
import CreateProductPage from '../pages/admin/products/CreateProductPage'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/produtos"
          element={
            <Layout>
              <ProductListingPage />
            </Layout>
          }
        />
        <Route
          path="/produto/:id"
          element={
            <Layout>
              <ProductViewPage />
            </Layout>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route
          path="/profile"
          element={
            <Layout>
              <ProtectedRoute role="customer">
                <UserPage />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminPage />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="users/edit/:id" element={<EditUserPage />} />
          <Route path="products/create" element={<CreateProductPage />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="products/edit/:id" element={<EditProductPage />} />
          <Route path="orders" element={<OrderManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default AppRouter

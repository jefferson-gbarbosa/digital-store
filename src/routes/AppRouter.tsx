import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../pages/layout'
import HomePage from '../pages/home/HomePage'
import ProductViewPage from '../pages/product/ProductViewPage'
import Cart from '../pages/cart/Cart'
import ProductListingPage from '../pages/product/ProductListingPage'

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
          path="/collection"
          element={
            <Layout>
              <ProductListingPage />
            </Layout>
          }
        />
        <Route
          path="/collection/:productId"
          element={
            <Layout>
              <ProductViewPage />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
export default AppRouter

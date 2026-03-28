import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import OrdersPage from './pages/OrdersPage'

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 56px)' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="*" element={<div style={{padding:80,textAlign:'center',fontSize:22}}>404 — Page not found</div>} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </ErrorBoundary>
  )
}
